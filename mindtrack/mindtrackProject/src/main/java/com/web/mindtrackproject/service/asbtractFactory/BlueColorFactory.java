package com.web.mindtrackproject.service.asbtractFactory;

public class BlueColorFactory implements ColorFactory{
    @Override
    public Color createColor() {
        return new BlueColor();
    }
}
