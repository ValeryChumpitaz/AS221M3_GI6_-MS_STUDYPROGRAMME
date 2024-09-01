package pe.edu.vallegrande.vg_ms_users.application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .authorizeExchange()
                .pathMatchers("/api/admin/**").hasRole("ADMIN")
                .pathMatchers("/api/users/**").hasRole("USER")
                .anyExchange().authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt()
                .and()
                .and();
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        // Sustituir con la URL de tu servidor de autorización
        String jwkSetUri = "https://example.com/.well-known/jwks.json";
        return NimbusReactiveJwtDecoder.withJwkSetUri(jwkSetUri).build();
    }
}
