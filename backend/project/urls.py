from django.contrib import admin
from django.urls import path, include
from account.views import ActivateView, ResetPasswordView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/activate/<str:uid>/<str:token>/', ActivateView.as_view(), name='activate'),
    path('account/reset_password/<str:uid>/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('api/', include('account.urls')),
]
