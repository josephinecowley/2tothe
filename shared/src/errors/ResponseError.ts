import { ErrorCode } from "../errors/ErrorCode";

export interface IResponseError {
  status: number;
  errorCode: ErrorCode;
  message?: string;
}

export class ResponseError extends Error implements IResponseError {
  constructor(public status: number, public errorCode: ErrorCode, public message: string) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }
}
