package com.electricity.apartmentservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "apartments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "customer_id", nullable = false)
    @NotNull(message = "Customer ID is required")
    private Integer customerId;

    @Column(name = "apartment_code", unique = true, nullable = false)
    @NotBlank(message = "Apartment code is required")
    private String apartmentCode;

    @Column(nullable = false)
    @NotBlank(message = "Address is required")
    private String address;

    private Double area;
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "active";
    }
}
