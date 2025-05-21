import express from "express";
import { Board } from "../models/board.js";

const router = express.Router();

// Mostrar todos los boards (tablones)
router.get("/", async (req, res) => {
    const boards = await Board.findAll();
    res.render("boards", { boards });
});

export default router;