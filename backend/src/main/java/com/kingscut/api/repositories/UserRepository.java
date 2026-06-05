package com.kingscut.api.repositories;

import com.kingscut.api.models.User;
import com.kingscut.api.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRol(Role rol);
    User findByCorreo(String correo);
}
