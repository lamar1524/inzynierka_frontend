import { createReducer, on, Action } from '@ngrx/store';

import { IResponsePosts } from '@core/interfaces';
import * as postsActions from '../store/posts.actions';

export interface PostModuleState {
  posts: PostState;
}

export interface PostState {
  allPostsLoading: boolean;
  allPosts: IResponsePosts;
  postEditing: boolean;
}

export const initialState: PostState = {
  allPostsLoading: false,
  allPosts: {
    next: null,
    previous: null,
    posts: null,
  },
  postEditing: false,
};

export const POSTS_REDUCER = createReducer(
  initialState,
  on(postsActions.loadAllPosts, (state) => ({ ...state, allPostsLoading: true })),
  on(postsActions.loadAllPostsSuccess, (state, { posts }) => ({
    ...state,
    allPostsLoading: false,
    allPosts: posts.previous ? { next: posts.next, posts: [...state.allPosts.posts, ...posts.posts] } : posts,
  })),
  on(postsActions.loadAllPostsFail, (state) => ({ ...state, allPostsLoading: false })),

  on(postsActions.editPost, (state) => ({ ...state, postEditing: true })),
  on(postsActions.editPostSuccess, (state) => ({ ...state, postEditing: false })),
  on(postsActions.editPostFail, (state) => ({ ...state, postEditing: false })),
);

export function postsReducer(state: PostState | undefined, action: Action) {
  return POSTS_REDUCER(state, action);
}
