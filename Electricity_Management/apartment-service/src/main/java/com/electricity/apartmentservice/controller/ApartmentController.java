package com.electricity.apartmentservice.controller;

import com.electricity.apartmentservice.model.Apartment;
import com.electricity.apartmentservice.service.ApartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@Slf4j
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @GetMapping("/customer/{customerId}/available")
    public ResponseEntity<?> getAvailableApartments(@PathVariable Integer customerId) {
        log.info("========================================");
        log.info("SERVICE: ApartmentService");
        log.info("ENDPOINT: GET /api/apartments/customer/{customerId}/available");
        log.info("CUSTOMER ID: {}", customerId);
        log.info("========================================");

        try {
            // Đóng gói customerId vào Apartment object trước khi truyền vào Service
            Apartment apartment = new Apartment();
            apartment.setCustomerId(customerId);

            List<Apartment> apartments = apartmentService.getAvailableApartments(apartment);
            return ResponseEntity.ok(apartments);
        } catch (RuntimeException e) {
            log.error("ApartmentService: get available apartments failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
