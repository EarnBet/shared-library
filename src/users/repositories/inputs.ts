export interface IUpdateProfileInput {
  user_id: number;

  gender: string;
  country: string;
  ip: string;
}

export interface IMarkEmailAsVerifiedInput {
  user_id: number;
  ip: string;
}
