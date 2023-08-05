import { Resolver, Query, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { VehicleArgs } from './dto/args/vehicle.args';
import { PaginatedVehicles } from './dto/vehicle-reponse.dto';

@Resolver()
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}
  @Query(() => PaginatedVehicles)
  async getAll(@Args() vehicleArgs: VehicleArgs): Promise<PaginatedVehicles> {
    return await this.vehicleService.findAll(vehicleArgs);
  }
}
