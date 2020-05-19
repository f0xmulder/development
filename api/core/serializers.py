from collections import OrderedDict
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.models import API, Environment, Badge, MAX_TEXT_LENGTH, MAX_URL_LENGTH, MAX_ENUM_LENGTH


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


class ForumSerializer(serializers.Serializer):
    vendor = serializers.CharField(
        source='forum_vendor',
        max_length=MAX_ENUM_LENGTH,
    )
    url = serializers.URLField(
        source='forum_url',
        max_length=MAX_URL_LENGTH,
    )

    def validate_vendor(self, value):
        if value != 'discourse':
            raise ValidationError('Only "discourse" is a valid vendor')

        return value

    def to_representation(self, instance):
        result = super().to_representation(instance)

        if not result.get('vendor', '') and not result.get('url', ''):
            return None

        return result


class ContactSerializer(serializers.Serializer):
    email = serializers.CharField(
        source='contact_email',
        max_length=MAX_TEXT_LENGTH,
        allow_blank=True,
        required=False,
    )
    phone = serializers.CharField(
        source='contact_phone',
        max_length=MAX_TEXT_LENGTH,
        allow_blank=True,
        required=False,
    )
    fax = serializers.CharField(
        source='contact_fax',
        max_length=MAX_TEXT_LENGTH,
        allow_blank=True,
        required=False,
    )
    chat = serializers.CharField(
        source='contact_chat',
        max_length=MAX_TEXT_LENGTH,
        allow_blank=True,
        required=False,
    )
    url = serializers.CharField(
        source='contact_url',
        max_length=MAX_URL_LENGTH,
        allow_blank=True,
        required=False,
    )


class TermsOfUseSerializer(serializers.Serializer):
    government_only = serializers.BooleanField(
        source='terms_government_only',
        allow_null=True,
        required=False,
    )
    pay_per_use = serializers.BooleanField(
        source='terms_pay_per_use',
        allow_null=True,
        required=False,
    )
    uptime_guarantee = serializers.DecimalField(
        source='terms_uptime_guarantee',
        decimal_places=6,
        max_digits=8,
        allow_null=True,
        required=False,
    )
    support_response_time = serializers.CharField(
        source='terms_support_response_time',
        max_length=MAX_TEXT_LENGTH,
        allow_blank=True,
        required=False,
    )


class APISerializer(NonNullModelSerializer):
    id = serializers.CharField(source='api_id')
    environments = EnvironmentSerializer(many=True)
    badges = BadgeSerializer(many=True, read_only=True)
    forum = ForumSerializer(source='*', required=False)
    contact = ContactSerializer(source='*', required=False)
    terms_of_use = TermsOfUseSerializer(source='*', required=False)
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

    def validate_environments(self, environments):
        names = [env['name'] for env in environments]

        # TODO get production from EnvTypes
        if not any(name == 'production' for name in names):
            raise ValidationError('The API is missing a production environment')

        if len(set(names)) != len(names):
            raise ValidationError('Environment names are not unique')

        return environments

    def get_scores(self, obj):
        def has_documentation(api):
            production_environment = api.environments.filter(
                name='production').first()

            if production_environment is None:
                return False

            return production_environment.documentation_url != ''

        def has_specification(api):
            production_environment = api.environments.filter(
                name='production').first()

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

        return OrderedDict({
            'has_documentation': has_documentation(obj),
            'has_specification': has_specification(obj),
            'has_contact_details': has_contact_details(obj),
            'provides_sla': provides_sla(obj)
        })
