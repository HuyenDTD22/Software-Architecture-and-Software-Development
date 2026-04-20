package com.electricity.electricservice.service;

import com.electricity.electricservice.model.ElectricService;
import com.electricity.electricservice.model.PriceList;
import com.electricity.electricservice.model.PriceTier;
import com.electricity.electricservice.repository.ElectricServiceRepository;
import com.electricity.electricservice.repository.PriceListRepository;
import com.electricity.electricservice.repository.PriceTierRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ElectricPricingService {

    @Autowired
    private ElectricServiceRepository electricServiceRepository;

    @Autowired
    private PriceListRepository priceListRepository;

    @Autowired
    private PriceTierRepository priceTierRepository;

    public List<ElectricService> getAllActiveServices() {
        log.info("ElectricPricingService: fetching all active electric services");
        List<ElectricService> services = electricServiceRepository.findByStatus("active");
        log.info("ElectricPricingService: found {} active services", services.size());
        return services;
    }

    public Map<String, Object> getPricingByServiceId(ElectricService electricService) {
        log.info("ElectricPricingService: fetching pricing for serviceId={}", electricService.getId());

        ElectricService service = electricServiceRepository.findById(electricService.getId())
                .orElseThrow(() -> new RuntimeException("Electric service not found with id: " + electricService.getId()));

        PriceList priceList = priceListRepository
                .findByElectricServiceIdAndStatus(electricService.getId(), "active")
                .orElseThrow(() -> new RuntimeException("No active price list for serviceId: " + electricService.getId()));

        List<PriceTier> tiers = priceTierRepository
                .findByPriceListIdOrderByTierOrder(priceList.getId());

        log.info("ElectricPricingService: found {} price tiers for serviceId={}", tiers.size(), electricService.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("service", service);
        result.put("priceList", priceList);
        result.put("tiers", tiers);
        return result;
    }
}
