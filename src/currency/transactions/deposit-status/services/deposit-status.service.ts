import { Injectable } from "@nestjs/common";

import { DepositStatus } from "../entities/deposit-status.entity";
import { INewDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";
import { IGetSumOfDepositsForUserInput } from "../inputs/interfaces";

@Injectable()
export class DepositStatusService {
  constructor(private repository: DepositStatusRepository) {}

  addNewDeposit(data: INewDepositStatusRow): Promise<number> {
    return this.repository.insertOne(data);
  }
  markDepositAsConfirmed(depositTransactionId: number) {
    return this.repository.markDepositAsConfirmed(depositTransactionId);
  }
  markDepositAsCredited(depositTransactionId: number) {
    return this.repository.markDepositAsCredited(depositTransactionId);
  }

  getSavedDeposit(depositTransactionId: number): Promise<DepositStatus> {
    return this.repository.findOneById(depositTransactionId);
  }

  getAllPendingDeposits() {
    return this.repository.getAllPendingDeposits();
  }

  getAllConfirmedUncreditedDeposits() {
    return this.repository.getAllConfirmedUncreditedDeposits();
  }

  getGrandTotalDepositsForUser(user_id: number) {
    return this.repository.getGrandTotalDepositsForUser(user_id);
  }

  getTotalDepositsForUserInThePastDay(user_id: number) {
    return this.repository.getTotalDepositsForUserInThePastDay(user_id);
  }

  getSumOfDepositsForUser(input: IGetSumOfDepositsForUserInput) {
    return this.repository.getSumOfDepositsForUser(input);
  }

  getSumOfDepositsForUsers(user_ids: number[], timeLimitInHours = 24) {
    return this.repository.getSumOfDepositsForUsers(user_ids, timeLimitInHours);
  }
}
