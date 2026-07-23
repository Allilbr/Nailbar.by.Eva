from django.contrib import admin
from .models import Work, Service, Booking, Review

admin.site.register(Work)
admin.site.register(Service)
admin.site.register(Booking)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'created_at', 'text')
    list_filter = ('rating', 'created_at')
    search_fields = ('name', 'text')
   