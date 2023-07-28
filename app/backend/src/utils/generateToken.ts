import * as jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

class Token {
  static createToken(email: string) {
    const data = { email };
    const token = jwt.sign(data, TOKEN_SECRET, JWT_CONFIG);
    return token;
  }
}

export default Token;
