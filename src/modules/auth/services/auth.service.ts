import bcrypt from 'bcrypt';
import { UserDto } from '../../user/user.dto';
import { UserService } from '../../user/user.service';
import { ApiError } from '../../../exceptions/api.error';
import { JwtService } from './jwt.service';
import { BaseResponse } from '../auth.types';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';

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

    const payload = new JwtPayloadDto(user._id);

    const token = this.jwtService.getToken(payload);

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

    const payload = new JwtPayloadDto(user._id);

    const token = this.jwtService.getToken(payload);

    return { user, token };
  }

  async logout(userId: string) {
    await this.userService.removeUser(userId);
  }
}

export default new AuthService(UserService.getInstance(), new JwtService());
