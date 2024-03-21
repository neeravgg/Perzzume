import express from "express";
const router = express.Router();

import {
    getProjectList,
    addProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';
import { deleteImage, uploadImage, uploadMulter } from "../middlewares/image.upload.middleware";


router.get('/get_list/:user_id', getProjectList);

router.post('/add', authenticateUser, uploadMulter.single('image'),
    uploadImage, addProject);

router.put('/update', authenticateUser, uploadMulter.single('image'),
    uploadImage, updateProject);

router.delete('/delete/:id', authenticateUser, deleteImage, deleteProject);


export default router;
