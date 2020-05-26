export interface IRoutes {
  login: IRoute;
  register: IRoute;
  home: IRoute;
  posts: IRoute;
  allPosts: IRoute;
}

export interface IRoute {
  name: string;
  path: string;
}
