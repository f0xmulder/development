from collections import OrderedDict
from rest_framework import serializers
from core.models import API, Environment, Badge


class NonNullModelSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(NonNullModelSerializer,
                       self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])


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
        fields = ['id', 'description', 'organization_name', 'service_name', 'api_type', 'api_authentication', 'tags',
                  'badges', 'environments', 'forum', 'contact', 'is_reference_implementation', 'referenced_apis', 'terms_of_use', 'scores']

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
        def has_documentation(obj):
            production_environment = obj.environments.filter(
                name='Productie').first()
            return production_environment.documentation_url != ''

        def has_specification(obj):
            production_environment = obj.environments.filter(
                name='Productie').first()
            return production_environment.specification_url != ''

        def has_contact_details(obj):
            return obj.contact_email != '' or obj.contact_phone != '' or obj.contact_fax != '' or obj.contact_chat != '' or obj.contact_url != ''

        def provides_sla(obj):
            return obj.terms_support_response_time != '' and obj.terms_uptime_guarantee >= 0.9

        return {
            'has_documentation': has_documentation(obj),
            'has_specification': has_specification(obj),
            'has_contact_details': has_contact_details(obj),
            'provides_sla': provides_sla(obj)
        }
