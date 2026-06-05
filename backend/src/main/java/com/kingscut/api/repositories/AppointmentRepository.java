package com.kingscut.api.repositories;

import com.kingscut.api.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByBarberoId(Long barberoId);
    List<Appointment> findByClienteId(Long clienteId);
}
