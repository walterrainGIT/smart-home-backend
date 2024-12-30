import { Observable } from 'rxjs';
import {ILoginUser, IRegisterUser, IUser} from "@smart-home/libs/types/users/user";

export interface GrpcUserService {
  registerUser(params: IRegisterUser): Observable<IUser>;
  loginUser(params: ILoginUser): Observable<IUser>;
}
