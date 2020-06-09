import { IUrls } from '../interfaces';

const host = 'http://localhost:8000/';

export const URLS: IUrls = {
  host,
  login: host + 'login/',
  register: host + 'users/register/',
  currentUser: host + 'users/current_user/',
  usersGroups: host + 'groups/list/',
  friendsList: host + 'groups/friends_list/',
  allPosts: host + 'posts/user_posts_list/',
  postEdit: host + 'posts/update/',
  postDelete: host + 'posts/delete/',
  postGet: host + 'posts/post/',
  commentsGet: host + 'posts/comments/',
  commentEdit: host + 'posts/update/comment/',
  commentDelete: host + 'posts/delete/comment/',
  commentAdd: host + 'posts/create/comment/',
  groupLoad: host + 'groups/',
  groupsPosts: host + 'posts/',
  addPost: host + 'posts/create/',
  loadGroupMembers: host + 'groups/members/',
  groupUpdate: host + 'groups/update/',
  dropMember: host + 'groups/drop/',
  loadPendingMembers: host + 'groups/pending_list/',
  managePending: host + 'groups/manage-pending/',
  deleteGroup: host + 'groups/delete/',
  leaveGroup: host + 'groups/leave/',
  searchForGroups: host + 'groups/search',
  joinGroup: host + 'groups/join/',
  loadProfile: host + 'users/get/',
};
