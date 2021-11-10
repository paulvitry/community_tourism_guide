import React, { createContext, useContext, useState } from 'react';
import {
  defaultLikeValue,
  ILike,
  ILikeContext,
  TLikeFC,
  TGetUserLikesFC,
  TUnlikeFC,
  ICreateLike,
  TIsLikedFC,
} from '../Interfaces/ILikeContext';

import firebase from '../Database/firebase';
import { AuthenticationContext } from './AuthenticationContext';

export const LikeContext = createContext<ILikeContext>(defaultLikeValue);

export const LikeProvider: React.FC = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [userLikes, setUserLikes] = useState<Array<ILike>>();

  const setLike = (data: firebase.firestore.DocumentData, id: string) => {
    const like: ILike = {
      id: id,
      postId: data.postId,
      userId: data.userId,
      postType: data.postType,
    };
    return like;
  };

  const getUserLikes: TGetUserLikesFC = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('Likes')
      .where('userId', '==', user?.id)
      .get();

    const tmpLikes = snapshot.docs.map(doc => {
      return setLike(doc.data(), doc.id);
    });
    setUserLikes(tmpLikes);
    return tmpLikes;
  };

  const like: TLikeFC = async (payload: ICreateLike) => {
    console.log('like');
    const collection = firebase.firestore().collection('Likes');
    const snapshot = await collection
      .where('userId', '==', user?.id)
      .where('postId', '==', payload.postId)
      .get();
    if (snapshot.docs.length !== 0) {
      return snapshot.docs.length;
    }
    const tmpLike = await collection
      .doc()
      .set({
        postId: payload.postId,
        userId: user?.id,
        postType: payload.postType,
      })
      .catch(e => {
        console.log(e);
      });

    (async () => {
      setUserLikes(undefined);
      setUserLikes(await getUserLikes());
    })();
    return tmpLike;
  };

  const unlike: TUnlikeFC = async (payload: string) => {
    console.log(' unlike');
    const snapshot = await firebase
      .firestore()
      .collection('Likes')
      .where('userId', '==', user?.id)
      .where('postId', '==', payload)
      .get();

    const likeId = snapshot.docs.map(doc => {
      return doc.id;
    });
    console.log(likeId);
    const res = await firebase
      .firestore()
      .collection('Likes')
      .doc(likeId[0])
      .delete();
    (async () => {
      setUserLikes(undefined);
      setUserLikes(await getUserLikes());
    })();
    return res;
  };

  const isLiked: TIsLikedFC = async (payload: string) => {
    console.log('------------------_> isLiked');
    const tmpLike = (
      await firebase
        .firestore()
        .collection('Likes')
        .where('userId', '==', user?.id!)
        .where('postId', '==', payload!)
        .get()
    ).docs.map(doc => {
      return doc.data;
    });
    console.log('--------------_> snapshot  : ');
    console.log(tmpLike);
    if (tmpLike.length > 0) {
      console.log('item is like');
      return true;
    }
    console.log('item IS NOT like');
    return false;
  };

  return (
    <LikeContext.Provider
      value={{
        userLikes,

        like,
        unlike,
        isLiked,
        getUserLikes,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
