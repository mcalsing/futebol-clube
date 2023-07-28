import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import Token from '../utils/generateToken';

class UserService {
  static emailRegex = /^\S+@\S+\.\S+$/;
  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ where: { email } });

    if (!UserService.emailRegex.test(email)) {
      return undefined;
    }

    if (user?.email !== email || !bcrypt.compareSync(password, user?.password)) {
      return undefined;
    }

    const token = Token.createToken(email);
    return token;
  }

  static async role(email: string) {
    const userData = await UserModel.findOne({ where: { email } });
    return userData?.role;
  }
}

export default UserService;
