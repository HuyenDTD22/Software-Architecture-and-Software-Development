package com.electricity.customerservice.repository;

import com.electricity.customerservice.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    boolean existsByIdCard(String idCard);

    boolean existsByPhone(String phone);

    Optional<Customer> findByIdCard(String idCard);

    boolean existsByEmail(String email);
}