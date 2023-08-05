import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class DataNotFoundException extends RuntimeException {
  constructor(model = 'Data') {
    super(`${model} not found.`);
  }
}
