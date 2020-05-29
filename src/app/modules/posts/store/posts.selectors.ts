import { createSelector } from '@ngrx/store';
import { PostModuleState, PostState } from './posts.reducer';

export const postsSelect = (state: PostModuleState) => state.posts;

export const selectAllPostsLoading = createSelector(postsSelect, (state: PostState) => state.allPostsLoading);
export const selectAllPosts = createSelector(postsSelect, (state: PostState) => state.allPosts);

export const selectEditingPost = createSelector(postsSelect, (state: PostState) => state.postEditing);
