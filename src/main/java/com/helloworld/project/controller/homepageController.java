package com.helloworld.project.controller;

import com.helloworld.project.config.LoginUser;
import com.helloworld.project.domain.SessionUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class homepageController {
    @RequestMapping("/main")
    public String homeMain(Model model, @LoginUser SessionUser user) {
        if (user != null) {
            model.addAttribute("name", user.getName());
        }

        return "/homepage/homeMain";
    }
}
