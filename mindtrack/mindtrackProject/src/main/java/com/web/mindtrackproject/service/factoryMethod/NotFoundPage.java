package com.web.mindtrackproject.service.factoryMethod;

public class NotFoundPage implements Page{
    @Override
    public String render() {
        return "Página 404";
    }
}
