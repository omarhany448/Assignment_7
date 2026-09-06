import express from "express";

import userRouter from "./modules/user/user.routes.js";
import noteRouter from "./modules/note/note.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

export default app;