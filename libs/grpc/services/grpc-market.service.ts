import { Observable } from 'rxjs';
import {IGetUserById, ILoginUser, IRegisterUser, IUser} from "@smart-home/libs/types/users/user";

export interface GrpcMarketService {
  registerUser(params: IRegisterUser): Observable<IUser>;
}
