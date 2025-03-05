import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchProductDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsArray()
  attrs?: string[];

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageNum?: number;

  @IsOptional()
  @IsString()
  sort?: string;
}
