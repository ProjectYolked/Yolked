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

    getRepRange() {
        if (!this.hasSets()) {
            return ""
        }
        let min = 10000
        let max = 0
        for (const set of this.sets) {
            if (set.reps < min) {
                min = set.reps
            }
            if (set.reps > max) {
                max = set.reps
            }
        }
        if (min === max) {
            return `${min} reps`
        }
        else {
            return `${min}-${max} reps`
        }
    }
}

export default Exercise;
