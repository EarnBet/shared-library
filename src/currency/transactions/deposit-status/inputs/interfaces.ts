export interface IGetSumOfDepositsForUserInput {
  user_id: number;
  timeLimitInHours?: number;
}

export interface ISelectForUserInput {
  user_id: number;
  limit?: number;
}
