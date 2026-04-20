package com.reto.usuario_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class HealthController {
    
    @GetMapping("/health")
    public Mono<Map<String, Object>> health() {
        return Mono.just(Map.of(
                "status", "UP",
                "service", "usuario-service",
                "timestamp", LocalDateTime.now(),
                "version", "1.0.0"
        ));
    }
    
    @GetMapping("/status")
    public Mono<String> status() {
        return Mono.just("Usuario Service is running!");
    }
}