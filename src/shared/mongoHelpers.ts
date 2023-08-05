import { Types } from 'mongoose';
import { DataNotFoundException } from './exceptions/data-not-found.exception';

export function FormatStatusFilter(statusList: string, enumStats) {
  const statuses = statusList.split(',');
  const inStatus = [];
  statuses.forEach((stat) => {
    if (stat in enumStats) {
      inStatus.push(stat);
    }
  });
  return { $in: statuses };
}

export function formatObjectId(id: string | Types.ObjectId, modelName: string) {
  if (typeof id === 'string') {
    if (Types.ObjectId.isValid(id)) return new Types.ObjectId(id);
    else throw new DataNotFoundException(modelName);
  } else {
    return id;
  }
}
