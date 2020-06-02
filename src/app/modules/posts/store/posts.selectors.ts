import { createSelector } from '@ngrx/store';

import { PostModuleState, PostState } from './posts.reducer';

export const postsSelect = (state: PostModuleState) => state.posts;

export const selectAllPostsLoading = createSelector(postsSelect, (state: PostState) => state.allPostsLoading);
export const selectAllPosts = createSelector(postsSelect, (state: PostState) => state.allPosts);

export const selectEditingPost = createSelector(postsSelect, (state: PostState) => state.postEditing);
export const selectDeletingPost = createSelector(postsSelect, (state: PostState) => state.postDeleting);

export const selectSinglePostLoading = createSelector(postsSelect, (state: PostState) => state.singlePostLoading);
export const selectSinglePost = createSelector(postsSelect, (state: PostState) => state.singlePost);

export const selectCommentsLoading = createSelector(postsSelect, (state: PostState) => state.commentsLoading);
export const selectComments = createSelector(postsSelect, (state: PostState) => state.comments);

export const selectCommentEditing = createSelector(postsSelect, (state: PostState) => state.commentEditing);

export const selectCommentDeleting = createSelector(postsSelect, (state: PostState) => state.commentDeleting);
export const selectCommentAdding = createSelector(postsSelect, (state: PostState) => state.commentAdding);