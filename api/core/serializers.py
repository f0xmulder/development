from collections import OrderedDict
from rest_framework import serializers
from core.models import API, Environment, Badge


class NonNullModelSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super().to_representation(instance)
        return OrderedDict(tup for tup in result.items() if tup[1] is not None)


class EnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Environment
        fields = ['name', 'api_url', 'specification_url', 'documentation_url']


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['name']

    def to_representation(self, instance):
        return instance.name


class APISerializer(NonNullModelSerializer):
    id = serializers.CharField(source='api_id')
    environments = EnvironmentSerializer(many=True)
    badges = BadgeSerializer(many=True)
    forum = serializers.SerializerMethodField('get_forum', required=False)
    contact = serializers.SerializerMethodField('get_contact')
    terms_of_use = serializers.SerializerMethodField('get_terms_of_use')
    scores = serializers.SerializerMethodField('get_scores')

    class Meta:
        model = API
        fields = [
            'id',
            'description',
            'organization_name',
            'service_name',
            'api_type',
            'api_authentication',
            'badges',
            'environments',
            'forum',
            'contact',
            'is_reference_implementation',
            'referenced_apis',
            'terms_of_use',
            'scores'
        ]

    def get_contact(self, obj):
        return {
            'email': obj.contact_email,
            'phone': obj.contact_phone,
            'fax': obj.contact_fax,
            'chat': obj.contact_chat,
            'url': obj.contact_url
        }

    def get_forum(self, obj):
        if not obj.forum_url and not obj.forum_vendor:
            return None

        return {
            'url': obj.forum_url,
            'vendor': obj.forum_vendor
        }

    def get_terms_of_use(self, obj):
        return {
            'government_only': obj.terms_government_only,
            'pay_per_use': obj.terms_pay_per_use,
            'uptime_guarantee': obj.terms_uptime_guarantee,
            'support_response_time': obj.terms_support_response_time
        }

    def get_scores(self, obj):
        def has_documentation(api):
            production_environment = api.environments.filter(
                name='Productie').first()

            if production_environment is None:
                return False

            return production_environment.documentation_url != ''

        def has_specification(api):
            production_environment = api.environments.filter(
                name='Productie').first()

            if production_environment is None:
                return False

            return production_environment.specification_url != ''

        def has_contact_details(api):
            return (api.contact_email != '' or
                    api.contact_phone != '' or
                    api.contact_fax != '' or
                    api.contact_chat != '' or
                    api.contact_url != '')

        def provides_sla(api):
            return api.terms_support_response_time != '' and api.terms_uptime_guarantee >= 0.9

        return {
            'has_documentation': has_documentation(obj),
            'has_specification': has_specification(obj),
            'has_contact_details': has_contact_details(obj),
            'provides_sla': provides_sla(obj)
        }
