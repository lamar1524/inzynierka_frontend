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
    path: '/home/posts'
  }
};
