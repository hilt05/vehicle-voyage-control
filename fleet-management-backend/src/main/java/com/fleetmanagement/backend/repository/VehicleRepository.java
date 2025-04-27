
package com.fleetmanagement.backend.repository;

import com.fleetmanagement.backend.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
