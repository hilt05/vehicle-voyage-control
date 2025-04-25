
package com.fleetvehicles.service;

import com.fleetvehicles.model.InventoryItem;
import com.fleetvehicles.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemRepository.findAll();
    }

    public Optional<InventoryItem> getInventoryItemById(Long id) {
        return inventoryItemRepository.findById(id);
    }

    public List<InventoryItem> getInventoryItemsByCategory(String category) {
        return inventoryItemRepository.findByCategory(category);
    }

    public List<InventoryItem> getLowStockItems() {
        return inventoryItemRepository.findAll().stream()
            .filter(item -> item.getCurrentStock() <= item.getMinStockThreshold())
            .toList();
    }

    public InventoryItem createInventoryItem(InventoryItem inventoryItem) {
        return inventoryItemRepository.save(inventoryItem);
    }

    public Optional<InventoryItem> updateInventoryItem(Long id, InventoryItem inventoryItemDetails) {
        return inventoryItemRepository.findById(id).map(existingItem -> {
            existingItem.setName(inventoryItemDetails.getName());
            existingItem.setPartNumber(inventoryItemDetails.getPartNumber());
            existingItem.setCategory(inventoryItemDetails.getCategory());
            existingItem.setCurrentStock(inventoryItemDetails.getCurrentStock());
            existingItem.setMinStockThreshold(inventoryItemDetails.getMinStockThreshold());
            existingItem.setSupplier(inventoryItemDetails.getSupplier());
            existingItem.setSupplierContact(inventoryItemDetails.getSupplierContact());
            existingItem.setPricePerUnit(inventoryItemDetails.getPricePerUnit());
            existingItem.setLastPurchaseDate(inventoryItemDetails.getLastPurchaseDate());
            existingItem.setImageUrl(inventoryItemDetails.getImageUrl());
            
            return inventoryItemRepository.save(existingItem);
        });
    }

    public boolean deleteInventoryItem(Long id) {
        return inventoryItemRepository.findById(id).map(item -> {
            inventoryItemRepository.delete(item);
            return true;
        }).orElse(false);
    }
}
