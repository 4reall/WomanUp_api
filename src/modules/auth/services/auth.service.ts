import bcrypt from 'bcrypt';
import { UserDto } from '../../user/user.dto';
import { UserService } from '../../user/user.service';
import { ApiError } from '../../../exceptions/api.error';
import { JwtService } from './jwt.service';
import { BaseResponse } from '../auth.types';

class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async registration(userDto: UserDto): Promise<BaseResponse> {
    const hashedPassword = await bcrypt.hash(userDto.password, 3);

    const user = await this.userService.createUser({
      login: userDto.login,
      password: hashedPassword,
    });

    const token = this.jwtService.getToken(user._id);

    return { user, token };
  }

  async login(userDto: UserDto): Promise<BaseResponse> {
    const user = await this.userService.getUser(userDto);

    const isValidPassword = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Invalid password');
    }

    const token = this.jwtService.getToken(user._id);

    return { user, token };
  }

  async logout(userId: string) {
    await this.userService.removeUser(userId);
  }
}

export default new AuthService(UserService.getInstance(), new JwtService());
