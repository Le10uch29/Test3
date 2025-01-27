export interface User {
  id: number;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  email: string;
  avatar: string;
}

export interface AddProfile extends User {
  birthDate?: string;
  gender?: string;
  role?: string;
}
