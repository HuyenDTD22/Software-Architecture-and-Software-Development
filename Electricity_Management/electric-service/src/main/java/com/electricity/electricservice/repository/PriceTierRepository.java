package com.electricity.electricservice.repository;

import com.electricity.electricservice.model.PriceTier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PriceTierRepository extends JpaRepository<PriceTier, Integer> {
    List<PriceTier> findByPriceListIdOrderByTierOrder(Integer priceListId);
}