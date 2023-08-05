import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle/vehicle.resolver';
import { VehicleService } from './vehicle/vehicle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './inventory.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
  ],
  providers: [VehicleResolver, VehicleService],
})
export class InventoryModule {}
