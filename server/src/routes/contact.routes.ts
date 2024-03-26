import express from "express";
const router = express.Router();

import {
    addContact,
    deleteContact, getContactList
} from '../controllers/contact.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';
import { uploadMulter } from "../middlewares/image.upload.middleware";

router.post('/send', uploadMulter.none(), addContact);
router.post('/get_list', uploadMulter.none(), authenticateUser, getContactList);
router.delete('/delete/:id', authenticateUser, deleteContact);


export default router;
