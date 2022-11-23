import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * @class TodoDto
 * @category Todo
 * @subcategory DTOs
 */
export class TodoDto {
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  readonly description: string;

  @IsMongoId()
  readonly userId: string;

  constructor(title: string, description: string, userId: string, _id: string) {
    /**
     * @readonly
     * @property {string} title
     */
    this.title = title;
    /**
     * @readonly
     * @property {string} [description]
     */
    this.description = description;
    /**
     * @readonly
     * @property {string} userId MongoId
     */
    this.userId = userId;
    /**
     * @readonly
     * @property {string} _id MongoId of todo
     */
    this._id = _id;
  }
}
