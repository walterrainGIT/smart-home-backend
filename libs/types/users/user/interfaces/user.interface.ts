import { UserRoleEnum } from '@smart-home/libs/types/users/user';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  username: string;
  passwordHash: string;
  role: UserRoleEnum;
  lastLogin: Date;
}
