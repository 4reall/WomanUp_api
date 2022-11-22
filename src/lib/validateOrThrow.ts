import { validate, ValidatorOptions } from 'class-validator';
import { ApiError } from '../exceptions/api.error';

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
