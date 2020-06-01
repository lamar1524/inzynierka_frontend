import { createReducer, on, Action } from '@ngrx/store';

import { IPost, IResponseComments, IResponsePosts } from '@core/interfaces';
import * as postsActions from '../store/posts.actions';

export interface PostModuleState {
  posts: PostState;
}

export interface PostState {
  allPostsLoading: boolean;
  allPosts: IResponsePosts;
  postEditing: boolean;
  postDeleting: boolean;
  singlePostLoading: boolean;
  singlePost: IPost;
  commentsLoading: boolean;
  comments: IResponseComments;
  commentEditing: boolean;
  commentDeleting: boolean;
}

export const initialState: PostState = {
  allPostsLoading: false,
  allPosts: {
    next: null,
    previous: null,
    posts: [],
  },
  postEditing: false,
  postDeleting: false,
  singlePostLoading: false,
  singlePost: null,
  commentsLoading: false,
  comments: {
    comments: [],
    previous: null,
    next: null,
  },
  commentEditing: false,
  commentDeleting: false,
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

  on(postsActions.deletePost, (state) => ({ ...state, postDeleting: true })),
  on(postsActions.deletePostSuccess, (state) => ({ ...state, postDeleting: false })),
  on(postsActions.deletePostFail, (state) => ({ ...state, postDeleting: false })),

  on(postsActions.loadPost, (state) => ({ ...state, singlePostLoading: true })),
  on(postsActions.loadPostSuccess, (state, { post }) => ({ ...state, singlePostLoading: false, singlePost: post })),
  on(postsActions.loadPostFail, (state) => ({ ...state, singlePostLoading: false })),

  on(postsActions.loadComments, (state) => ({ ...state, commentsLoading: true })),
  on(postsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    commentsLoading: false,
    comments: comments.previous ? { next: comments.next, comments: [...state.comments.comments, comments.comments] } : comments,
  })),
  on(postsActions.loadCommentsFail, (state) => ({ ...state, commentsLoading: false })),

  on(postsActions.editComment, (state) => ({ ...state, commentEditing: true })),
  on(postsActions.editCommentSuccess, (state) => ({ ...state, commentEditing: false })),
  on(postsActions.editCommentFail, (state) => ({ ...state, commentEditing: false })),

  on(postsActions.deleteComment, (state) => ({ ...state, commentDeleting: true })),
  on(postsActions.deleteCommentSuccess, (state) => ({ ...state, commentDeleting: false })),
  on(postsActions.deleteCommentFail, (state) => ({ ...state, commentDeleting: false })),
);

export function postsReducer(state: PostState | undefined, action: Action) {
  return POSTS_REDUCER(state, action);
}
