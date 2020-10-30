from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path('api/apis/<api_id>/forum-posts', views.APIForumPostsView.as_view()),
    path('api/apis/<api_id>/implemented-by', views.APIImplementedByView.as_view()),
    path('api/apis/<api_id>/<environment>/specification', views.APISpecificationView.as_view()),
    path('api/submit-api', views.SubmitAPIView.as_view()),
]

apiRouter = routers.DefaultRouter(trailing_slash=False)
apiRouter.register(r'api/apis', views.APIViewSet, basename='apis')
apiRouter.register(r'api/events', views.EventViewSet, basename='events')
apiRouter.register(r'api/code', views.CodeViewSet, basename='code')

urlpatterns += apiRouter.urls
