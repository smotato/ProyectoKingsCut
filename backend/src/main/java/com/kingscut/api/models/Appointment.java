package com.kingscut.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private User cliente;

    @ManyToOne
    @JoinColumn(name = "barbero_id")
    private User barbero;

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private ServiceEntity servicio;

    private LocalDateTime fechaHora;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus estado;
}
