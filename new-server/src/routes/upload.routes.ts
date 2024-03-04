import { router } from '../../server'

import { authenticateUser } from '../middlewares/authentication.middleware';


router.post(
	'/upload-pinata',
	authenticateUser
);

export default router;
