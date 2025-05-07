import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        desc: "Register a new user",
    });
});
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        desc: "Inicia sesion",
    });
});

router.get("/profile", isAuthenticated, (req, res) => {
    const user = req.session.username;
    res.render("profile", {user})
});

router.get("/boards", async (req, res) => {
    res.render("boards", {
        title: "Boards",
        desc: "Aquí puedes ver tus tableros",
    });
});

router.get("/posts", async (req, res) => {
    res.render("posts", {
        title: "Posts",
        desc: "Aquí puedes ver tus posts",
    });
});
export default router;