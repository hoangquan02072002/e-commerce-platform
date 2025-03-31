import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class SearchProductDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures price is a positive number
  price?: number;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures limit is a positive number
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures pageNum is a positive number
  pageNum?: number;
}
