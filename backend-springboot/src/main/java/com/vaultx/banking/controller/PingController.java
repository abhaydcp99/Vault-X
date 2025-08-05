package com.vaultx.banking.controller;

import com.vaultx.banking.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "http://localhost:5173"})
public class PingController {

    @GetMapping("/ping")
    public ApiResponse<Map<String, String>> ping() {
        Map<String, String> response = Map.of(
            "message", "VaultX Banking API - Spring Boot",
            "status", "healthy",
            "timestamp", String.valueOf(System.currentTimeMillis())
        );
        return new ApiResponse<>(true, "Ping successful", response);
    }

    @GetMapping("/demo")
    public ApiResponse<Map<String, String>> demo() {
        Map<String, String> response = Map.of(
            "message", "Spring Boot Banking Demo API",
            "backend", "Spring Boot with JPA",
            "database", "H2 In-Memory"
        );
        return new ApiResponse<>(true, "Demo endpoint", response);
    }
}
