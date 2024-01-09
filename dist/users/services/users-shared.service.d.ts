import { UserRepository } from "../repositories/user.repository";
import { UsernameBannedWordRepository } from "../repositories/username-banned-word.repository";
import { ILoginInput, ILoginUserInput } from "./inputs";
import { User } from "../entities/user.entity";
export declare class SharedUsersService {
    private users;
    private bannedWords;
    constructor(users: UserRepository, bannedWords: UsernameBannedWordRepository);
    login(input: ILoginInput): Promise<{
        id: number;
        username: string;
        email: string;
        token: string;
    }>;
    isUsernameTaken(username: string): Promise<boolean>;
    private findBySimilarUsername;
    private isEmailInUse;
    usernameContainsBannedWord(username: string): Promise<boolean>;
    isValidLogin(input: ILoginUserInput): Promise<{
        user: User;
        isPasswordValid: boolean;
    }>;
    isValidPassword(password: string, userId: number): Promise<{
        user: User;
        isPasswordValid: boolean;
    }>;
    private isValidPasswordForUser;
    findByExactUsername(username: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    isUserFound(userId: number): Promise<boolean>;
    isEmailVerified(userId: number): Promise<{
        isEmailVerified: boolean;
        user: User;
    }>;
    getUserById(userId: number): Promise<User>;
    getUsersByIds(userIds: number[]): Promise<User[]>;
    searchUsernames(query: string): Promise<User[]>;
}
//# sourceMappingURL=users-shared.service.d.ts.map