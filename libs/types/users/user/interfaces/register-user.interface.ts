export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  username: string;
  passwordHash: string;
}
