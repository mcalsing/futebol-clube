import { Router } from 'express';
import verifyToken from '../utils/validateJWT';
import UserController from '../controllers/UserController';
import validateLogin from '../utils/validateLogin';

const userRouter = Router();

userRouter.get('/teste', (_req, res) => res.json({ ok: 'login' }));

userRouter.post('/', validateLogin, UserController.login);
userRouter.get('/role', verifyToken, UserController.role);

export default userRouter;
