class User {
    constructor(data) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.programs = data.programs || [];
    }
    displayInfo() {
        return `User: ${this.username}, Email: ${this.email}`;
    }
}

export default User;
