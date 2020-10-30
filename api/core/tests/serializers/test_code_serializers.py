from collections import OrderedDict

from django.test import TransactionTestCase

from core.models import API, ProgrammingLanguage, Code
from core.serializers import CodeSerializer, CodeSubmitSerializer


class CodeSerializerTest(TransactionTestCase):
    reset_sequences = True

    def setUp(self):
        # Display whole diffs
        self.maxDiff = None

    def test_serialize_code(self):
        pl1 = ProgrammingLanguage.objects.create(name='Python')
        pl2 = ProgrammingLanguage.objects.create(name='Go')
        api1 = API.objects.create(api_id='api1')
        api2 = API.objects.create(api_id='api2')
        code1 = Code.objects.create(
            source=Code.Source.GITHUB_GIST,
            owner_name='me',
            name='myCode',
            url='https://www.github.com/me/myCode',
            description='tha bezt Codez!',
            last_change='2020-10-29T10:49:06.391Z',
            stars=-1,
        )
        code1.save()
        code1.programming_languages.add(pl1, pl2)
        code1.related_apis.add(api1, api2)

        expected_data = {'id': 1,
                         'owner_name': 'me',
                         'name': 'myCode',
                         'url': 'https://www.github.com/me/myCode',
                         'last_change': '2020-10-29T10:49:06.391Z',
                         'stars': -1,
                         'source': 'GitHub gist',
                         'programming_languages': ['Python', 'Go'],
                         'related_apis': [
                                OrderedDict([
                                    ('service_name', ''),
                                    ('organization_name', ''),
                                    ('api_id', 'api1')]),
                                OrderedDict([
                                    ('service_name', ''),
                                    ('organization_name', ''),
                                    ('api_id', 'api2')])
                         ]}

        serialized_data = CodeSerializer(code1).data

        # This actually verifies that the elements are equal, disregarding order
        self.assertCountEqual(serialized_data['programming_languages'],
                              expected_data['programming_languages'])
        self.assertCountEqual(serialized_data['related_apis'],
                              expected_data['related_apis'])

        # Remove unordered lists before comparing  rest
        del serialized_data['programming_languages']
        del serialized_data['related_apis']
        del expected_data['programming_languages']
        del expected_data['related_apis']

        self.assertDictEqual(serialized_data, expected_data)

    def test_serialize_code_submit_serializer(self):
        input_data = {'url': 'http://foo.com',
                      'related_apis': [
                          {'api_id': 'foo'},
                          {'api_id': 'bar'}
                      ]}

        serializer = CodeSubmitSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data.keys(), input_data.keys())
        self.assertEqual(serializer.validated_data['url'], input_data['url'])
        self.assertEqual(serializer.validated_data['related_apis'],
                         [OrderedDict(api) for api in input_data['related_apis']])
