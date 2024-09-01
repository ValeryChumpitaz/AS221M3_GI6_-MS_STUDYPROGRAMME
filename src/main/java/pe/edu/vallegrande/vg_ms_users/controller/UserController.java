package pe.edu.vallegrande.vg_ms_users.application.controller;

import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.vg_ms_users.application.service.UserService;
import pe.edu.vallegrande.vg_ms_users.domain.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public Mono<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping
    public Mono<User> createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/roles/{role}")
    public Flux<User> getUsersByRole(@PathVariable String role) {
        return userService.findByRoles(role);
    }
}
