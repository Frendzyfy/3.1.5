package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    private final UserService userService;

    @Autowired
    public AdminController(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers(Model model) {

        List<User> allUsers = userService.getAllUsers();
        model.addAttribute("users", allUsers);

        return "users";
    }
    @GetMapping("/addNewUser")
    public String addNewUser(Model model) {
        User user = new User();
        List<Role> list = roleRepository.findAll();
        model.addAttribute("newUser", user);        model.addAttribute("allRoles", list);
        model.addAttribute("allRoles", list);
        return "user-info";
    }
    @PostMapping("/saveUser")
    public String saveUser(@RequestParam("roles") List<Long> roleIds, @ModelAttribute("newUser") @Valid User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            List<Role> list = roleRepository.findAll();
            model.addAttribute("allRoles", list);
            return "user-info";
        } else {
            Set<Role> roles = new HashSet<>(roleRepository.findAllById(roleIds));
            user.setRoles(roles);
            if (user.getPassword().startsWith("$2a$")) {
                userService.saveUser(user);
            } else {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(user);
            }
            return "redirect:/admin";
        }
    }
    @GetMapping("/updateInfo")
    public String updateUser(@RequestParam("userId") Long id, Model model) {
        User user = userService.getUser(id);
        List<Role> list = roleRepository.findAll();
        model.addAttribute("newUser", user);
        model.addAttribute("allRoles", list);
        return "user-info";
    }
    @GetMapping("/deleteUser")
    public String deleteUser(@RequestParam("userId") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}