import { User } from "../models/user.js";
import { Board } from "../models/board.js";
import bcrypt from "bcrypt";

const populateUsers = async () => {
    const users = ["admin", "user1", "user2"]
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user+"pass", 10);
        
        await User.create({
            username: user,
            password: hashedPassword
        })
    }

    for (let i=0; i<users.length; i++) {
        const user = users[i]
    }
}

const populateBoards = async () => {
    const boards = ["general", "videojuegos", "testing"]
    for (const board of boards) {
        await Board.create({
            name: board
        })
    }
}

populateUsers()
populateBoards()