package com.web.mindtrackproject.service.factoryMethod;

import org.springframework.stereotype.Component;

@Component
public class NotFoundPageFactory implements PageFactory {
    @Override
    public Page createPage() {
        return new NotFoundPage();
    }
}
