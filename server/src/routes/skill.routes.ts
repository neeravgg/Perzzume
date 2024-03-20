import express from "express";
const router = express.Router();

import {
    getSkillList,
    addSkill,
    updateSkill,
    deleteSkill
} from '../controllers/skill.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';


router.get('/get_list/:user_id', getSkillList);
router.post('/add', authenticateUser, addSkill);
router.put('/update', authenticateUser, updateSkill);
router.delete('/delete/:id', authenticateUser, deleteSkill);


export default router;
