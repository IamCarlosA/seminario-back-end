import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Nested } from '../shared/nested';
import { imageDefinition } from 'src/shared/image';
import { fileDefinition } from 'src/shared/file';

export enum VehicleCondition {
  excellent = 'excellent',
  ok = 'ok',
  bad = 'bad',
}

export enum BrakesCondition {
  excellent = 'excellent',
  ok = 'ok',
  bad = 'bad',
}

export enum BrakeType {
  disc = 'disc',
  drum = 'drum',
}

export enum GPSStatus {
  withSignal = 'withSignal',
  withoutSignal = 'withoutSignal',
}

export enum MaintenanceColor {
  green = 'green', // ready for deliver 24 hr
  yellow = 'yellow', // need a small fix ready in less than 48 hr
  blue = 'blue', // need a big fix it could take more than 72 hr
  red = 'red', // need a bigger fix, more than 5 days to be ready
}

export enum VehicleType {
  motorcycle = 'motorcycle',
}

export enum VehicleStatus {
  delivered = 'delivered',
  aside = 'aside',
  available = 'available',
  unavailable = 'unavailable',
  left = 'left',
  underMaintenance = 'underMaintenance',
  stolen = 'stolen',
}

export enum StatusDiscount {
  active = 'active',
  inactive = 'inactive',
}

@ObjectType()
export class DetailsClass {
  @Field(() => Number, { nullable: true })
  year: number;
  @Field(() => Number, { nullable: true })
  milage: number;
  @Field(() => String, { nullable: true })
  size: string;
  @Field(() => Boolean, { nullable: true })
  suspension: boolean;
  @Field(() => String, { nullable: true })
  note: string;
  @Field(() => String, { nullable: true })
  changes: string;
}

const details = {
  year: { type: Number },
  milage: { type: Number },
  size: { type: String },
  suspension: { type: Boolean },
  note: { type: String },
  changes: { type: String },
};

@ObjectType()
export class Brand {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;
}

const brand = {
  _id: { type: String },
  name: { type: String },
};

@ObjectType()
export class Model {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;
}
const model = {
  _id: { type: String },
  name: { type: String },
};

@ObjectType()
export class CylindersCapacity {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  value: string;
}
const cylindersCapacity = {
  _id: { type: String },
  value: { type: String },
};

@ObjectType()
export class Hub {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;
}
const hub = {
  _id: { type: String },
  name: { type: String },
};

@ObjectType()
export class City {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;
}
const city = {
  _id: { type: String },
  name: { type: String },
};

@ObjectType()
export class Country {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  tax_name: string;

  @Field(() => Number, { nullable: true })
  tax: number;

  @Field(() => String, { nullable: true })
  currency: string;

  @Field(() => String, { nullable: true })
  iso: string;

  @Field(() => Number, { nullable: true })
  deposit: number;

  @Field(() => Number, { nullable: true })
  insurance: number;

  @Field(() => Number, { nullable: true })
  deliveryPrice: number;
}
const country = {
  _id: { type: String },
  name: { type: String },
  tax_name: { type: String },
  tax: { type: Number },
  currency: { type: String },
  iso: { type: String },
  deposit: { type: Number },
  insurance: { type: Number },
  deliveryPrice: { type: Number },
};

@ObjectType()
class FileClass {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  url: string;
  @Field(() => Number, { nullable: true })
  size: number;
  @Field(() => String, { nullable: true })
  path: string;
  @Field(() => String, { nullable: true })
  hash: string;
  @Field(() => String, { nullable: true })
  ext: string;
  @Field(() => String, { nullable: true })
  mimeType: string;
}
@ObjectType()
class ImageFormatClass extends FileClass {
  @Field(() => String, { nullable: true })
  url: string;
  @Field(() => Number, { nullable: true })
  width: number;
  @Field(() => Number, { nullable: true })
  height: number;
}
@ObjectType()
class ImageFormatsClass {
  @Field(() => ImageFormatClass, { nullable: true })
  thumbnail: ImageFormatClass;
  @Field(() => ImageFormatClass, { nullable: true })
  small: ImageFormatClass;
}

@ObjectType()
class ImageClass extends FileClass {
  @Field(() => String, { nullable: true })
  alternativeText: string;
  @Field(() => ImageFormatsClass, { nullable: true })
  formats: ImageFormatsClass;
  @Field(() => Number, { nullable: true })
  width: number;
  @Field(() => Number, { nullable: true })
  height: number;
}

@ObjectType()
class discountsClass {
  @Field(() => String, { nullable: true })
  _id: string;
  @Field(() => String, { nullable: true })
  status: string;
  @Field(() => Number, { nullable: true })
  netValue: number;
  @Field(() => Number, { nullable: true })
  percentageValue: number;
  @Field(() => String, { nullable: true })
  type: string;
  @Field(() => String, { nullable: true })
  code: string;
  @Field(() => Date, { nullable: true })
  createdAt: Date;
  @Field(() => Date, { nullable: true })
  deactivatedAt: Date;
}

@ObjectType()
class statusHistoricClass {
  @Field(() => String, { nullable: true })
  status: string;
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  by: string;
}

@ObjectType()
class SalePriceClass {
  @Field(() => Number, { nullable: true })
  weeks: number;

