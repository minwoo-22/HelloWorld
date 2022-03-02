package com.helloworld.project.controller;

import com.helloworld.project.config.LoginUser;
import com.helloworld.project.domain.SessionUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class pageController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "/main/login";
    }

    @RequestMapping("/main")
    public String main(Model model, @LoginUser SessionUser user) {
        if (user != null) {
            model.addAttribute("name", user.getName());
        }
        return "/main/main";
    }

    @RequestMapping("/logout")
    public String logout() {
        return "index";
    }

    @RequestMapping("/find/people")
    public String find() {
        return "find";
    }
}
