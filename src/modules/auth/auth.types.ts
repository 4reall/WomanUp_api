import { IUser } from '../user/user.model';

export interface BaseResponse {
  user: IUser;
  token: string;
}
