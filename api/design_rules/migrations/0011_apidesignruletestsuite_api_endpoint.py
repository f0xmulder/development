# Generated by Django 3.0.5 on 2020-12-02 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('design_rules', '0010_auto_20201125_1645'),
    ]

    operations = [
        migrations.AddField(
            model_name='apidesignruletestsuite',
            name='api_endpoint',
            field=models.URLField(null=True),
        ),
    ]
