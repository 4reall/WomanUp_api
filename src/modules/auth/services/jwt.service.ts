import jwt from 'jsonwebtoken';
import { EnvConfig } from '../../../envConfig';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { instanceToPlain } from 'class-transformer';

export class JwtService {
  getToken(jwtPayloadDto: JwtPayloadDto) {
    if (!EnvConfig.SECRET_KEY) {
      throw new Error('Internal server error');
    }
    const payload = instanceToPlain(jwtPayloadDto);
    return jwt.sign(payload, EnvConfig.SECRET_KEY, { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    if (!EnvConfig.SECRET_KEY) {
      throw new Error('Internal server error');
    }
    return jwt.verify(token, EnvConfig.SECRET_KEY) as JwtPayloadDto;
  }
}
