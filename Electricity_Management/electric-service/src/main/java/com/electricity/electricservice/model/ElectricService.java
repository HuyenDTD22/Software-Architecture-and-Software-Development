package com.electricity.electricservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "electric_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectricService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    private String description;
    private String unit;
    private String status;

    @PrePersist
    protected void onCreate() {
        if (status == null) status = "active";
    }
}

