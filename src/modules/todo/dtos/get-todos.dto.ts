import { IsIn, IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';
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
  @Min(1)
  @Type(() => Number)
  readonly page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
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
     * Determines sort order. 1 for ascending and -1 for descending order
     * @readonly
     * @property {string} [order] 1 | -1
     */
    this.order = orderBy;
    /**
     * Minimal 1
     * @readonly
     * @property {number} [page]
     * @default 1
     */
    this.page = page;
    /**
     * Minimal 0
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
