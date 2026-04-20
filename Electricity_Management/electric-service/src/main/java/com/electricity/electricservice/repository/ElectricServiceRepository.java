package com.electricity.electricservice.repository;

import com.electricity.electricservice.model.ElectricService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ElectricServiceRepository extends JpaRepository<ElectricService, Integer> {
    List<ElectricService> findByStatus(String status);
}
