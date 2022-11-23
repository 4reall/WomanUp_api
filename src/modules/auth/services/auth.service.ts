import bcrypt from 'bcrypt';
import { UserDto } from '../../user/user.dto';
import userService from '../../user/user.service';
import { ApiError } from '../../../exceptions/api.error';
import jwtService from './jwt.service';
import { BaseResponse } from '../auth.types';

/**
 * @class
 * @category Auth
 * @subcategory Services
 */
class AuthService {
  async registration(userDto: UserDto): Promise<BaseResponse> {
    const hashedPassword = await bcrypt.hash(userDto.password, 3);

    const user = await userService.createUser({
      login: userDto.login,
      password: hashedPassword,
    });

    const token = jwtService.getToken(user._id);

    return { user, token };
  }

  async login(userDto: UserDto): Promise<BaseResponse> {
    const user = await userService.getUser(userDto.login);

    const isValidPassword = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Invalid password');
    }

    const token = jwtService.getToken(user._id);

    return { user, token };
  }
}

export default new AuthService();
