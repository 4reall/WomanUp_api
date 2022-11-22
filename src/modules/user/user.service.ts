import { IUser, User } from './user.model';
import { UserDto } from './user.dto';
import { ApiError } from '../../exceptions/api.error';

class UserService {
  async createUser(userDto: UserDto): Promise<IUser> {
    const user = await User.findOne({ login: userDto.login });

    if (user) {
      throw ApiError.BadRequest('User already exists');
    }

    return User.create(userDto);
  }

  async getUser(userDto: UserDto): Promise<IUser> {
    const user = await User.findOne({ login: userDto.login });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    return user;
  }

  async removeUser(userId: string): Promise<void> {
    const user = await User.deleteOne({ _id: userId });

    if (user.deletedCount === 0) {
      throw ApiError.BadRequest('User not found');
    }
  }
}

export default new UserService();
