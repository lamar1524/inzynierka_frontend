import { createAction, props, Action } from '@ngrx/store';

import { IPost, IResponseComments, IResponsePosts } from '@core/interfaces';

export const loadAllPosts = createAction('[Posts] Load posts', props<{ url: string | null }>());
export const loadAllPostsSuccess = createAction('[Posts] Load posts success', props<{ posts: IResponsePosts }>());
export const loadAllPostsFail = createAction('[Posts] Load posts fail');

export const loadPost = createAction('[Posts] Load post', props<{ id: number }>());
export const loadPostSuccess = createAction('[Posts] Load post success', props<{ post: IPost }>());
export const loadPostFail = createAction('[Posts] Load post fail');

export const loadComments = createAction('[Posts] Load comments', props<{ id: number }>());
export const loadCommentsSuccess = createAction('[Posts] Load comments success', props<{ comments: IResponseComments }>());
export const loadCommentsFail = createAction('[Posts] Load comments fail');

export const editPost = createAction('[Posts] Edit post', props<{ post: FormData; id: number; refreshAction: Action }>());
export const editPostSuccess = createAction('[Posts] Edit post success');
export const editPostFail = createAction('[Posts] Edit post fail');

export const deletePost = createAction('[Posts] Delete post', props<{ id: number; refreshAction: Action }>());
export const deletePostSuccess = createAction('[Posts] Delete post success');
export const deletePostFail = createAction('[Posts] Delete post fail');
