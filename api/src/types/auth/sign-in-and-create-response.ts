export type SignInAndCreateResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};
