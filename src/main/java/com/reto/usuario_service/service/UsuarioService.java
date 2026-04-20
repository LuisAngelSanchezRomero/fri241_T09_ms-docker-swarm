package com.reto.usuario_service.service;

import com.reto.usuario_service.model.Usuario;
import com.reto.usuario_service.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    
    public Flux<Usuario> obtenerTodos() {
        log.info("Obteniendo todos los usuarios");
        return usuarioRepository.findAll();
    }
    
    public Mono<Usuario> obtenerPorId(String id) {
        log.info("Obteniendo usuario por ID: {}", id);
        return usuarioRepository.findById(id);
    }
    
    public Mono<Usuario> crear(Usuario usuario) {
        log.info("Creando usuario: {}", usuario.getCorreo());
        return usuarioRepository.existsByCorreo(usuario.getCorreo())
                .flatMap(existe -> {
                    if (existe) {
                        return Mono.error(new RuntimeException("Ya existe un usuario con ese correo"));
                    }
                    return usuarioRepository.save(usuario);
                });
    }
    
    public Mono<Usuario> actualizar(String id, Usuario usuario) {
        log.info("Actualizando usuario ID: {}", id);
        return usuarioRepository.findById(id)
                .flatMap(usuarioExistente -> {
                    usuarioExistente.setNombre(usuario.getNombre());
                    usuarioExistente.setCorreo(usuario.getCorreo());
                    return usuarioRepository.save(usuarioExistente);
                });
    }
    
    public Mono<Void> eliminar(String id) {
        log.info("Eliminando usuario ID: {}", id);
        return usuarioRepository.deleteById(id);
    }
}