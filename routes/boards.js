import { Board } from "../models/board.js";


router.get("/boards", async (req, res) => {
    const boards = await Board.findAll();
    res.render("boards", {
        title: "Boards",
        desc: "Aquí puedes ver tus tableros",
        boards,
    });
});

router.post("/boards", async (req, res) => {
    const { name, description } = req.body;
    await Board.create({name,description,});
    res.redirect("/boards");
});

export default router;