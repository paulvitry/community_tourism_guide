export interface IImageContext {
  takePicture: TTakePictureFC;
  uploadPicture: TUploadPictureFC;
  getImage: TGetImageFC;
  updateProfilePicture: TUpdateProfilePictureFC;
}

export interface IPhoto {
  path: string,
  url: string,
}

export type TTakePictureFC = () => Promise<any>;
export type TUploadPictureFC = () => Promise<any>;
export type TGetImageFC = (payload: IPhoto) => Promise<any>;
export type TUpdateProfilePictureFC = (payload: IPhoto) => Promise<any>;

export const defaultImageValue: IImageContext = {
  takePicture: () => Promise.reject(null),
  uploadPicture: () => Promise.reject(null),
  getImage: () => Promise.reject(null),
  updateProfilePicture: () => Promise.reject(null),
};
