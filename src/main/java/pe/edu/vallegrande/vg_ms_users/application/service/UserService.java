package pe.edu.vallegrande.vg_ms_users.application.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.vg_ms_users.domain.model.User;
import pe.edu.vallegrande.vg_ms_users.domain.repository.UsersRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Mono<User> findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public Mono<User> saveUser(User user) {
        // Hashear la contraseña antes de guardarla
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return usersRepository.save(user);
    }

    public Flux<User> findByRoles(String role) {
        return usersRepository.findByRoles(role);
    }

    // Nuevos métodos para el AdminController
    public Flux<User> findAllUsers() {
        return usersRepository.findAll();
    }

    public Mono<User> findById(String id) {
        return usersRepository.findById(id);
    }

    public Mono<Void> deleteById(String id) {
        return usersRepository.deleteById(id);
    }
}
