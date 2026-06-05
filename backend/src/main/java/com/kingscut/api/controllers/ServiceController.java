package com.kingscut.api.controllers;

import com.kingscut.api.models.ServiceEntity;
import com.kingscut.api.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public ServiceEntity createService(@RequestBody ServiceEntity service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/{id}")
    public ServiceEntity updateService(@PathVariable Long id, @RequestBody ServiceEntity serviceDetails) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow();
        service.setNombre(serviceDetails.getNombre());
        service.setDescripcion(serviceDetails.getDescripcion());
        service.setDuracionMinutos(serviceDetails.getDuracionMinutos());
        service.setPrecio(serviceDetails.getPrecio());
        service.setActivo(serviceDetails.getActivo());
        return serviceRepository.save(service);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
    }
}
