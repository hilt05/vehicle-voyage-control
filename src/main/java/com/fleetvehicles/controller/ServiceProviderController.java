
package com.fleetvehicles.controller;

import com.fleetvehicles.model.ServiceProvider;
import com.fleetvehicles.service.ServiceProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-providers")
@CrossOrigin(origins = "*") // Enable CORS - adjust for production
public class ServiceProviderController {

    @Autowired
    private ServiceProviderService serviceProviderService;

    @GetMapping
    public ResponseEntity<List<ServiceProvider>> getAllServiceProviders() {
        List<ServiceProvider> providers = serviceProviderService.getAllServiceProviders();
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ServiceProvider>> getProvidersByStatus(@PathVariable String status) {
        try {
            List<ServiceProvider> providers = serviceProviderService.getServiceProvidersByStatus(status);
            return ResponseEntity.ok(providers);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceProvider> getServiceProviderById(@PathVariable Long id) {
        return serviceProviderService.getServiceProviderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceProvider> createServiceProvider(@RequestBody ServiceProvider serviceProvider) {
        ServiceProvider newProvider = serviceProviderService.createServiceProvider(serviceProvider);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProvider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceProvider> updateServiceProvider(
            @PathVariable Long id, 
            @RequestBody ServiceProvider serviceProvider) {
        return serviceProviderService.updateServiceProvider(id, serviceProvider)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceProvider(@PathVariable Long id) {
        if (serviceProviderService.deleteServiceProvider(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ServiceProvider> toggleServiceProviderStatus(@PathVariable Long id) {
        return serviceProviderService.toggleServiceProviderStatus(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
