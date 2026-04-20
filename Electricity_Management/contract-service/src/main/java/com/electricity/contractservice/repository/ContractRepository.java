package com.electricity.contractservice.repository;

import com.electricity.contractservice.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {
    boolean existsByApartmentIdAndStatus(Integer apartmentId, String status);
    List<Contract> findByCustomerId(Integer customerId);
}
