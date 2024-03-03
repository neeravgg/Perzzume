import { router } from '../server'

const contactController = require('../Controllers/contactController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/sendContact', contactController.saveContactForm);
router.post('/getContact', authenticateUser, contactController.getContactList);


export default router;
