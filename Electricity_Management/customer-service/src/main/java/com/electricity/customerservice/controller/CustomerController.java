package com.electricity.customerservice.controller;

import com.electricity.customerservice.model.Customer;
import com.electricity.customerservice.service.CustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@Slf4j
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<?> addCustomer(@Valid @RequestBody Customer customer) {
        log.info("========================================");
        log.info("SERVICE: CustomerService");
        log.info("ENDPOINT: POST /api/customers");
        log.info("FULL NAME: {}", customer.getFullName());
        log.info("ID CARD: {}", customer.getIdCard());
        log.info("========================================");

        try {
            Customer saved = customerService.addCustomer(customer);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            log.error("CustomerService: add customer failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchCustomers(@RequestBody Customer customer) {
        log.info("========================================");
        log.info("SERVICE: CustomerService");
        log.info("ENDPOINT: POST /api/customers/search");
        log.info("ID CARD: {}", customer.getIdCard());
        log.info("========================================");

        try {
            Customer found = customerService.searchCustomers(customer);
            return ResponseEntity.ok(found);
        } catch (RuntimeException e) {
            log.error("CustomerService: search failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

