package com.web.mindtrackproject.service.asbtractFactory;

public class RedColorFactory implements ColorFactory{
    @Override
    public Color createColor() {
        return new RedColor();
    }
}
