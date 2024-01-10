package com.web.mindtrackproject.service;
import com.web.mindtrackproject.service.command.Command;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.LinkedList;
import java.util.Queue;

@Configuration
public class SecurityConfigService {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public Queue<Command> commandQueue() {
        return new LinkedList<>();
    }
}