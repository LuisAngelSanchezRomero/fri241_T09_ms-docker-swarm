package com.reto.usuario_service.controller;

import com.reto.usuario_service.model.Usuario;
import com.reto.usuario_service.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    @GetMapping
    public Flux<Usuario> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }
    
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Usuario>> obtenerPorId(@PathVariable String id) {
        return usuarioService.obtenerPorId(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Mono<ResponseEntity<Usuario>> crear(@Valid @RequestBody Usuario usuario) {
        return usuarioService.crear(usuario)
                .map(usuarioCreado -> ResponseEntity.status(HttpStatus.CREATED).body(usuarioCreado))
                .onErrorReturn(ResponseEntity.badRequest().build());
    }
    
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Usuario>> actualizar(@PathVariable String id, 
                                                   @Valid @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario)
                .map(usuarioActualizado -> ResponseEntity.ok(usuarioActualizado))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> eliminar(@PathVariable String id) {
        return usuarioService.eliminar(id)
                .then(Mono.just(ResponseEntity.noContent().<Void>build()));
    }
}