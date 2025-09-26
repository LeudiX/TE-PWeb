from django.contrib import admin
from myapp.models import Empresa,Candidato,OfertaTrabajo,Postulacion

@admin.register(Empresa)
class EmpresasAdmin(admin.ModelAdmin):
    list_display = ( 'nombre', 'usuario',)
    search_fields = ('nombre',)

@admin.register(Candidato)
class CandidatoAdmin(admin.ModelAdmin):
    list_display = ('usuario',)
    search_fields = ('usuario',)

@admin.register(OfertaTrabajo)
class OfertaTrabajoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'empresa', 'descripcion','categoria','ubicacion','fecha_publicacion','fecha_limite',)
    search_fields = ('titulo',)

@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('candidato', 'oferta', 'estado','notas','fecha_postulacion',)
    search_fields = ('candidato',)

