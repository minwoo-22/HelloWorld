package com.helloworld.project.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class IndexController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        log.info("로그인으로 들어옴");
        return "/main/login";
    }
}
