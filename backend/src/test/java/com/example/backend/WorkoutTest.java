package com.example.backend;

import com.example.backend.model.Workout;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class WorkoutTest {

    @Test
    void shouldCreateWorkoutWithCorrectData() {
        Workout workout = new Workout();
        workout.setTitle("Workout");
        workout.setStartDate(LocalDateTime.now());

        assertEquals("Workout", workout.getTitle());
    }

    @Test
    void idShouldBeNullInitially() {
        Workout workout = new Workout();
        assertNull(workout.getId());
    }
}