import { router } from '../../server'

import { adminLogin, adminRegister } from "../controllers/auth.controller";

router.get("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);


export default router;
