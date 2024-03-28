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
import { dataByUserWrapper, uploadWrapper } from "../middlewares/wrapper.middleware";
import { dataByUser } from "../middlewares/dataByUser.middleware";


router.post('/get_list', uploadMulter.none(), getSkillList);

router.post(
    '/add',
    authenticateUser,
    uploadMulter.single('image'),
    uploadWrapper(uploadImage, { height: 520, width: 520 }),
    addSkill
);

router.put(
    '/update',
    authenticateUser,
    uploadMulter.single('image'),
    dataByUserWrapper(dataByUser, 'skill'),
    uploadWrapper(uploadImage, { height: 520, width: 520 }, true),
    updateSkill
);

router.delete(
    '/delete/:id',
    authenticateUser,
    dataByUserWrapper(dataByUser, 'skill'),
    deleteImage,
    deleteSkill
);


export default router;
