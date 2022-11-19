export class ApiError extends Error {
  public status;
  public errors;

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static UnauthorizedError(message: string, errors?: unknown[]) {
    return new ApiError(401, message, errors);
  }

  static BadRequest(message: string, errors?: unknown[]) {
    return new ApiError(400, message, errors);
  }
}
