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
};
