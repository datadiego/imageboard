import express from "express";
import nunjucks from "nunjucks";
import { User } from "./models/user.js";
import { loggerBasic, loggerCustom } from "./middleware/log.js";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
const app = express();
app.use(loggerCustom);
import "./db/init.js";
import "./db/populate.js";
const PORT = 3000;

const SQLiteStoreSession = SQLiteStore(session);

const sessionStore = new SQLiteStoreSession({
    db: "sessions.sqlite",
    dir: "./db"
})

const sessionConfig = {
    store: sessionStore,
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.use(session(sessionConfig));

const env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.set("view engine", "njk")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import usersRouter from "./routes/users.js";
import pagesRouter from "./routes/pages.js";
import authRouter from "./routes/auth.js";
app.use("/users", usersRouter);
app.use("/", pagesRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});