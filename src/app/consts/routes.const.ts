import { IRoutes } from '../interfaces';

export const ROUTES: IRoutes = {
  login: {
    name: 'login',
    path: '/login',
  },
  register: {
    name: 'register',
    path: '/register',
  },
  home: {
    name: 'home',
    path: '/home',
  },
  posts: {
    name: 'posts',
    path: '/home/posts',
  },
  allPosts: {
    name: '',
    path: '/home/posts',
  },
  singlePost: {
    name: '',
    path: '/home/posts/',
  },
  groupsModule: {
    name: 'groups',
    path: '/home/groups/',
  },
  privateGroups: {
    name: '',
    path: '/home/groups/',
  },
  singleGroup: {
    name: 'group',
    path: '/home/groups/group/',
  },
  error403: {
    name: '403',
    path: '/403',
  },
  search: {
    name: 'search',
    path: '/home/groups/search/',
  },
  profile: {
    name: 'profile',
    path: '/home/profile/',
  },
  chatModule: {
    name: 'chat',
    path: '/home/chat/',
  },
  singleChat: {
    name: '',
    path: '/home/chat/',
  },
  adminModule: {
    name: 'admin',
    path: '/home/admin',
  },
  usersList: {
    name: 'users',
    path: '/home/admin/users',
  },
};
