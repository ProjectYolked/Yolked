class User {
    constructor(data) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.programs = data.programs || [];
    }
    displayInfo() {
        return `User: ${this.username}, Email: ${this.email}, Programs: ${this.programs}`;
    }
}

export default User;
