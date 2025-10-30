export interface Roles {
  student?: boolean;
  faculty?: boolean;
  team?: boolean;
}

export interface User {
  uid: string;
  roles: Roles;
}
