import { Observable } from 'rxjs';
import {
  IGetUserById,
  IGetUsersByIds,
  ILoginUser,
  IRegisterUser,
  IUpdateUser,
  IUser, IUsersByIds
} from "@smart-home/libs/types/users/user";

export interface GrpcUserService {
  registerUser(params: IRegisterUser): Observable<IUser>;
  loginUser(params: ILoginUser): Observable<IUser>;
  getUserById(params: IGetUserById): Observable<IUser>;
  updateUser(params: IUpdateUser): Observable<IUser>;
  getUsersByIds(params: IGetUsersByIds): Observable<IUsersByIds>;
}
