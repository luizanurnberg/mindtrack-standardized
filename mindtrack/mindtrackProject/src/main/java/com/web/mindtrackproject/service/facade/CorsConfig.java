package com.web.mindtrackproject.service.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Autowired
    private CorsConfigService corsConfigFacade;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        corsConfigFacade.addCorsMappings(registry);
    }
}