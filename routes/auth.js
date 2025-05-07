import express from "express";
import { authenticateUser } from "../models/auth.js"; 

const router = express.Router();

router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if(!user){
            return res.status(401).redirect("/login")
        }
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect("/profile");
    } catch(error){
        console.error(error);
        res.json({ error: "Hubo un error al iniciar sesion"})
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.error(err);
            return res.status(500).json({ error: "Error al cerrar sesion"})
        }
        res.redirect("/");
    });
});

export default router;