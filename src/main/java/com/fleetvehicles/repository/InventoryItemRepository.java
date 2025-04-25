
package com.fleetvehicles.repository;

import com.fleetvehicles.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByNameContainingIgnoreCase(String name);
    List<InventoryItem> findByCategory(String category);
    List<InventoryItem> findByCurrentStockLessThanEqual(int threshold);
}
