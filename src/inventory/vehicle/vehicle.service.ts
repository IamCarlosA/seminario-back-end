/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Vehicle, VehicleDocument, VehicleStatus } from '../inventory.shema';
import { VehicleArgs } from './dto/args/vehicle.args';
import { FormatStatusFilter } from 'src/shared/mongoHelpers';
import { PaginatedVehicles } from './dto/vehicle-reponse.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async findAll(vehicleArgs: VehicleArgs): Promise<PaginatedVehicles> {
    const {
      limit,
      page: pageArg,
      status,
      visible,
      city,
      hub,
      sort,
      salePrices,
      color,
      secondaryColor,
      brand,
      model,
      cylindersCapacity,
      country,
      search,
    } = vehicleArgs;
    const pipelines: any[] = [];
    const filter: FilterQuery<VehicleDocument> = {};
    const sortField = {} as any;
    if (search) {
      pipelines.push({
        $search: {
          index: 'vehicle',
          text: {
            query: search,
            path: [
              'brand.name',
              'model.name',
              'cylindersCapacity.value',
              'color',
              'secondaryColor',
              'city.name',
              'details.year',
              'details.mileage',
            ],
            fuzzy: {},
          },
        },
      });
      pipelines.push({
        $addFields: {
          scoring: { $meta: 'searchScore' },
        },
      });
      sortField['scoring'] = -1;
    }
    if (status) {
      filter.status = FormatStatusFilter(status, VehicleStatus);
    }
    if (visible !== undefined) {
      filter.visible = visible ? visible : { $ne: true };
    }
    if (color) {
      filter['color'] = color;
    }
    if (secondaryColor) {
      filter['secondaryColor'] = secondaryColor;
    }
    if (city) {
      filter['city.name'] = city;
    }
    if (country) {
      filter['country.name'] = country;
    }
    if (brand) {
      filter['brand.name'] = brand;
    }
    if (model) {
      filter['model.name'] = model;
    }
    if (cylindersCapacity) {
      filter['cylindersCapacity.value'] = cylindersCapacity;
      console.log(filter);
    }
    if (hub) {
      filter['hub.name'] = hub;
    }
    if (sort) {
      const direction = sort[0] === '-' ? -1 : 1;
      const field = sort[0] === '-' ? sort.substring(1) : sort;
      sortField[field] = direction;
    } else {
      sortField['_id'] = -1;
    }
    if (salePrices !== undefined) {
      if (Array.isArray(salePrices)) {
        const salePriceFilter: any = {};
        if (salePrices[0] !== undefined) {
          salePriceFilter.$gte = salePrices[0];
        }
        if (salePrices[1] !== undefined) {
          salePriceFilter.$lte = salePrices[1];
        }
        let key;
        if (salePrices[2] !== undefined) {
          key = `salePrices.weeks${salePrices[2]}.paymentWeek`;
          filter[key] = salePriceFilter;
        } else {
          key = `$or`;
          filter[key] = [
            {
              'salePrices.weeks52.paymentWeek': {
                $gte: salePriceFilter.$gte,
                $lte: salePriceFilter.$lte,
              },
            },
            {
              'salePrices.weeks78.paymentWeek': {
                $gte: salePriceFilter.$gte,
                $lte: salePriceFilter.$lte,
              },
            },
            {
              'salePrices.weeks104.paymentWeek': {
                $gte: salePriceFilter.$gte,
                $lte: salePriceFilter.$lte,
              },
            },
          ];
        }
      }
    }
    let countPipelines = [...pipelines];

    pipelines.push({ $match: filter }, { $sort: sortField });
    countPipelines.push({ $match: filter }, { $sort: sortField });
    countPipelines.push({ $count: 'total' });

    const countQuery = await this.vehicleModel.aggregate(countPipelines);
    let count = countQuery.length > 0 ? countQuery[0].total : 0;

    const pages = limit > 0 ? Math.ceil(count / limit) : 1;
    const page = limit > 0 ? Math.max(1, Math.min(pages, pageArg)) : 1;

    if (limit > 0) {
      if (page) {
        pipelines.push({ $skip: (page - 1) * limit });
      }
      pipelines.push({ $limit: limit });
    }

    const vehicles = await this.vehicleModel.aggregate(pipelines);

    const response = new PaginatedVehicles(pages, page, count, vehicles);

    return response;
  }
}
