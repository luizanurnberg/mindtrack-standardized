package com.web.mindtrackproject.service.asbtractFactory;

import org.springframework.stereotype.Service;

@Service
public class ColorFactoryService {
    public ColorFactory createColorFactory(String colorFactory) {
        if ("Red".equalsIgnoreCase(colorFactory)) {
            return new RedColorFactory();
        } else if ("Blue".equalsIgnoreCase(colorFactory)) {
            return new BlueColorFactory();
        }
        return null;
    }
}
