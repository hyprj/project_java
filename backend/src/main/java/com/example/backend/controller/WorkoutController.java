package com.example.backend.controller;

import com.example.backend.model.Workout;
import com.example.backend.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService service;

    @GetMapping
    public List<Workout> getAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Workout> create(@Valid @RequestBody Workout workout) {
        return new ResponseEntity<>(service.save(workout), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> update(@PathVariable String id, @Valid @RequestBody Workout workout) {
        return ResponseEntity.ok(service.update(id, workout));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}