import factory


class APIFactory(factory.django.DjangoModelFactory):
    api_id = factory.Sequence(lambda n: n)
    description = factory.Faker("paragraph")
    organization_name = factory.Faker("word")
    service_name = factory.Faker("word")
    api_type = "rest_json"
    api_authentication = "none"
    terms_government_only = False
    terms_pay_per_use = False

    class Meta:
        model = "core.API"


class EnvironmentFactory(factory.django.DjangoModelFactory):
    name = "production"
    api_url = 'https://api-test.nl/api/v1'
    specification_url = 'https://api-test.nl/api/v1'
    documentation_url = 'https://api-test.nl/api/v1/schema'
    api = factory.SubFactory(APIFactory)

    class Meta:
        model = "core.Environment"


class APIDesignRuleTestSuiteFactory(factory.django.DjangoModelFactory):
    api = factory.SubFactory(APIFactory)
    uuid = "61f4e5e7-0b22-456f-9596-951e0365bb10"

    class Meta:
        model = "core.APIDesignRuleTestSuite"
