import { router } from '../../server'

import {
    saveContactForm,
    getContactList
} from '../controllers/contact.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';

router.post('/sendContact', saveContactForm);
router.post('/getContact', authenticateUser, getContactList);


export default router;
