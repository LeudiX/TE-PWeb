from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Company, Candidate, JobOffer, Application

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']

class CompanyRegisterForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ['name', 'description', 'location', 'website', 'phone']

class CandidateRegisterForm(forms.ModelForm):
    class Meta:
        model = Candidate
        fields = ['phone', 'location', 'skills', 'experience']

class JobOfferForm(forms.ModelForm):
    class Meta:
        model = JobOffer
        fields = ['title', 'description', 'category', 'location', 'salary', 'requirements', 'deadline']
        widgets = {
            'deadline': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
            'requirements': forms.Textarea(attrs={'rows': 4}),
        }

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['cover_letter', 'attachment']
        widgets = {
            'cover_letter': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Explica por qué eres el candidato ideal...'}),
        }

    def clean_attachment(self):
        f = self.cleaned_data.get('attachment')
        if f:
            max_size = 5 * 1024 * 1024  # 5 MB
            if f.size > max_size:
                raise forms.ValidationError('El archivo debe ser menor a 5MB.')
            content_type = getattr(f, 'content_type', '')
            if content_type != 'application/pdf' and not f.name.lower().endswith('.pdf'):
                raise forms.ValidationError('Solo se permiten archivos en formato PDF.')
        return f

class ApplicationStatusForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['status', 'notes']
        widgets = {
            'notes': forms.Textarea(attrs={'rows': 3}),
        }