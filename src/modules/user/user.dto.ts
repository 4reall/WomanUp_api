import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDto {
  @MaxLength(50)
  @IsEmail()
  readonly login: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  readonly password: string;

  constructor(password: string, login: string) {
    this.login = login;
    this.password = password;
  }
}
