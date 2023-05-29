export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  familyId?: string;
  accessToken: string;
  refreshToken: string;
}
