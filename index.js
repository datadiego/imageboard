import express from "express";
import nunjucks from "nunjucks";
import { User } from "./models/user.js";
const app = express();
const PORT = 3000;

const env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.set("view engine", "njk")

app.get('/', async (req, res) => {
    const usersRaw = await User.findAll()
    const users = usersRaw.map(user => {
        return {
            id: user.id,
            name: user.username,
            pass: user.password,
        }
    })
    console.log(users)
    res.render("test", {
        title: "Test de nunjucks",
        desc: "Probando mi motor de plantillas" ,
        users
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});