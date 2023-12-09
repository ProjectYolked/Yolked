class WorkoutProgram {
    constructor(data) {
        this.name = data.name || '';
        this.description = data.description || '';
        this.createdBy = data.createdBy || null;
        this.weeklySchedule = {
            Monday: data.weeklySchedule?.Monday || [],
            Tuesday: data.weeklySchedule?.Tuesday || [],
            Wednesday: data.weeklySchedule?.Wednesday || [],
            Thursday: data.weeklySchedule?.Thursday || [],
            Friday: data.weeklySchedule?.Friday || [],
            Saturday: data.weeklySchedule?.Saturday || [],
            Sunday: data.weeklySchedule?.Sunday || []
        };
    }

    // Add methods to manipulate or display workout program data
    getWeeklyOverview() {
        return Object.entries(this.weeklySchedule).map(([day, workouts]) => {
            return `${day}: ${workouts.length} workout(s)`;
        }).join('\n');
    }

    // Other methods as needed...
}

export default WorkoutProgram;
