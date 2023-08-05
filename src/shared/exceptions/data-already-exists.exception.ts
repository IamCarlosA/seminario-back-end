import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class DataAlreadyExistsException extends RuntimeException {
  constructor(model = 'Data') {
    super(`${model} already exists.`);
  }
}
