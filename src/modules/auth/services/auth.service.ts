import bcrypt from 'bcrypt';
import { UserDto } from '../../user/user.dto';
import userService from '../../user/user.service';
import { ApiError } from '../../../exceptions/api.error';
import jwtService from './jwt.service';
import { BaseResponse } from '../auth.types';
import { EnvConfig } from '../../../envConfig';

/**
 * @class
 * @category Auth
 * @subcategory Services
 */
class AuthService {
  /**
   * Function hashes a user password, creates a user and generate a jwt
   * @async
   * @method
   * @param {UserDto} userDto
   * @return {Promise<BaseResponse>}
   */
  async registration(userDto: UserDto): Promise<BaseResponse> {
    const hashedPassword = await bcrypt.hash(userDto.password, 3);

    const user = await userService.createUser({
      login: userDto.login,
      password: hashedPassword,
    });

    const token = jwtService.getToken(user._id, EnvConfig.SECRET_KEY);

    return { user, token };
  }

  /**
   * Function gets user from userService, compares passwords
   * and throw if passwords are not equal
   * @async
   * @method
   * @param {UserDto} userDto
   * @return {Promise<BaseResponse>}
   */
  async login(userDto: UserDto): Promise<BaseResponse> {
    const user = await userService.getUser(userDto.login);

    const isValidPassword = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Invalid password');
    }

    const token = jwtService.getToken(user._id, EnvConfig.SECRET_KEY);

    return { user, token };
  }
}

export default new AuthService();
