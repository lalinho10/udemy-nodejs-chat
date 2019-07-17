class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };

        this.users.push(user);

        return this.getGroupUser(room);
    }

    getUser(userId) {
        let user = this.users.filter(user => user.id === userId)[0];

        return user;
    }

    getUsers() {
        return this.users;
    }

    getGroupUser(room) {
        let groupUsers = this.users.filter(user => user.room === room);

        return groupUsers;
    }

    removeUser(userId) {
        let removedUser = this.getUser(userId);

        this.users = this.users.filter(user => user.id !== userId);

        return removedUser;
    }

}



module.exports = { Users };