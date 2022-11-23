import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * @class UserDto
 * @category User
 * @subcategory DTOs
 */
export class UserDto {
  @MaxLength(50)
  @IsEmail()
  readonly login: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  readonly password: string;

  constructor(password: string, login: string) {
    /**
     * @readonly
     * @property {string} login User e-mail
     */
    this.login = login;
    /**
     * @readonly
     * @property {string} password User password
     * @description Must be less than 20 and more than 4 characters
     */
    this.password = password;
  }
}
