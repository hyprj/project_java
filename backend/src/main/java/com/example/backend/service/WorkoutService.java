package com.example.backend.service;

import com.example.backend.model.Workout;
import com.example.backend.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository repository;

    public List<Workout> findAll() {
        return repository.findAll();
    }

    public Workout save(Workout workout) {
        validateWorkout(workout);
        return repository.save(workout);
    }

    public Workout update(String id, Workout workoutDetails) {
        Workout existingWorkout = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout with id " + id + " not found"));

        validateWorkout(workoutDetails);

        existingWorkout.setTitle(workoutDetails.getTitle());
        existingWorkout.setStartDate(workoutDetails.getStartDate());
        existingWorkout.setEndDate(workoutDetails.getEndDate());

        return repository.save(existingWorkout);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    private void validateWorkout(Workout workout) {
        if (workout.getTitle() == null || workout.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        if (workout.getEndDate() != null && workout.getStartDate() != null) {
            if (workout.getEndDate().isBefore(workout.getStartDate())) {
                throw new IllegalArgumentException("End date cannot be before start date");
            }
        }
    }
}