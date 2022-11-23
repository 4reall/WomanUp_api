import { validate, ValidatorOptions } from 'class-validator';
import { ApiError } from '../exceptions/api.error';

/**
 * @module validateOrThrow
 * @category Global
 * @subcategory Helpers
 */
/**
 * @function
 * @memberOf module:validateOrThrow
 * @param {object} object
 * @param {ValidatorOptions} validatorOptions options of class-validator "validate" function
 * @param {string} message
 */
export const validateOrThrow = async (
  object: object,
  validatorOptions?: ValidatorOptions,
  message?: string
) => {
  const errors = await validate(object, validatorOptions);
  if (errors.length > 0) {
    throw ApiError.BadRequest(message, errors);
  }
};
