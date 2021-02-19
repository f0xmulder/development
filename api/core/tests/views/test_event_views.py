import json
import datetime
from unittest.mock import patch

from django.utils import timezone
from django.test import TestCase
from django.core.exceptions import ImproperlyConfigured
from rest_framework.exceptions import ErrorDetail

from core.models import Event
from core.tests.utils import prevent_logging

PATH = '/api/events'


class EventViewTest(TestCase):
    def setUp(self):
        self.event1 = Event.objects.create(
            title='Event 1',
            start_date=timezone.now(),
            location='Here',
            registration_url='https://www.example.com',
            is_published=True
        )
        # not visible in the list
        self.event2 = Event.objects.create(
            title='Event 2',
            start_date=timezone.now(),
            location='Here',
            registration_url='https://www.example.com',
            is_published=False
        )
        # not visible in the list
        self.event3 = Event.objects.create(
            title='Event 3',
            start_date=timezone.now() - datetime.timedelta(hours=25),
            location='Here',
            registration_url='https://www.example.com',
            is_published=True
        )

    def test_list(self):
        response = self.client.get(PATH)
        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertEqual(len(data['results']), 1)
        self.assertEqual(data['results'][0]['title'], 'Event 1')


class SubmitEventTest(TestCase):
    def setUp(self):
        self.valid_event_data = {
            'title': 'Event 1',
            'start_date': '2020-08-06T12:15',
            'location': 'Here',
            'registration_url': 'https://www.example.com',
            'is_published': True  # omit this field
        }

    @prevent_logging
    def test_submit_invalid_event(self):
        response = self.client.post(PATH,
                                    data=json.dumps({'invalid': 'event data'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    @patch('core.views.create_issue')
    def test_submit_valid_event(self, mock_create_issue):
        mock_create_issue.return_value = {'id': 42}

        response = self.client.post(PATH,
                                    data=json.dumps(self.valid_event_data),
                                    content_type='application/json')

        create_issue_args = mock_create_issue.call_args[0]

        self.assertEqual(response.status_code, 201)

        self.assertIn('Add a new Event: Event 1', create_issue_args[0])
        self.assertIn('Thanks a lot!\n\nThe web form', create_issue_args[1])
        self.assertIn('- Title: Event 1', create_issue_args[1])
        self.assertIn('New Event', create_issue_args[2])

    @prevent_logging
    @patch('core.views.create_issue')
    def test_submit_gitlab_error(self, mock_create_issue):
        mock_create_issue.side_effect = ImproperlyConfigured('Gitlab configuration error')

        response = self.client.post(PATH,
                                    data=json.dumps(self.valid_event_data),
                                    content_type='application/json')

        self.assertEqual(response.data, {
            'detail': ErrorDetail(string='The Gitlab API is not properly configured', code='error')
        })
