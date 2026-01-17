# Workout Planner Application

A simple full-stack web application designed for scheduling and managing fitness activities.

## Technology Stack

* **Backend:** Java 21, Spring Boot 4, Spring Data MongoDB.
* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS.
* **Database:** MongoDB Atlas (cloud).
* **Communication:** REST API with JSON.

## Project Structure

### Backend (`/backend`)

* **Model (`Workout.java`):** Data entity defining workout structure and validation constraints.
* **Repository (`WorkoutRepository.java`):** Interface for MongoDB CRUD operations via Spring Data.
* **Service (`WorkoutService.java`):** Business logic layer handling date validation and title requirements.
* **Controller (`WorkoutController.java`):** REST API endpoints for frontend interaction.
* **Config (`DataInitializer.java`):** Startup script that populates the database with sample data if empty.
* **Exception Handling (`GlobalExceptionHandler.java`):** Centralized handler for uniform API error responses.

### Frontend (`/frontend`)

* **Week:** Main calendar view managing navigation and weekly date ranges.
* **Day:** Sub-component responsible for rendering and sorting workouts for specific dates.
* **WorkoutModal:** Unified form component for both creating and updating workout entries.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/workouts` | Fetch all workout records |
| POST | `/api/workouts` | Create a new workout |
| PUT | `/api/workouts/{id}` | Update an existing workout |
| DELETE | `/api/workouts/{id}` | Remove a workout from the database |

## Unit Testing

The project includes unit tests implemented with JUnit 5 and Mockito to verify business logic integrity:

1. **shouldThrowExceptionWhenEndDateIsBeforeStartDate:** Validates chronological logic.
2. **shouldThrowExceptionWhenTitleIsBlank:** Ensures required fields are not empty or whitespace.
3. **shouldNotThrowExceptionWhenDatesAreCorrect:** Verifies successful validation path.
4. **shouldSaveWorkoutSuccessfully:** Tests service-repository integration using mocks.
5. **contextLoads:** Integration test ensuring the Spring application context initializes correctly.

## Installation and Setup

### Prerequisites

* Java 21
* Node.js and npm
* MongoDB Atlas account

### Backend Setup

1. Navigate to the `/backend` directory.
2. Configure your MongoDB URI in `src/main/resources/application.properties`.
3. Run the application: `./mvnw spring-boot:run`

### Frontend Setup

1. Navigate to the `/frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
