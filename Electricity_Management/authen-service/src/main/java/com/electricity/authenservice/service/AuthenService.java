package com.electricity.authenservice.service;

import com.electricity.authenservice.model.Employee;
import com.electricity.authenservice.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee login(Employee employee) {
        log.info("AuthenService: attempting login for username={}", employee.getUsername());

        Employee found = employeeRepository.findByUsername(employee.getUsername())
                .orElseThrow(() -> new RuntimeException("Username or password is incorrect"));

        if (!found.getPassword().equals(employee.getPassword())) {
            throw new RuntimeException("Username or password is incorrect");
        }

        log.info("AuthenService: login successful for username={}", employee.getUsername());
        return found;
    }
}

