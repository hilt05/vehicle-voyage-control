
package com.fleetvehicles.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory_items")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String partNumber;
    private String category;
    private int currentStock;
    private int minStockThreshold;
    private String supplier;
    private String supplierContact;
    private BigDecimal pricePerUnit;
    private LocalDate lastPurchaseDate;
    private String imageUrl;
    
    @OneToMany(mappedBy = "inventoryItem", cascade = CascadeType.ALL)
    private List<UsageRecord> usageHistory;
}
