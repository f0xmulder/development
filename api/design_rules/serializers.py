from rest_framework import serializers

from design_rules.models import DesignRuleSession, DesignRuleResult


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
