import express from "express";
const router = express.Router();

import { authenticateUser } from '../middlewares/authentication.middleware';


router.post(
	'/upload-pinata',
	authenticateUser
);

export default router;
