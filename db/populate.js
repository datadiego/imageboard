import { User } from "../models/user.js";
import { Board } from "../models/board.js";
import { Post } from "../models/post.js";
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
    const boards = ["General", "Sports", "Technology"]
    for (const board of boards) {
        await Board.create({
            name: board
        })
    }
}

const populatePosts = async () => {
    const posts = [ "hola", "adios", "buenas tardes"]
    for (const post of posts) {
        await Post.create({
            title: post,
            content: "contenido",
            boardId: 1,
            userId: 1
        })
    }
}

try{
    await populateUsers()
    await populateBoards()
    await populatePosts()
}catch(error){
    console.error("Error populating the database:", error);
} finally{
    //process.exit(0);
    console.log("Database populated successfully");
}
