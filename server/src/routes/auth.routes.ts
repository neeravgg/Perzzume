import express from "express";
const router = express.Router();

import { adminLogin, adminRegister } from "../controllers/auth.controller";

router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);


export default router;
