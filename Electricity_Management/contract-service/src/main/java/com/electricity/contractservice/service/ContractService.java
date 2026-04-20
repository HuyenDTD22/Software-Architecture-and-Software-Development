package com.electricity.contractservice.service;

import com.electricity.contractservice.model.Contract;
import com.electricity.contractservice.repository.ContractRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    public Contract createContract(Contract contract) {
        log.info("ContractService: creating contract for customerId={}, apartmentId={}",
                contract.getCustomerId(), contract.getApartmentId());

        if (contractRepository.existsByApartmentIdAndStatus(contract.getApartmentId(), "active")) {
            throw new RuntimeException("Apartment already has an active contract");
        }

        if (contract.getExpiryDate() != null &&
                contract.getExpiryDate().isBefore(contract.getEffectiveDate())) {
            throw new RuntimeException("Expiry date must be after effective date");
        }

        contract.setContractCode(generateContractCode());

        Contract saved = contractRepository.save(contract);
        log.info("ContractService: contract created successfully, code={}", saved.getContractCode());
        return saved;
    }

    private String generateContractCode() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        long count = contractRepository.count() + 1;
        return String.format("HD-%s-%04d", datePart, count);
    }
}
