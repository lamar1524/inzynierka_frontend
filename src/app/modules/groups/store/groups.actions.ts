import { createAction, props, Action } from '@ngrx/store';

import { IGroup, IResponseGroups, IResponsePosts } from '@core/interfaces';

export const loadPrivateGroups = createAction('[Groups] Load private groups', props<{ url: string | null }>());
export const loadPrivateGroupsSuccess = createAction('[Groups] Load private groups success', props<{ groups: IResponseGroups }>());
export const loadPrivateGroupsFail = createAction('[Groups] Load private groups fail');

export const loadGroup = createAction('[Groups] Load group', props<{ id: number }>());
export const loadGroupSuccess = createAction('[Groups] Load group success', props<{ group: IGroup }>());
export const loadGroupFail = createAction('[Groups] Load group fail');

export const loadGroupsPosts = createAction('[Groups] Load groups posts', props<{ url: string | null; id: number }>());
export const loadGroupsPostsSuccess = createAction('[Groups] Load groups posts success', props<{ posts: IResponsePosts }>());
export const loadGroupsPostsFail = createAction('[Groups] Load groups posts fail');

export const addPost = createAction('[Groups] Add post', props<{ post: FormData; groupId: number; refreshAction: Action }>());
export const addPostSuccess = createAction('[Groups] Add post success');
export const addPostFail = createAction('[Groups] Add post fail');

export const showAddingPostForm = createAction('[Groups] Show adding post form');
export const hideAddingPostForm = createAction('[Groups] Hide adding post form');
