import express from "express";
import nunjucks from "nunjucks";
import { User } from "./models/user.js";
import { loggerBasic, loggerCustom } from "./middleware/log.js";
const app = express();
app.use(loggerCustom);
const PORT = 3000;

const env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.set("view engine", "njk")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import usersRouter from "./routes/users.js";
import pagesRouter from "./routes/pages.js";
app.use("/users", usersRouter);
app.use("/", pagesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});