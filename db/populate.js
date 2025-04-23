import { User } from "../models/user.js";

const populateUsers = async () => {
    const users = ["admin", "user1", "user2"]
    for (const user of users) {
        await User.create({
            username: user,
            password: user+"pass"
        })
    }

    for (let i=0; i<users.length; i++) {
        const user = users[i]
    }
}

populateUsers()