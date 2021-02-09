import json
import os
from pathlib import Path

from django.core.management.base import BaseCommand

from core.models import API, Environment, Relation

COLOR_RED = '\033[91m'
COLOR_END = '\033[0m'


class Command(BaseCommand):
    def add_arguments(self, parser):
        default_path = (
            Path(__file__).resolve().parent.parent.parent.parent.parent /
            'data' / 'apis')
        parser.add_argument(
            '--api-dir',
            default=default_path,
            help='directory from which the api JSON files are read',
        )

    def handle(self, *args, **options):
        sync_apis(options['api_dir'])


def sync_apis(api_dir):
    files = os.listdir(api_dir)
    apis = []
    environments = []
    relations = []

    for file in files:
        json_data = load_json(os.path.join(api_dir, file))
        api_id = file.split('.json')[0]

        api, api_environments, api_relations = parse_api(
            file, api_id, json_data)

        apis.append(api)
        environments += api_environments
        relations += api_relations

    # remove all objects from the database that do not exist in the source data
    Environment.objects.exclude(id__in=(e.id for e in environments)).delete()
    Relation.objects.exclude(id__in=(r.id for r in relations)).delete()
    API.objects.exclude(id__in=(a.id for a in apis)).delete()


def parse_api(file_name, api_id, json_data):
    """ Syncs a db API object from a json data file

    API, Environments and Relations are created or updated depending on their
    presence in the database. When updating, only data fields that are present
    in the data file are set. Other fields are not overwritten by the sync
    mechanism.

    """
    # required fields for API
    api_vals = {k: json_data.pop(k) for k in [
        "description", "organization_name", "service_name", "api_type",
        "api_authentication",
    ]}

    # optional field for API
    ref_imp_str = "is_reference_implementation"
    if ref_imp_str in json_data:
        api_vals[ref_imp_str] = json_data.pop(ref_imp_str)

    # optional fields for API from sub object in source data
    for sub_name, keys, prefix in [
            ("contact", ["email", "phone", "url"], "contact"),
            ("terms_of_use",
             ["government_only", "pay_per_use", "uptime_guarantee",
              "support_response_time"],
             "terms"),
            ("forum", ["vendor", "url"], "forum")]:
        sub_obj = json_data.pop(sub_name, {})
        api_vals.update({
            f'{prefix}_{k}': sub_obj.pop(k)
            for k in keys if k in sub_obj
        })
        if sub_obj:
            raise ValueError(
                f"Unknown key '{sub_name}.{next(iter(sub_obj))}' in API"
                " json data")

    # sync the API object with the db
    api = API.objects.update_or_create(api_id=api_id, defaults=api_vals)[0]

    # sync the environments that exist in the source data
    environments = [
        Environment.objects.update_or_create(
            api_id=api_id, name=env_data["name"], defaults={
                k: env_data[k] for k in [
                    'api_url', 'specification_url', 'documentation_url',
                ] if k in env_data
            })[0]
        for env_data in json_data.pop('environments', [])
    ]

    # sync the relations that exist in the source data
    relations = [
        Relation.objects.update_or_create(
            name=relation_type,
            from_api_id=api_id,
            to_api_id=relation_api_id)[0]
        for relation_api_id, relation_types in json_data.pop(
            "relations", {}).items()
        for relation_type in relation_types
    ]

    # some files contain tags
    json_data.pop("tags", None)

    # some files contain empty badges
    json_data.pop("badges", None)

    if json_data:
        # if the json is not completely stripped by now, then there is
        # unknown data. Maybe a spelling mistake.
        raise ValueError(
            f"Unknown key '{next(iter(json_data))}' in file '{file_name}'")

    return api, environments, relations


def load_json(path):
    with open(path, 'r') as file:
        d = json.load(file)

    return d
