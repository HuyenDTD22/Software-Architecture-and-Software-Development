package com.electricity.electricservice.controller;

import com.electricity.electricservice.model.ElectricService;
import com.electricity.electricservice.service.ElectricPricingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/electric-services")
@Slf4j
public class ElectricPricingController {

    @Autowired
    private ElectricPricingService electricPricingService;

    @GetMapping
    public ResponseEntity<?> getAllActiveServices() {
        log.info("========================================");
        log.info("SERVICE: ElectricPricingService");
        log.info("ENDPOINT: GET /api/electric-services");
        log.info("========================================");

        try {
            return ResponseEntity.ok(electricPricingService.getAllActiveServices());
        } catch (RuntimeException e) {
            log.error("ElectricPricingService: get all services failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/pricing")
    public ResponseEntity<?> getPricingByServiceId(@PathVariable Integer id) {
        log.info("========================================");
        log.info("SERVICE: ElectricPricingService");
        log.info("ENDPOINT: GET /api/electric-services/{}/pricing", id);
        log.info("========================================");

        try {
            ElectricService electricService = new ElectricService();
            electricService.setId(id);

            return ResponseEntity.ok(electricPricingService.getPricingByServiceId(electricService));
        } catch (RuntimeException e) {
            log.error("ElectricPricingService: get pricing failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
