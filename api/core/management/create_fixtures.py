import os
import json


def load_json(path):
    with open(path, 'r') as file:
        d = json.load(file)

    return d


def write_json(path, data):
    with open(path, 'w') as file:
        json.dump(data, file, indent=4)


def transform_to_fixtures(api_dir, file_name, pk):
    data = load_json(os.path.join(api_dir, file_name))
    api_id = file_name.split('.json')[0]

    fixtures = []

    api_fixture = {'model': 'core.API', 'pk': pk}

    fields = {}
    fields['api_id'] = api_id
    fields['description'] = data['description']
    fields['organization_name'] = data['organization_name']
    fields['service_name'] = data['service_name']
    fields['api_type'] = data['api_type']
    fields['api_authentication'] = data['api_authentication']

    if 'is_reference_implementation' in data:
        fields['is_reference_implementation'] = data['is_reference_implementation']

    if 'contact' in data:
        contact = data['contact']
        if 'email' in contact:
            fields['contact_email'] = contact['email']
        if 'phone' in contact:
            fields['contact_phone'] = contact['phone']
        if 'fax' in contact:
            fields['contact_fax'] = contact['fax']
        if 'chat' in contact:
            fields['contact_chat'] = contact['chat']
        if 'url' in contact:
            fields['contact_url'] = contact['url']

    if 'terms_of_use' in data:
        terms_of_use = data['terms_of_use']
        if 'government_only' in terms_of_use:
            fields['terms_government_only'] = terms_of_use['government_only']
        if 'pay_per_use' in terms_of_use:
            fields['terms_pay_per_use'] = terms_of_use['pay_per_use']
        if 'uptime_guarantee' in terms_of_use:
            fields['terms_uptime_guarantee'] = terms_of_use['uptime_guarantee']
        if 'support_response_time' in terms_of_use:
            fields['terms_support_response_time'] = terms_of_use['support_response_time']

    if 'forum' in data:
        forum = data['forum']
        if 'vendor' in forum:
            fields['forum_vendor'] = forum['vendor']
        if 'url' in forum:
            fields['forum_url'] = forum['url']

    api_fixture['fields'] = fields
    fixtures.append(api_fixture)

    if 'environments' in data:
        environments = data['environments']
        for environment in environments:
            environment_fixture = {'model': 'core.Environment'}
            fields = {}
            fields['api'] = api_id
            if 'name' in environment:
                fields['name'] = environment['name']
            if 'api_url' in environment:
                fields['api_url'] = environment['api_url']
            if 'specification_url' in environment:
                fields['specification_url'] = environment['specification_url']
            if 'documentation_url' in environment:
                fields['documentation_url'] = environment['documentation_url']

            environment_fixture['fields'] = fields
            fixtures.append(environment_fixture)

    if 'relations' in data:
        relations = data['relations']
        for relation_api_id, relation_types in relations.items():
            for relation_type in relation_types:
                relation_fixture = {'model': 'core.Relation'}
                fields = {}
                fields['name'] = relation_type
                fields['from_api'] = api_id
                fields['to_api'] = relation_api_id

                relation_fixture['fields'] = fields
                fixtures.append(relation_fixture)

    return fixtures


def create_fixtures(api_dir, fixtures_dir):
    files = os.listdir(api_dir)
    fixtures = []
    pk = 0

    for file in files:
        pk += 1
        fixtures.extend(transform_to_fixtures(api_dir, file, pk))

    if not os.path.exists(fixtures_dir):
        os.makedirs(fixtures_dir)
    write_json(os.path.join(fixtures_dir, 'apis.json'), fixtures)
