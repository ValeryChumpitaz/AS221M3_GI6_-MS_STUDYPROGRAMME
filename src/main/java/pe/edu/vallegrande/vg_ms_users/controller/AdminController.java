package pe.edu.vallegrande.vg_ms_users.controller;

import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.vg_ms_users.application.service.UserService;
import pe.edu.vallegrande.vg_ms_users.domain.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/admin/users")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Flux<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public Mono<User> getUserById(@PathVariable String id) {
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteUserById(@PathVariable String id) {
        return userService.deleteById(id);
    }
}
