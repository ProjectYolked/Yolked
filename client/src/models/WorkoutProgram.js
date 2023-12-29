import Exercise from "./Exercise.js";

class WorkoutProgram {
    constructor(data) {
        this.id = data.id || null; // Store the MongoDB-generated ID
        this.name = data.name || '';
        this.description = data.description || '';
        this.createdBy = data.createdBy || null;
        this.weeklySchedules = data.weeklySchedules || []; // Each element in this array is an object representing a week
    }

    // Method to add a workout to a specific week and day
    putWorkout(weekIndex, day, workout) {
        // Ensure the weeklySchedule array has enough weeks
        while (this.weeklySchedules.length <= weekIndex) {
            this.weeklySchedules.push(this.createEmptyWeek());
        }

        // Add the workout to the specified day of the specified week
        if (this.weeklySchedules[weekIndex][day]) {
            this.weeklySchedules[weekIndex][day].push(workout);
        } else {
            // If the day doesn't exist in the week, initialize it with the workout
            this.weeklySchedules[weekIndex][day] = [workout];
        }
    }

    // Helper method to create an empty week
    createEmptyWeek() {
        return {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        };
    }
}
export default WorkoutProgram;
