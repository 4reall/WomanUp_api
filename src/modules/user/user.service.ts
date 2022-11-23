import { IUser, User } from './user.model';
import { UserDto } from './user.dto';
import { ApiError } from '../../exceptions/api.error';

/**
 * @class UserService
 * @category User
 * @subcategory Services
 */
class UserService {
  /**
   * Create a new user and throw an error if user already exists
   * @async
   * @method
   * @param {UserDto} userDto
   * @return {Promise<IUser>}
   */
  async createUser(userDto: UserDto): Promise<IUser> {
    const user = await User.findOne({ login: userDto.login });

    if (user) {
      throw ApiError.BadRequest('User already exists');
    }

    return User.create(userDto);
  }

  /**
   * Function returns a user by his email
   * Throw an error if there is no user with this email
   * @async
   * @method
   * @param {string} userLogin
   * @return {Promise<IUser>}
   */
  async getUser(userLogin: string): Promise<IUser> {
    const user = await User.findOne({ login: userLogin });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    return user;
  }
}

export default new UserService();
