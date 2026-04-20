package com.electricity.contractservice.controller;

import com.electricity.contractservice.model.Contract;
import com.electricity.contractservice.service.ContractService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@Slf4j
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PostMapping
    public ResponseEntity<?> createContract(@Valid @RequestBody Contract contract) {
        log.info("========================================");
        log.info("SERVICE: ContractService");
        log.info("ENDPOINT: POST /api/contracts");
        log.info("CUSTOMER ID: {}", contract.getCustomerId());
        log.info("APARTMENT ID: {}", contract.getApartmentId());
        log.info("ELECTRIC SERVICE ID: {}", contract.getElectricServiceId());
        log.info("========================================");

        try {
            Contract saved = contractService.createContract(contract);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            log.error("ContractService: create contract failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

