import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsArray } from 'class-validator';
import { Vehicle } from 'src/inventory/inventory.shema';

@ObjectType()
export class PaginatedVehicles {
  @IsNumber()
  @Field(() => Number, { nullable: true })
  pages: number;
  @Field(() => Number, { nullable: true })
  @IsNumber()
  page: number;
  @Field(() => Number, { nullable: true })
  @IsNumber()
  count: number;
  @Field(() => [Vehicle], { nullable: true })
  @IsArray()
  data: Vehicle[];

  constructor(pages: number, page: number, count: number, data: Vehicle[]) {
    this.pages = pages;
    this.page = page;
    this.count = count;
    this.data = data;
  }
}

// export class PaginatedDocumentWithTotals<
//   T extends Document,
// > extends PaginatedDocuments<T> {
//   @IsOptional()
//   totals: any;

//   @IsOptional()
//   filters?: any;

//   constructor(
//     pages: number,
//     page: number,
//     count: number,
//     data: T[],
//     totals: any,
//     filters?: any,
//   ) {
//     super(pages, page, count, data);
//     this.totals = totals;
//     this.filters = filters;
//   }
// }
