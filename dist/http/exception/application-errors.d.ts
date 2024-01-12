import { ApplicationErrorCode } from "./error-codes";
declare class GenericApplicationError<T> extends Error {
    readonly statusCode: ApplicationErrorCode;
    readonly data: T;
    constructor(statusCode: ApplicationErrorCode, data: T);
}
declare class ApplicationError extends GenericApplicationError<null> {
    constructor(statusCode: ApplicationErrorCode);
}
export declare class UnauthorizedError extends ApplicationError {
    constructor();
}
export {};
//# sourceMappingURL=application-errors.d.ts.map