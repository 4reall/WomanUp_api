import { IUser } from '../user/user.model';

/**
 * @interface
 * @Category Auth
 * @Subcategory Interface
 * @property {IUser} user
 * @property {token} string JWT
 */
export interface BaseResponse {
  user: IUser;
  token: string;
}
