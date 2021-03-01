from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path('api/apis/<api_id>/forum-posts', views.APIForumPostsView.as_view()),
    path('api/apis/<api_id>/implemented-by', views.APIImplementedByView.as_view()),
    path('api/apis/<api_id>/<environment>/specification', views.APISpecificationView.as_view()),
    path('api/submit-api', views.SubmitAPIView.as_view()),
]

api_router = routers.DefaultRouter(trailing_slash=False)
api_router.register(r'api/apis', views.APIViewSet, basename='apis')
api_router.register(r'api/events', views.EventViewSet, basename='events')
api_router.register(r'api/code', views.CodeViewSet, basename='code')

urlpatterns += api_router.urls
