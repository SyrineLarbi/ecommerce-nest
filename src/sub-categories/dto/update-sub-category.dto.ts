import { PartialType } from '@nestjs/mapped-types';
import { CreatesubCategoryDto } from './create-sub-category.dto';

export class UpdateSubCategoryDto extends PartialType(CreatesubCategoryDto) {}
