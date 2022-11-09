import { Router } from 'express';
const router = Router()

import signupUser, { loginUser } from '../controller/user-controller.js';

router.post('/signup',signupUser);
router.post('/login', loginUser);


export default router;