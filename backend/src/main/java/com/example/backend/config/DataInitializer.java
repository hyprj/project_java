package com.example.backend.config;

import com.example.backend.model.Workout;
import com.example.backend.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
// utility to get some mock data
// adds 2 workouts only if there is no data inside the db
    private final WorkoutRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            Workout w1 = new Workout();
            w1.setTitle("Cardio");
            w1.setStartDate(LocalDateTime.now().plusDays(1).withHour(8).withMinute(0));
            w1.setEndDate(LocalDateTime.now().plusDays(1).withHour(9).withMinute(0));

            Workout w2 = new Workout();
            w2.setTitle("Full Body Workout");
            w2.setStartDate(LocalDateTime.now().plusDays(2).withHour(17).withMinute(30));
            w2.setEndDate(LocalDateTime.now().plusDays(2).withHour(19).withMinute(0));

            repository.saveAll(List.of(w1, w2));
            System.out.println("Added 2 workouts");
        }
    }
}