
export interface IImageContext {
  takePicture: TTakePictureFC;
  uploadPicture: TUploadPictureFC;
}

export type TTakePictureFC = () => Promise<any>;
export type TUploadPictureFC = () => Promise<any>;

export const defaultImageValue: IImageContext = {

  takePicture: () => Promise.reject(null),
  uploadPicture: () => Promise.reject(null),
};
