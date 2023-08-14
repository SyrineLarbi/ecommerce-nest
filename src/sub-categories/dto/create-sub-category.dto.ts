import { IsNotEmpty, IsString } from 'class-validator';
export class CreatesubCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly category:string;
}
