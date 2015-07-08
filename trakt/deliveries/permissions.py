from rest_framework import permissions


class IsAuthorOfDelivery(permissions.BasePermission):
    def has_object_permission(self, request, view, delivery):
        if request.user:
            return delivery.author == request.user
        return False