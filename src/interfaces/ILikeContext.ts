export interface ILikeContext {
  userLikes: Array<ILike> | undefined;

  like: TLikeFC;
  unlike: TUnlikeFC;
  isLiked: TIsLikedFC;
  getUserLikes: TGetUserLikesFC;
}

export interface ILike {
  id: string;
  postId: string;
  userId: string;
  postType: 'place' | 'list';
}

export interface ICreateLike {
  postId: string,
  postType: 'place' | 'list';
}


export type TLikeFC = (payload: ICreateLike) => Promise<any>;
export type TUnlikeFC = (payload: string) => Promise<any>;
export type TIsLikedFC = (payload: string) => Promise<any>;
export type TGetUserLikesFC = () => Promise<any>;


export const defaultLikeValue: ILikeContext = {
  userLikes: undefined,

  like: () => Promise.reject(null),
  unlike: () => Promise.reject(null),
  isLiked: () => Promise.reject(null),
  getUserLikes: () => Promise.reject(null),
};
