import express from 'express';
import { register, login, getUser, updateUser, deleteUser,getAllProvider } from '../Controllers/userController.js';
import {authenticate} from '../middleware/authentication.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticate, getUser);
router.put('/', authenticate, updateUser);
router.delete('/', authenticate, deleteUser);
router.get('/provider', getAllProvider);

export default router;
