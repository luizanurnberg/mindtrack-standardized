package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.service.factoryMethod.Page;
import com.web.mindtrackproject.service.factoryMethod.PageFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PageController {
    private final PageFactory pageFactory;

    public PageController(PageFactory pageFactory) {
        this.pageFactory = pageFactory;
    }

    @GetMapping("/404")
    public String notFound() {
        Page page = pageFactory.createPage();
        return page.render();
    }
}
