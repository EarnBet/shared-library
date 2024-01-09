export interface ILoginUserInput {
  username: string;
  password: string;
}

export interface ILoginInput {
  username: string;
  password: string;
  ip: string;
}

export interface IRegisterInput {
  username: string;
  email?: string;
  password: string;
  date_of_birth: string;
  ip: string;
  referral_code: string;
}

export interface IChangePasswordInput {
  user_id: number;
  password: string;
  ip: string;
}

export interface ISaveNewEmailInput {
  user_id: number;
  new_email: string;
  ip: string;
}
