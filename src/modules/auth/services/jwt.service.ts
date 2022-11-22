import jwt from 'jsonwebtoken';
import { EnvConfig } from '../../../envConfig';

export class JwtService {
  getToken(userId: string) {
    if (!EnvConfig.SECRET_KEY) {
      throw new Error('Internal server error');
    }
    return jwt.sign({ userId }, EnvConfig.SECRET_KEY, { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    if (!EnvConfig.SECRET_KEY) {
      throw new Error('Internal server error');
    }
    return jwt.verify(token, EnvConfig.SECRET_KEY) as { userId: string };
  }
}
