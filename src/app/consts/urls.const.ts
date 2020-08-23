import { IUrls } from '../interfaces';

// const host = 'http://lamar1524.pythonanywhere.com/';
const host = 'http://localhost:8000/';

export const URLS: IUrls = {
  host,
  login: host + 'login/',
  register: host + 'users/register/',
  loadProfile: host + 'users/get/',
  editProfile: host + 'users/update/',
  currentUser: host + 'users/current_user/',
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
  usersGroups: host + 'groups/list/',
  friendsList: host + 'groups/friends_list/',
  loadGroupMembers: host + 'groups/members/',
  groupUpdate: host + 'groups/update/',
  dropMember: host + 'groups/drop/',
  loadPendingMembers: host + 'groups/pending_list/',
  managePending: host + 'groups/manage-pending/',
  deleteGroup: host + 'groups/delete/',
  leaveGroup: host + 'groups/leave/',
  searchForGroups: host + 'groups/search',
  joinGroup: host + 'groups/join/',
  groupCreate: host + 'groups/create/',
  getThreadsList: host + 'chat/threads_list/',
  getMessagesList: host + 'chat/messages/',
};
