from rest_framework import viewsets

from .models import (
    Supplier,
    InventoryItem,
    StockMovement,
)

from .serializers import (
    SupplierSerializer,
    InventoryItemSerializer,
    StockMovementSerializer,
)

class SupplierViewSet(viewsets.ModelViewSet):

    queryset = Supplier.objects.all()

    serializer_class = SupplierSerializer

    permission_classes = []

class InventoryItemViewSet(viewsets.ModelViewSet):

    queryset = InventoryItem.objects.select_related(
        'product'
    ).all()

    serializer_class = InventoryItemSerializer

    permission_classes = []

class StockMovementViewSet(viewsets.ModelViewSet):

    queryset = StockMovement.objects.select_related(
        'product',
        'supplier',
        'created_by',
    ).all()

    serializer_class = StockMovementSerializer

    permission_classes = []


    # ==========================================
    # AUTO SET USER
    # ==========================================

    def perform_create(self,serializer):

        movement = serializer.save(

            created_by=self.request.user
        )


        inventory_item, _ = (
            InventoryItem.objects.get_or_create(

                product=movement.product
            )
        )


    # ======================================
    # STOCK IN
    # ======================================

        if movement.movement_type == 'IN':
    
            inventory_item.quantity += (
                movement.quantity
            )
    
    
        # ======================================
        # STOCK OUT
        # ======================================
    
        elif movement.movement_type == 'OUT':
    
            inventory_item.quantity -= (
                movement.quantity
            )
    
    
        # ======================================
        # ADJUSTMENT
        # ======================================
    
        elif (
            movement.movement_type ==
            'ADJUSTMENT'
        ):
    
            inventory_item.quantity = (
                movement.quantity
            )
    
    
        inventory_item.save()