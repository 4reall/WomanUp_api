import { IsIn, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * @class GetTodosDto
 * @category Todo
 * @subcategory DTOs
 */
export class GetTodosDto {
  @IsOptional()
  @IsIn(['title', 'description'])
  readonly sortBy: string;

  @IsOptional()
  @IsNumber()
  @IsIn([1, -1])
  @Type(() => Number)
  readonly order: 1 | -1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly limit: number;

  @IsMongoId()
  readonly userId: string;

  constructor(
    sortBy: string,
    orderBy: 1 | -1,
    page: number,
    limit: number,
    userId: string
  ) {
    /**
     * determines which filed to sort
     * @readonly
     * @property {string} [sortBy] title | description
     */
    this.sortBy = sortBy;
    /**
     * determines sort order
     * @readonly
     * @property {string} [order] 1 | -1
     */
    this.order = orderBy;
    /**
     * @readonly
     * @property {number} [page]
     * @default 1
     */
    this.page = page;
    /**
     * @readonly
     * @property {number} [limit]
     */
    this.limit = limit;
    /**
     * @readonly
     * @property {string} userId MongoId
     */
    this.userId = userId;
  }
}
