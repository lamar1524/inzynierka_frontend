export interface IRoutes {
  login: IRoute;
  register: IRoute;
}

export interface IRoute {
  name: string;
  path: string;
}
