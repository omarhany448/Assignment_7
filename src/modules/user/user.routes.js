import { Router } from "express";

import {
    signupController,
    loginController,
    updateUserController,
    deleteUserController,
    getUserController
} from "./user.controller.js";

const router = Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.patch("/:id", updateUserController);

router.delete("/", deleteUserController);

router.get("/", getUserController);

export default router;