import { router } from '../server'

const { authenticateUser } = require('../middleware/authentication');

router.post(
	'/upload-pinata',
	authenticateUser
);

export default router;
