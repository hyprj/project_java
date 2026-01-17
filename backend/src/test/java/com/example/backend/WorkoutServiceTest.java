package com.example.backend;

import com.example.backend.model.Workout;
import com.example.backend.repository.WorkoutRepository;
import com.example.backend.service.WorkoutService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceTest {

    @Mock
    private WorkoutRepository repository;

    @InjectMocks
    private WorkoutService service;

    @Test
    void shouldThrowExceptionWhenEndDateIsBeforeStartDate() {
        Workout workout = new Workout();
        workout.setTitle("Workout");
        workout.setStartDate(LocalDateTime.now().plusDays(1));
        workout.setEndDate(LocalDateTime.now());

        assertThrows(IllegalArgumentException.class, () -> {
            service.save(workout);
        });
    }

    @Test
    void shouldThrowExceptionWhenTitleIsBlank() {
        Workout workout = new Workout();
        workout.setTitle("   ");
        workout.setStartDate(LocalDateTime.now());
        workout.setEndDate(LocalDateTime.now().plusHours(1));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.save(workout);
        });

        assertEquals("Title is required", exception.getMessage());
    }

    @Test
    void shouldNotThrowExceptionWhenDatesAreCorrect() {
        Workout workout = new Workout();
        workout.setTitle("Workout");
        workout.setStartDate(LocalDateTime.now());
        workout.setEndDate(LocalDateTime.now().plusHours(1));

        assertDoesNotThrow(() -> {
            service.save(workout);
        });
    }

    @Test
    void shouldSaveWorkoutSuccessfully() {
        Workout workout = new Workout();
        workout.setTitle("Workout");
        workout.setStartDate(LocalDateTime.now());
        workout.setEndDate(LocalDateTime.now().plusHours(1));

        when(repository.save(any(Workout.class))).thenReturn(workout);

        Workout result = service.save(workout);

        assertNotNull(result);
        assertEquals("Workout", result.getTitle());
        verify(repository, times(1)).save(workout);
    }
}