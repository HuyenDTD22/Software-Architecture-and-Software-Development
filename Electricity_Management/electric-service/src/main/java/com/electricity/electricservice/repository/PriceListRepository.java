package com.electricity.electricservice.repository;

import com.electricity.electricservice.model.PriceList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PriceListRepository extends JpaRepository<PriceList, Integer> {
    Optional<PriceList> findByElectricServiceIdAndStatus(Integer electricServiceId, String status);
}

