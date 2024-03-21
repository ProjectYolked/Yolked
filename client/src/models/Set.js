class Set {
    constructor(data) {
        this.type = data.type ?? '';
        this.reps = data.reps ?? null;
        this.weight = data.weight ?? null;
        this.seconds = data.seconds ?? null;
    }

    displayInfo() {
        let info = `Type: ${this.type}, `;
        if (this.type === 'weightlifting') {
            info += `Reps: ${this.reps}, Weight: ${this.weight || 'N/A'}`;
        } else {
            info += `Duration: ${this.seconds} seconds`;
        }
        return info;
    }

}

export default Set;
