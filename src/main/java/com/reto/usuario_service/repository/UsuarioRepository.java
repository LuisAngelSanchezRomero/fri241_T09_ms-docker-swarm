package com.reto.usuario_service.repository;

import com.reto.usuario_service.model.Usuario;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UsuarioRepository extends ReactiveMongoRepository<Usuario, String> {
    
    Mono<Boolean> existsByCorreo(String correo);
    
    Mono<Usuario> findByCorreo(String correo);
}