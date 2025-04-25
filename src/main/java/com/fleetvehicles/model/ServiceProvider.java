
package com.fleetvehicles.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service_providers")
public class ServiceProvider {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String contactPerson;
    
    private String phone;
    
    private String email;
    
    @ElementCollection
    @CollectionTable(name = "provider_service_types", joinColumns = @JoinColumn(name = "provider_id"))
    @Column(name = "service_type")
    private List<String> serviceTypes;
    
    private String location;
    
    private Float rating;
    
    @Column(length = 1000)
    private String notes;
    
    private String website;
    
    @Enumerated(EnumType.STRING)
    private ProviderStatus status;
    
    private int maintenanceCount;
    
    private String lastService;
}
