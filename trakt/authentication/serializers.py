from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account

class AccountSerializer(serializers.ModelSerializer):
    '''
    Pass the required=False argument so that we don't 
    update the user's password unless they provide a new 
    one.
    '''
    deliveries = serializers.HyperlinkedRelatedField(many=True, 
                                                read_only=True,
                                                view_name='delivery-detail')
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id','email','username','created_at','updated_at',
                  'first_name','last_name','password','confirm_password','deliveries',)
        read_only_fields = ('created_at','updated_at',)

        ''' 
        Deserialization : Turn JSON into a Python object. 
        When creating a new object, such as an Account, .create() is used. 
        When we later update that Account, .update() is used.
        '''
        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username', instance.username)

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                '''This method explicitly sets the password and does not do so in plain text'''
                instance.set_password(password)
                instance.save()
            
            '''When a user's password is updated, their session authentication hash must be 
            explicitly updated. If we don't do this here, the user will not be authenticated 
            on their next request and will have to log in again.'''
            update_session_auth_hash(self.context.get('request'), instance)

            return instance            