from django.forms import ModelForm
from trade.models import UserExchanges, UserWallet
from django.contrib.auth.models import User
from django import forms
from django.forms.extras.widgets import SelectDateWidget


class UserWalletForm(ModelForm):
    class Meta:
        model = UserWallet
        fields = ['wallet', 'address']


class UserExchangesForm(ModelForm):
    class Meta:
        model = UserExchanges
        fields = ['exchange', 'apikey', 'apisecret']