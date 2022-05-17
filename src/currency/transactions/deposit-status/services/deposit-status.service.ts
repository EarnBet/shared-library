import { Injectable } from "@nestjs/common";
import {
  INewDepositStatusRow,
  ISavedDepositStatusRow,
} from "../entities/interfaces";
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

  getSavedDeposit(
    depositTransactionId: number
  ): Promise<ISavedDepositStatusRow> {
    return this.repository.findOneById(depositTransactionId);
  }
}
