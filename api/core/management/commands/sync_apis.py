import json
import os

from django.core.management.base import BaseCommand

from core.models import API, Environment, Relation

COLOR_RED = '\033[91m'
COLOR_END = '\033[0m'


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--api-dir',
            default='../data/apis',
            help='directory from which the api JSON files are read',
        )

    def handle(self, *args, **options):
        apis = API.objects.all()
        apis.delete()

        if apis.count() > 0:
            raise SystemExit(
                f'{COLOR_RED}Error: Not all APIs were deleted\n'
                f'Please delete all APIs before syncing{COLOR_END}'
            )
        if Environment.objects.all().count() > 0:
            raise SystemExit(
                f'{COLOR_RED}Error: Not all Environments were deleted\n'
                f'Please delete all Environments before syncing{COLOR_END}'
            )
        if Relation.objects.all().count() > 0:
            raise SystemExit(
                f'{COLOR_RED}Error: Not all Relations were deleted\n'
                f'Please delete all Relations before syncing{COLOR_END}'
            )

        sync_apis(options['api_dir'])


def sync_apis(api_dir):
    files = os.listdir(api_dir)
    apis = []
    environments = []
    relations = []

    for file in files:
        json_data = load_json(os.path.join(api_dir, file))
        api_id = file.split('.json')[0]

        api, api_environments, api_relations = parse_api(api_id, json_data)

        apis.append(api)
        environments += api_environments
        relations += api_relations

    API.objects.bulk_create(apis)
    Environment.objects.bulk_create(environments)
    Relation.objects.bulk_create(relations)


def parse_api(api_id, json_data):
    api = API()
    environments = []
    relations = []

    api.api_id = api_id
    api.description = json_data['description']
    api.organization_name = json_data['organization_name']
    api.service_name = json_data['service_name']
    api.api_type = json_data['api_type']
    api.api_authentication = json_data['api_authentication']

    if 'is_reference_implementation' in json_data:
        api.is_reference_implementation = json_data['is_reference_implementation']

    if 'contact' in json_data:
        contact = json_data['contact']
        if 'email' in contact:
            api.contact_email = contact['email']
        if 'phone' in contact:
            api.contact_phone = contact['phone']
        if 'url' in contact:
            api.contact_url = contact['url']

    if 'terms_of_use' in json_data:
        terms_of_use = json_data['terms_of_use']
        if 'government_only' in terms_of_use:
            api.terms_government_only = terms_of_use['government_only']
        if 'pay_per_use' in terms_of_use:
            api.terms_pay_per_use = terms_of_use['pay_per_use']
        if 'uptime_guarantee' in terms_of_use:
            api.terms_uptime_guarantee = terms_of_use['uptime_guarantee']
        if 'support_response_time' in terms_of_use:
            api.terms_support_response_time = terms_of_use['support_response_time']

    if 'forum' in json_data:
        forum = json_data['forum']
        if 'vendor' in forum:
            api.forum_vendor = forum['vendor']
        if 'url' in forum:
            api.forum_url = forum['url']

    if 'environments' in json_data:
        environments_data = json_data['environments']

        for env_data in environments_data:
            environment = Environment(api_id=api_id)
            if 'name' in env_data:
                environment.name = env_data['name']
            if 'api_url' in env_data:
                environment.api_url = env_data['api_url']
            if 'specification_url' in env_data:
                environment.specification_url = env_data['specification_url']
            if 'documentation_url' in env_data:
                environment.documentation_url = env_data['documentation_url']
            environments.append(environment)

    if 'relations' in json_data:
        relations_data = json_data['relations']

        for relation_api_id, relation_types in relations_data.items():
            for relation_type in relation_types:
                relation = Relation(
                    name=relation_type,
                    from_api_id=api_id,
                    to_api_id=relation_api_id,
                )
                relations.append(relation)

    return api, environments, relations


def load_json(path):
    with open(path, 'r') as file:
        d = json.load(file)

    return d
