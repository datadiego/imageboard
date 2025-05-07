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
    const boards = ["general", "videojuegos", "testing"]
    for (const board of boards) {
        await Board.create({
            name: board
        })
    }
}

const populatePosts = async () => {
    const mensajes = ["hola mundo", "como estan?", "todo bien?"]
    for(const mensaje of mensajes) {
        await Post.create({
            title: mensaje,
            content: mensaje,
            image: null,
            userId: 1,
            boardId: 1
        })
    }
}

try{
    await populateUsers()
    await populateBoards()
    await populatePosts()
} catch(error) {
    console.error("Error al crear los datos de prueba", error)
} finally {
    console.log("Datos de prueba creados")
    // process.exit(0)
}