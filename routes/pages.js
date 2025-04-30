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
export default router;