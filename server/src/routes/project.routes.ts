import express from "express";
const router = express.Router();

import {
    getProjectList,
    addProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';


router.get('/get_list/:user_id', getProjectList);
router.post('/add', authenticateUser, addProject);
router.put('/update', authenticateUser, updateProject);
router.delete('/delete/:id', authenticateUser, deleteProject);


export default router;
