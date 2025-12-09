from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Usuario autenticado
        user = self.user

        # Agregar datos del usuario
        data.update({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'groups': list(user.groups.values_list('name', flat=True))  # nombres de grupos
        })

        return data
