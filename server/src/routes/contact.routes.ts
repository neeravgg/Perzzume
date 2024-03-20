import express from "express";
const router = express.Router();

import {
    addContact,
    deleteContact, getContactList
} from '../controllers/contact.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';

router.post('/send', addContact);
router.post('/get_list', authenticateUser, getContactList);
router.delete('/delete/:id', authenticateUser, deleteContact);


export default router;
