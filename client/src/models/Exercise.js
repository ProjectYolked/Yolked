class Exercise {
    constructor(data) {
        this.id = data.id || null; // Store the MongoDB-generated ID
        this.name = data.name || '';
        this.sets = data.sets || []; // this will be an array of Set objects
        this.muscleGroups = data.muscleGroups || [];
    }

    // Method to add a set to the exercise
    addSet(set) {
        this.sets.push(set);
    }

    // Method to display exercise info
    displayInfo() {
        return `Exercise: ${this.name}, Target Muscle Groups: ${this.muscleGroups.join(', ')}`;
    }

    // Method to check if exercise has at least one set
    hasSets() {
        return this.sets.length > 0;
    }
}

export default Exercise;
