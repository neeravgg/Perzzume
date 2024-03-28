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
import { dataByUserWrapper, uploadWrapper } from "../middlewares/wrapper.middleware";
import { dataByUser } from "../middlewares/dataByUser.middleware";


router.post('/get_list', uploadMulter.none(), getProjectList);

router.post(
    '/add',
    authenticateUser,
    uploadMulter.single('image'),
    uploadWrapper(uploadImage, { height: 520, width: 520 }),
    addProject
);

router.put(
    '/update',
    authenticateUser,
    uploadMulter.single('image'),
    dataByUserWrapper(dataByUser, 'project'),
    uploadWrapper(uploadImage, { height: 520, width: 520 }, true),
    updateProject
);

router.delete(
    '/delete/:id', authenticateUser,
    dataByUserWrapper(dataByUser, 'project'),
    deleteImage,
    deleteProject
);


export default router;
