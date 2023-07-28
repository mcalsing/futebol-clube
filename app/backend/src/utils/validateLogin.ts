import { NextFunction, Request, Response } from 'express';
import schemas from './validations';

const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const result = schemas.loginSchema.validate(req.body);

  if (result.error) {
    if (result.error.message.includes('length')) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(400).json({ message: result.error.message });
  }
  next();
};

export default loginValidate;
