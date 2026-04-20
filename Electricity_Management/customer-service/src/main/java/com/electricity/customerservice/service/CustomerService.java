package com.electricity.customerservice.service;

import com.electricity.customerservice.model.Customer;
import com.electricity.customerservice.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer addCustomer(Customer customer) {
        log.info("CustomerService: adding new customer, idCard={}", customer.getIdCard());

        if (customerRepository.existsByIdCard(customer.getIdCard())) {
            throw new RuntimeException("ID card already exists: " + customer.getIdCard());
        }
        if (customerRepository.existsByPhone(customer.getPhone())) {
            throw new RuntimeException("Phone number already exists: " + customer.getPhone());
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Phone number already exists: " + customer.getEmail());
        }

        Customer saved = customerRepository.save(customer);
        log.info("CustomerService: customer added successfully, id={}", saved.getId());
        return saved;
    }

    public Customer searchCustomers(Customer customer) {
        log.info("CustomerService: searching customer by idCard={}", customer.getIdCard());

        return customerRepository.findByIdCard(customer.getIdCard())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
