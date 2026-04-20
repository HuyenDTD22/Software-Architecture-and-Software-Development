package com.electricity.authenservice.controller;

import com.electricity.authenservice.model.Employee;
import com.electricity.authenservice.service.AuthenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenController {

    @Autowired
    private AuthenService authenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee employee) {
        log.info("========================================");
        log.info("SERVICE: AuthenService");
        log.info("ENDPOINT: POST /api/auth/login");
        log.info("USERNAME: {}", employee.getUsername());
        log.info("========================================");

        try {
            Employee result = authenService.login(employee);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            log.error("AuthenService: login failed - {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
