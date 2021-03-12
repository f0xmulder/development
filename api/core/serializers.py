from collections import OrderedDict

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.models import (
    API, Environment, Badge, Event, Code, ProgrammingLanguage, DesignRuleSession, DesignRuleResult,
    MAX_TEXT_LENGTH, MAX_URL_LENGTH, MAX_ENUM_LENGTH
)


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
    support_response_time = serializers.IntegerField(
        source='terms_support_response_time',
        min_value=1,
        allow_null=True,
        required=False,
    )


class DesignRuleResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignRuleResult
        fields = [
            'rule_type_url',
            'rule_type_name',
            'rule_type_description',
            'success',
            'errors',
        ]


class DesignRuleSessionSerializer(serializers.ModelSerializer):
    results = DesignRuleResultSerializer(many=True)

    class Meta:
        model = DesignRuleSession
        fields = [
            'started_at',
            'percentage_score',
            'test_version',
            'results',
        ]


class ProgrammingLanguagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgrammingLanguage
        fields = ['name']

    def to_representation(self, instance):
        return instance.name


class RelatedApisSerializer(serializers.ModelSerializer):

    class Meta:
        model = API
        fields = ['service_name', 'organization_name', 'api_id']


class BasicCodeSerializer(serializers.ModelSerializer):
    programming_languages = ProgrammingLanguagesSerializer(many=True)

    class Meta:
        model = Code
        fields = [
            'id',
            'owner_name',
            'name',
            'url',
            'last_change',
            'stars',
            'source',
            'programming_languages',
        ]


class CodeSerializer(BasicCodeSerializer):
    related_apis = RelatedApisSerializer(many=True)

    class Meta(BasicCodeSerializer.Meta):
        fields = BasicCodeSerializer.Meta.fields + [
            'related_apis'
        ]


class APISerializer(NonNullModelSerializer):
    id = serializers.CharField(source='api_id')
    organization_name = serializers.CharField(source='organization.name')
    organization_oin = serializers.CharField(source='organization.oin')
    environments = EnvironmentSerializer(many=True)
    badges = BadgeSerializer(many=True, read_only=True)
    forum = ForumSerializer(source='*', required=False)
    contact = ContactSerializer(source='*', required=False)
    terms_of_use = TermsOfUseSerializer(source='*', required=False)
    scores = serializers.SerializerMethodField('get_scores')
    design_rule_scores = DesignRuleSessionSerializer(
        source='last_design_rule_session',
        read_only=True
    )
    related_code = BasicCodeSerializer(many=True, read_only=True)

    class Meta:
        model = API
        fields = [
            'id',
            'description',
            'organization_name',
            'organization_oin',
            'service_name',
            'api_type',
            'api_authentication',
            'badges',
            'environments',
            'forum',
            'contact',
            'is_reference_implementation',
            'referenced_apis',
            'related_code',
            'terms_of_use',
            'scores',
            'design_rule_scores',
        ]

    def validate_environments(self, environments):
        if len(environments) == 0:
            raise ValidationError('The API is missing environments')

        names = [env['name'] for env in environments]
        if len(set(names)) != len(names):
            raise ValidationError('Environment names are not unique')

        return environments

    def get_scores(self, obj):

        try:
            production_environment = next(
                e for e in obj.environments.all() if e.name == 'production')
        except StopIteration:
            production_environment = None

        def has_documentation():
            if production_environment is None:
                return False

            return production_environment.documentation_url != ''

        def has_specification():
            if production_environment is None:
                return False

            return production_environment.specification_url != ''

        def has_contact_details(api):
            return (api.contact_email != '' or
                    api.contact_phone != '' or
                    api.contact_url != '')

        def provides_sla(api):
            return (api.terms_support_response_time is not None and
                    api.terms_uptime_guarantee >= 0.9)

        return OrderedDict({
            'has_documentation': has_documentation(),
            'has_specification': has_specification(),
            'has_contact_details': has_contact_details(obj),
            'provides_sla': provides_sla(obj)
        })


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start_date', 'location', 'registration_url']


class RelatedApisSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = API
        fields = ['api_id']
        # Don't validate api_id as it will fail stating that it is not
        # unique. We are only deserializing and not saving a new API though,
        # so this validation is not relevant.
        extra_kwargs = {
            'api_id': {'validators': []},
        }

    def to_representation(self, instance):
        return instance.api_id


class CodeSubmitSerializer(serializers.ModelSerializer):
    related_apis = RelatedApisSubmitSerializer(many=True)

    class Meta:
        model = Code
        fields = ['url', 'related_apis']
