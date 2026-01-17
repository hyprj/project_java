package com.example.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "trainings")
@Data
public class Workout {
    @Id
    private String id;

    @NotBlank(message = "title can not be empty")
    private String title;

    @NotNull(message = "startDate is required")
    private LocalDateTime startDate;

    @NotNull(message = "end is required")
    private LocalDateTime endDate;
}