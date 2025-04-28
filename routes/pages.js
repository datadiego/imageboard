import express from 'express';

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        desc: "Register a new user",
    });
});

export default router;