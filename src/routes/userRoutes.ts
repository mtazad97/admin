import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/UserController';

const router = Router();

router.post('/signup', registerUser);  // Use the registerUser controller function
router.post('/login', loginUser);      // Use the loginUser controller function

export default router;