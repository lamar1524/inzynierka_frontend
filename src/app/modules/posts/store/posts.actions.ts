import { createAction, props, Action } from '@ngrx/store';

import { IComment, IPost, IResponseComments, IResponsePosts } from '../../../interfaces';

export const loadAllPosts = createAction('[Posts] Load posts', props<{ url: string | null }>());
export const loadAllPostsSuccess = createAction('[Posts] Load posts success', props<{ posts: IResponsePosts }>());
export const loadAllPostsFail = createAction('[Posts] Load posts fail');

export const loadPost = createAction('[Posts] Load post', props<{ id: number }>());
export const loadPostSuccess = createAction('[Posts] Load post success', props<{ post: IPost }>());
export const loadPostFail = createAction('[Posts] Load post fail');

export const loadComments = createAction('[Posts] Load comments', props<{ url: string | null; id: number }>());
export const loadCommentsSuccess = createAction('[Posts] Load comments success', props<{ comments: IResponseComments }>());
export const loadCommentsFail = createAction('[Posts] Load comments fail');

export const editComment = createAction('[Posts] Edit comment', props<{ comment: IComment; id: number; refreshAction: Action }>());
export const editCommentSuccess = createAction('[Posts] Edit comment success');
export const editCommentFail = createAction('[Posts] Edit comment fail');

export const deleteComment = createAction('[Posts] Delete comment', props<{ id: number; refreshAction: Action }>());
export const deleteCommentSuccess = createAction('[Posts] Delete comment success');
export const deleteCommentFail = createAction('[Posts] Delete comment fail');

export const addComment = createAction('[Posts] Add comment', props<{ comment: IComment; postId: number; refreshAction: Action }>());
export const addCommentSuccess = createAction('[Posts] Add comment success');
export const addCommentFail = createAction('[Posts] Add comment fail');
