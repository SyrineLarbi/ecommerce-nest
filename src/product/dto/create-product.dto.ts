import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly qte: number;

  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsString()
  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsNotEmpty()
  readonly subcategory: string;
}