import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
