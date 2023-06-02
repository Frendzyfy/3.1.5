package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user")
    public String getUserInfo(Principal principal, Model model) {
        String username = principal.getName();
        User user = userService.getUserByUsername(username).get();

        model.addAttribute("userForHeader", user);
        model.addAttribute("user", user);

        return "user";
    }
}
