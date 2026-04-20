package com.electricity.contractservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "contract_code", unique = true)
    private String contractCode;

    @Column(name = "customer_id", nullable = false)
    @NotNull(message = "Customer ID is required")
    private Integer customerId;

    @Column(name = "apartment_id", nullable = false)
    @NotNull(message = "Apartment ID is required")
    private Integer apartmentId;

    @Column(name = "electric_service_id", nullable = false)
    @NotNull(message = "Electric service ID is required")
    private Integer electricServiceId;

    @Column(name = "sign_date")
    private LocalDate signDate;

    @Column(name = "effective_date", nullable = false)
    @NotNull(message = "Effective date is required")
    private LocalDate effectiveDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "active";
        if (signDate == null) signDate = LocalDate.now();
    }
}

