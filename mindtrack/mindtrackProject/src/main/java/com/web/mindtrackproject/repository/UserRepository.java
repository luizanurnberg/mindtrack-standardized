package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

     default UserRepository create() {
        return (UserRepository) new UserRepositoryImpl();
    }
}
