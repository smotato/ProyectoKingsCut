package com.kingscut.api.controllers;

import com.kingscut.api.models.Appointment;
import com.kingscut.api.models.AppointmentStatus;
import com.kingscut.api.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/barber/{id}")
    public List<Appointment> getBarberAppointments(@PathVariable Long id) {
        return appointmentRepository.findByBarberoId(id);
    }

    @GetMapping("/client/{id}")
    public List<Appointment> getClientAppointments(@PathVariable Long id) {
        return appointmentRepository.findByClienteId(id);
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        appointment.setEstado(AppointmentStatus.PENDIENTE);
        return appointmentRepository.save(appointment);
    }

    @PutMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow();
        appt.setEstado(AppointmentStatus.valueOf(body.get("estado")));
        return appointmentRepository.save(appt);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedData) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow();
        if (updatedData.getFechaHora() != null) appt.setFechaHora(updatedData.getFechaHora());
        if (updatedData.getServicio() != null) appt.setServicio(updatedData.getServicio());
        if (updatedData.getBarbero() != null) appt.setBarbero(updatedData.getBarbero());
        return appointmentRepository.save(appt);
    }
}
