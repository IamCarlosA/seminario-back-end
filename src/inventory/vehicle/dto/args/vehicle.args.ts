import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@ArgsType()
export class VehicleArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  city?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  hub?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  sort?: string;
  @Field(() => [Number, Number, Number], { nullable: true })
  @IsOptional()
  @IsArray()
  salePrices?: [number, number, number];
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  color?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  secondaryColor?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  model?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  cylindersCapacity?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  country?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
