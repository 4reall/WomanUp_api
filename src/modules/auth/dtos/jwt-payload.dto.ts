import { IsMongoId } from 'class-validator';

export class JwtPayloadDto {
  @IsMongoId()
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
