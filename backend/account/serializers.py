from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers


class CustomUserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

    @staticmethod
    def validate_first_name(value):
        # first_name フィールドのカスタムバリデーション
        if not value:
            raise serializers.ValidationError("名は必須です。")
        return value

    @staticmethod
    def validate_last_name(value):
        # last_name フィールドのカスタムバリデーション
        if not value:
            raise serializers.ValidationError("姓は必須です。")
        return value
