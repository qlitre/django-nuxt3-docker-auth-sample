from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class ExampleView(APIView):

    @staticmethod
    def get(request):
        content = {
            'message': 'its super secret',
            'user': str(request.user),  # ユーザー名
            'auth': str(request.auth),  # トークン
        }
        return Response(content)
