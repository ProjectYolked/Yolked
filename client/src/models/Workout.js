class Workout {
    constructor(data) {
        this.name = data.name || '';
        this.description = data.description || '';
        this.exercises = data.exercises || []; // This will be an array of Exercise objects
    }

    displaySummary() {
        return `${this.name}: ${this.description}`;
    }
    totalExercises() {
        return this.exercises.length;
    }

}

export default Workout;
