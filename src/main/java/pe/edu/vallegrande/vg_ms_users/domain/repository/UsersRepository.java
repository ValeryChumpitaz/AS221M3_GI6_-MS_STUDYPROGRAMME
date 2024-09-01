package pe.edu.vallegrande.vg_ms_users.domain.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import pe.edu.vallegrande.vg_ms_users.domain.model.User;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

public interface UsersRepository extends ReactiveMongoRepository<User, String> {

    // Método para buscar un usuario por su correo electrónico
    Mono<User> findByEmail(String email);

    // Método para buscar usuarios por rol
    Flux<User> findByRoles(String role);
}
