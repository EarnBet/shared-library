import { IAuthenticatedUser } from "../../auth/util/interfaces";
export declare class User implements IAuthenticatedUser {
    id: number;
    username: string;
    password: string;
    ip: string;
    date_of_birth: string;
    created_at: Date;
    email?: string;
    email_verified_at: string;
    gender: string;
    country: string;
    updated_at: Date;
}
//# sourceMappingURL=user.entity.d.ts.map