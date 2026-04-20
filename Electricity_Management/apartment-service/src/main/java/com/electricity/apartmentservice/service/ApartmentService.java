package com.electricity.apartmentservice.service;

import com.electricity.apartmentservice.model.Apartment;
import com.electricity.apartmentservice.repository.ApartmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;

    public List<Apartment> getAvailableApartments(Apartment apartment) {
        log.info("ApartmentService: fetching available apartments for customerId={}", apartment.getCustomerId());
        List<Apartment> apartments = apartmentRepository.findByCustomerIdAndStatus(
                apartment.getCustomerId(), "active");
        log.info("ApartmentService: found {} apartments for customerId={}", apartments.size(), apartment.getCustomerId());
        return apartments;
    }
}

