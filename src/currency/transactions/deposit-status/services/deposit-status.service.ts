import { Injectable } from "@nestjs/common";

import { DepositStatus } from "../entities/deposit-status.entity";
import { INewDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";

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
}
