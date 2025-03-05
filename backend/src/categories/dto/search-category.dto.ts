import { IsOptional, IsString } from 'class-validator';

export class SearchCategoryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
