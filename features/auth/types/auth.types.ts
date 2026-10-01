export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

/** State returned by the login Server Action to the form. */
export type LoginFormState = {
  error: string | null;
};