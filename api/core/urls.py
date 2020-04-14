from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path('api/apis/<api_id>/forum-posts', views.APIForumPostsView.as_view()),
    path('api/apis/<api_id>/implemented-by', views.APIImplementedByView.as_view()),
]

apiRouter = routers.DefaultRouter(trailing_slash=False)
apiRouter.register(r'api/apis', views.APIViewSet, basename='apis')
urlpatterns += apiRouter.urls
