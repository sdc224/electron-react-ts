import { MetaAction } from '../ActionHelper';

export interface IPostState {
  readonly data: IPostRaw[];
  readonly loading: boolean;
  readonly errors: [];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;
export interface IPostRaw extends ApiResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}
export const PostActionTypes = {
  FETCH_POSTS: '@@post/FETCH_POSTS',
  FETCH_POSTS_SUCCESS: '@@post/FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR: '@@post/FETCH_POSTS_ERROR'
};

export interface IDispatchToProps {
  fetchPosts: () => MetaAction;
}
