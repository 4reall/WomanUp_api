/**
 * @class ApiError
 * @category Global
 * @subcategory Errors
 */
export class ApiError extends Error {
  public status;
  public errors;

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  /**
   * Constructor for unauthorized error
   * @static
   * @param {string} [message='Unauthorized Error']
   * @param {unknown[]} [errors]
   * @constructors
   */
  static UnauthorizedError(
    message: string = 'Unauthorized Error',
    errors?: unknown[]
  ) {
    return new ApiError(401, message, errors);
  }

  /**
   * Constructor for bad request error
   * @static
   * @param {string} [message='Bad Request']
   * @param {unknown[]} [errors]
   * @constructors
   */
  static BadRequest(message: string = 'Bad Request', errors?: unknown[]) {
    return new ApiError(400, message, errors);
  }
}
