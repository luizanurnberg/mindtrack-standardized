package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    static UserRepository create() {
        return new UserRepositoryImpl();
    }

    User findByEmail(String email);
}
