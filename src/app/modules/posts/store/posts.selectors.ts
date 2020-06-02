import { createSelector } from '@ngrx/store';

import { PostsModuleState, PostsState } from './posts.reducer';

export const postsSelect = (state: PostsModuleState) => state.posts;

export const selectAllPostsLoading = createSelector(postsSelect, (state: PostsState) => state.allPostsLoading);
export const selectAllPosts = createSelector(postsSelect, (state: PostsState) => state.allPosts);

export const selectEditingPost = createSelector(postsSelect, (state: PostsState) => state.postEditing);
export const selectDeletingPost = createSelector(postsSelect, (state: PostsState) => state.postDeleting);

export const selectSinglePostLoading = createSelector(postsSelect, (state: PostsState) => state.singlePostLoading);
export const selectSinglePost = createSelector(postsSelect, (state: PostsState) => state.singlePost);

export const selectCommentsLoading = createSelector(postsSelect, (state: PostsState) => state.commentsLoading);
export const selectComments = createSelector(postsSelect, (state: PostsState) => state.comments);

export const selectCommentEditing = createSelector(postsSelect, (state: PostsState) => state.commentEditing);

export const selectCommentDeleting = createSelector(postsSelect, (state: PostsState) => state.commentDeleting);
export const selectCommentAdding = createSelector(postsSelect, (state: PostsState) => state.commentAdding);
