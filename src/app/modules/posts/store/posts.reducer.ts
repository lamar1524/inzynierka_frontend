import { createReducer, on, Action } from '@ngrx/store';

import { IPost, IResponseComments, IResponsePosts } from '../../../interfaces';
import * as postsActions from '../store/posts.actions';

export interface PostsModuleState {
  posts: PostsState;
}

export interface PostsState {
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
  commentAdding: boolean;
}

export const initialState: PostsState = {
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
  commentAdding: false,
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

  on(postsActions.loadPost, (state) => ({ ...state, singlePostLoading: true })),
  on(postsActions.loadPostSuccess, (state, { post }) => ({ ...state, singlePostLoading: false, singlePost: post })),
  on(postsActions.loadPostFail, (state) => ({ ...state, singlePostLoading: false })),

  on(postsActions.loadComments, (state, { url }) => ({ ...state, commentsLoading: true, comments: url ? state.comments : null })),
  on(postsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    commentsLoading: false,
    comments: comments.previous ? { next: comments.next, comments: [...state.comments.comments, ...comments.comments] } : comments,
  })),
  on(postsActions.loadCommentsFail, (state) => ({ ...state, commentsLoading: false })),

  on(postsActions.editComment, (state) => ({ ...state, commentEditing: true })),
  on(postsActions.editCommentSuccess, (state) => ({ ...state, commentEditing: false })),
  on(postsActions.editCommentFail, (state) => ({ ...state, commentEditing: false })),

  on(postsActions.deleteComment, (state) => ({ ...state, commentDeleting: true })),
  on(postsActions.deleteCommentSuccess, (state) => ({ ...state, commentDeleting: false })),
  on(postsActions.deleteCommentFail, (state) => ({ ...state, commentDeleting: false })),

  on(postsActions.addComment, (state) => ({ ...state, commentAdding: true })),
  on(postsActions.addCommentSuccess, (state) => ({ ...state, commentAdding: false })),
  on(postsActions.addCommentFail, (state) => ({ ...state, commentAdding: false })),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return POSTS_REDUCER(state, action);
}
