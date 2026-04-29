export type CurrentUser = {
  id: string;
  email?: string;
  role?: string;
  lastSignInAt?: string;
  emailConfirmed?: boolean;
};

export type AuthFormState =
  | {
      error?: string;
      message?: string;
      fieldErrors?: { email?: string[]; password?: string[] };
    }
  | undefined;

export type AuthAction = (
  state: AuthFormState,
  formData: FormData,
) => Promise<AuthFormState>;
