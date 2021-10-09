import { IUser } from './IUser';

export interface IAuth {
  email: string,
  password: string
}

export interface IReset {
  email: string;
}


export interface IUserContext {
  user?: null | IUser;

  login: TLoginFC;
  logout: TLogoutFC;
  // autolog: TAutoLogFC;
  getUser: TGetUserFC;
  register: TRegisterFC;
  // takepicture: TTakePictureFC;
  // uploadpicture: TUploadPictureFC;
  // resetpassword: TResetPasswordFC;
}

export type TLogoutFC = () => Promise<any>;
// export type TAutoLogFC = () => Promise<any>;
export type TGetUserFC = () => Promise<any>;
// export type TTakePictureFC = () => Promise<any>;
// export type TUploadPictureFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TRegisterFC = (payload: IAuth) => Promise<any>;
// export type TResetPasswordFC = (payload: IReset) => Promise<any>;

export const defaultUserValue: IUserContext = {
  User: null,

  login: () => Promise.reject(null),
  logout: () => Promise.reject(null),
  // autolog: () => Promise.reject(null),
  getUser: () => Promise.reject(null),
  register: () => Promise.reject(null),
  // takepicture: () => Promise.reject(null),
  // uploadpicture: () => Promise.reject(null),
  // resetpassword: () => Promise.reject(null),
};
