export interface User {
  id?: string;
  firstName?: string;
  lastName: string;
  dateOfBirth: string;
}

export interface GetUsersResponse {
  users: User[];
}
