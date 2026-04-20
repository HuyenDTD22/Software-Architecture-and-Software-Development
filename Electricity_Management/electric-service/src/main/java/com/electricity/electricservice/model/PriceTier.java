package com.electricity.electricservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "price_tiers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceTier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "price_list_id", nullable = false)
    private Integer priceListId;

    @Column(name = "tier_order")
    private Integer tierOrder;

    @Column(name = "from_kwh")
    private Double fromKwh;

    @Column(name = "to_kwh")
    private Double toKwh;

    @Column(name = "unit_price")
    private Double unitPrice;
}
