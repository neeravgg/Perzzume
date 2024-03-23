import express from "express";
const router = express.Router();

import { adminLogin, adminRegister, logout, refreshToken } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";

router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);
router.get("/admin/refresh", refreshToken);
router.get("/admin/logout", authenticateUser, logout);


export default router;
