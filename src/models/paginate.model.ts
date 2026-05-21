import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { unknownToNumber } from '@app/transformers/value.transformer';

export class PaginateBaseOptionDTO {
  @IsOptional()
  @Min(1)
  @IsInt()
  @Transform(({ value }) => unknownToNumber(value || 1))
  page = 1;

  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  @Transform(({ value }) => unknownToNumber(value || 10))
  perPage = 10;
}
