import { ApplicationErrorCode } from "./error-codes";

class GenericApplicationError<T> extends Error {
  constructor(readonly statusCode: ApplicationErrorCode, readonly data: T) {
    super();
  }
}

class ApplicationError extends GenericApplicationError<null> {
  constructor(statusCode: ApplicationErrorCode) {
    super(statusCode, null);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor() {
    super(ApplicationErrorCode.UNAUTHORIZED);

    this.message = "Unauthorized";
  }
}
