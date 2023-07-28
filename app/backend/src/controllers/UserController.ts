import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);

    if (token) return res.status(200).json({ token });

    return res.status(401).json({ message: 'Invalid email or password' });
  }

  static async role(req: Request, res: Response) {
    const { email } = res.locals.user;
    const roleUser = await UserService.role(email);
    return res.status(200).json({ role: roleUser });
  }
}

export default UserController;
// req.data = { decoded };
