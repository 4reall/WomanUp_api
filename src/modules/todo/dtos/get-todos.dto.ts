import { IsIn, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTodosDto {
  @IsOptional()
  @IsIn(['title', 'description'])
  readonly sortBy: string;

  @IsOptional()
  @IsNumber()
  @IsIn([1, -1])
  @Type(() => Number)
  readonly orderBy: 1 | -1;

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
    this.sortBy = sortBy;
    this.orderBy = orderBy;
    this.page = page;
    this.limit = limit;
    this.userId = userId;
  }
}