  @Field(() => Number, { nullable: true })
  paymentWeek: number;

  @Field(() => Number, { nullable: true })
  interestRate: number;

  @Field(() => Number, { nullable: true })
  capital: number;

  @Field(() => Number, { nullable: true })
  interest: number;
}

@ObjectType()
class SalePriceContainerClass {
  @Field(() => SalePriceClass, { nullable: true })
  weeks52: SalePriceClass;

  @Field(() => SalePriceClass, { nullable: true })
  weeks78: SalePriceClass;

  @Field(() => SalePriceClass, { nullable: true })
  weeks104: SalePriceClass;
}

@ObjectType()
@Schema({ timestamps: true })
export class Vehicle {
  @Field(() => String)
  _id: string;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  visible: boolean;
  @Prop(raw(brand))
  @Field(() => Brand, { nullable: true })
  brand: Brand;
  @Prop(raw(model))
  @Field(() => Model, { nullable: true })
  model: Model;
  @Prop(raw(cylindersCapacity))
  @Field(() => CylindersCapacity, { nullable: true })
  cylindersCapacity: CylindersCapacity;
  @Prop()
  @Field(() => String, { nullable: true })
  suffix: string;
  @Prop()
  @Field(() => Date, { nullable: true })
  purchaseDate: Date;
  @Prop()
  @Field(() => String, { nullable: true })
  color: string;
  @Prop()
  @Field(() => String, { nullable: true })
  secondaryColor: string;
  @Prop()
  @Field(() => String, { nullable: true })
  condition: VehicleCondition;
  @Prop()
  @Field(() => Number, { nullable: true })
  purchaseCost: number;
  @Field(() => Number, { nullable: true })
  @Prop()
  rentPrice: number;
  @Field(() => Float, { nullable: true })
  @Prop()
  tankSize: number;
  @Field(() => String, { nullable: true })
  @Prop()
  plate: string;
  @Prop()
  @Field(() => String, { nullable: true })
  brakeType: BrakeType;
  @Prop()
  @Field(() => String, { nullable: true })
  brakesCondition: BrakesCondition;
  @Prop()
  @Field(() => String, { nullable: true })
  engineSN: string;
  @Field(() => String, { nullable: true })
  @Prop()
  registrationCard: string;
  @Prop()
  @Field(() => String, { nullable: true })
  vehicleSN: string;
  @Prop()
  @Field(() => Number, { nullable: true })
  maintenanceCost: number;
  @Prop(raw([imageDefinition]))
  @Field(() => [ImageClass], { nullable: true })
  images: ImageClass[];
  @Prop({ unique: true, minlength: 1 })
  @Field(() => String)
  internalId: string;
  @Prop()
  @Field(() => String, { nullable: true })
  externalId: string;
  @Prop()
  @Field(() => [discountsClass], { nullable: true })
  discounts: discountsClass[];
  @Prop()
  @Field(() => Number, { nullable: true })
  insurancePrice: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  score: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  scoring: number;
  @Prop(raw(details))
  @Field(() => DetailsClass, { nullable: true })
  details: DetailsClass;
  @Prop()
  @Field(() => String, { nullable: true })
  type: VehicleType;
  @Prop()
  @Field(() => String, { nullable: true })
  status: VehicleStatus;
  @Prop()
  @Field(() => String, { nullable: true })
  maintenanceColor: MaintenanceColor;
  @Prop()
  @Field(() => String, { nullable: true })
  gpsStatus: GPSStatus;
  @Prop()
  @Field(() => [statusHistoricClass], { nullable: true })
  statusHistoric: statusHistoricClass[];
  @Prop()
  @Field(() => Boolean, { nullable: true })
  insurance: boolean;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  deposit: boolean;
  @Prop()
  @Field(() => Number, { nullable: true })
  depositPrice: number;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  forSale: boolean;
  @Prop({ type: Object, default: {} })
  @Field(() => SalePriceContainerClass, { nullable: true })
  salePrices: SalePriceContainerClass;
  @Prop()
  @Field(() => Number, { nullable: true })
  extraCost: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  totalCost: number;
  @Prop()
  @Field(() => String, { nullable: true })
  owner: string;
  @Prop(raw(hub))
  @Field(() => Hub, { nullable: true })
  hub: Hub;
  @Prop(raw(city))
  @Field(() => City, { nullable: true })
  city: City;
  @Prop(raw(country))
  @Field(() => Country, { nullable: true })
  country: Country;
  @Prop()
  @Field(() => [Number], { nullable: true })
  creditTime: number[];
  @Prop([raw(fileDefinition)])
  @Field(() => FileClass, { nullable: true })
  documents: [FileClass];
  @Prop()
  @Field(() => String, { nullable: true })
  warranty: string;
  @Prop()
  @Field(() => String, { nullable: true })
  description: string;
  @Prop()
  @Field(() => String, { nullable: true })
  detail: string;
  @Prop()
  @Field(() => Number, { nullable: true })
  factorKM: number;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  confirmationKM: boolean;
  @Prop()
  @Field(() => Number, { nullable: true })
  blueBookPrice: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  trackerGPSId: number;
}
export type VehicleDocument = Vehicle & Document;
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
