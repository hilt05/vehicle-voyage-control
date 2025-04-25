
package com.fleetvehicles.repository;

import com.fleetvehicles.model.ProviderStatus;
import com.fleetvehicles.model.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
    List<ServiceProvider> findByStatus(ProviderStatus status);
    List<ServiceProvider> findByNameContainingIgnoreCase(String name);
    List<ServiceProvider> findByLocationContainingIgnoreCase(String location);
}
