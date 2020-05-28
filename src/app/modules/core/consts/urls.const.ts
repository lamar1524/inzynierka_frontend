import { IUrls } from '../interfaces';

const host = 'http://localhost:8000/';

export const URLS: IUrls = {
  host,
  login: host + 'login/',
  register: host + 'users/register/',
  currentUser: host + 'users/current_user/',
  usersGroups: host + 'groups/list/',
};
