package com.electricity.apartmentservice.repository;

import com.electricity.apartmentservice.model.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {
    List<Apartment> findByCustomerIdAndStatus(Integer customerId, String status);
}
