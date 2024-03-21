import express from "express";
const router = express.Router();

import {
    getSkillList,
    addSkill,
    updateSkill,
    deleteSkill
} from '../controllers/skill.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';
import { deleteImage, uploadImage, uploadMulter } from "../middlewares/image.upload.middleware";


router.get('/get_list/:user_id', getSkillList);

router.post('/add', authenticateUser, uploadMulter.single('image'),
    uploadImage, addSkill);

router.put('/update', authenticateUser, uploadMulter.single('image'),
    uploadImage, updateSkill);

router.delete('/delete/:id', authenticateUser,
    deleteImage,
    deleteSkill);


export default router;
