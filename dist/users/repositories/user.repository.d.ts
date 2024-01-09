import { Repository } from "typeorm";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { User } from "../entities/user.entity";
import { IChangePasswordInput, IRegisterInput, ISaveNewEmailInput } from "../services/inputs";
import { IMarkEmailAsVerifiedInput, IUpdateProfileInput } from "./inputs";
export declare class UserRepository extends TypeOrmRepository<User> {
    constructor(repository: Repository<User>);
    register(input: IRegisterInput): Promise<IRegisterInput & User>;
    findBySimilarUsername(username: string): Promise<User>;
    findByExactUsername(username: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByIds(userIds: number[]): Promise<User[]>;
    searchUsernames(query: string): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    markEmailAsVerified(input: IMarkEmailAsVerifiedInput): Promise<import("typeorm").UpdateResult>;
    saveNewEmail(input: ISaveNewEmailInput): Promise<import("typeorm").UpdateResult>;
    changePassword(input: IChangePasswordInput): Promise<import("typeorm").UpdateResult>;
    updateProfile(input: IUpdateProfileInput): Promise<import("typeorm").UpdateResult>;
    updateUserIp(id: number, ip: string): Promise<import("typeorm").UpdateResult>;
}
//# sourceMappingURL=user.repository.d.ts.map