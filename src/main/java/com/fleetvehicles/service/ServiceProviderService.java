
package com.fleetvehicles.service;

import com.fleetvehicles.model.ProviderStatus;
import com.fleetvehicles.model.ServiceProvider;
import com.fleetvehicles.repository.ServiceProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    public List<ServiceProvider> getAllServiceProviders() {
        return serviceProviderRepository.findAll();
    }

    public List<ServiceProvider> getServiceProvidersByStatus(String status) {
        try {
            ProviderStatus providerStatus = ProviderStatus.fromValue(status);
            return serviceProviderRepository.findByStatus(providerStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }

    public Optional<ServiceProvider> getServiceProviderById(Long id) {
        return serviceProviderRepository.findById(id);
    }

    public ServiceProvider createServiceProvider(ServiceProvider serviceProvider) {
        return serviceProviderRepository.save(serviceProvider);
    }

    public Optional<ServiceProvider> updateServiceProvider(Long id, ServiceProvider serviceProviderDetails) {
        return serviceProviderRepository.findById(id).map(existingProvider -> {
            existingProvider.setName(serviceProviderDetails.getName());
            existingProvider.setContactPerson(serviceProviderDetails.getContactPerson());
            existingProvider.setPhone(serviceProviderDetails.getPhone());
            existingProvider.setEmail(serviceProviderDetails.getEmail());
            existingProvider.setServiceTypes(serviceProviderDetails.getServiceTypes());
            existingProvider.setLocation(serviceProviderDetails.getLocation());
            existingProvider.setRating(serviceProviderDetails.getRating());
            existingProvider.setNotes(serviceProviderDetails.getNotes());
            existingProvider.setWebsite(serviceProviderDetails.getWebsite());
            existingProvider.setStatus(serviceProviderDetails.getStatus());
            existingProvider.setMaintenanceCount(serviceProviderDetails.getMaintenanceCount());
            existingProvider.setLastService(serviceProviderDetails.getLastService());
            
            return serviceProviderRepository.save(existingProvider);
        });
    }

    public boolean deleteServiceProvider(Long id) {
        return serviceProviderRepository.findById(id).map(provider -> {
            serviceProviderRepository.delete(provider);
            return true;
        }).orElse(false);
    }

    public Optional<ServiceProvider> toggleServiceProviderStatus(Long id) {
        return serviceProviderRepository.findById(id).map(provider -> {
            ProviderStatus newStatus = provider.getStatus() == ProviderStatus.ACTIVE ? 
                                      ProviderStatus.INACTIVE : ProviderStatus.ACTIVE;
            provider.setStatus(newStatus);
            return serviceProviderRepository.save(provider);
        });
    }
}
