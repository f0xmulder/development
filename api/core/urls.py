from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'apis', views.APIViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/apis/<api_id>/implemented-by', views.APIImplementedByView.as_view()),
    path('', views.index, name='index'),
]
