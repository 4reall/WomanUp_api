import { IUser } from '../user/user.model';

/**
 * @interface
 * @property {IUser} user
 * @property {token} string JWT
 */
export interface BaseResponse {
  user: IUser;
  token: string;
}
