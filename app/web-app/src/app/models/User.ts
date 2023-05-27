export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    dob: string;
    familyId: string;
    roles: Role[];
    role: UserRoleEnum;
  }
  
  export enum UserRoleEnum {
    // Define your user role options here
  }
  
  export interface Role {
    // Define your role properties here
  }
  