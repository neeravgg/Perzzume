import express from "express";
const router = express.Router();

import { adminLogin, adminRegister, logout, refreshToken } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import { uploadMulter } from "../middlewares/image.upload.middleware";

router.post("/admin/login", uploadMulter.none(), adminLogin);
router.post("/admin/register", uploadMulter.none(), adminRegister);
router.get("/admin/refresh/auth", refreshToken);
router.get("/admin/logout", authenticateUser, logout);


export default router;
