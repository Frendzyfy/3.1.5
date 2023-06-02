package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @ModelAttribute("userForHeader") // Добавляем атрибут userForHeader в модель для каждого запроса
    public User userForHeader(Principal principal) {
        if (principal != null) {
            String username = principal.getName();
            return userService.getUserByUsername(username).get();
        }
        return null;
    }


    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping()
    public String showAllUsers(Model model) {
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("listRoles", userService.getAllRoles());
        model.addAttribute("newUser", new User());
        return "user-info";
    }


    @PostMapping("/saveUser")
    public String saveUser(@Valid @ModelAttribute("newUser") User newUser, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("newUser", newUser);
            model.addAttribute("bindingResult", bindingResult);

            return "user-info";
        }
        userService.saveUser(newUser);

        return "redirect:/admin";
    }


    @PostMapping("/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "redirect:/admin";
        }
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
//    @GetMapping("/updateInfo")
//    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            return "redirect:/admin";
//        }
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//
//    @PostMapping("/{id}")
//    public String delete(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }
