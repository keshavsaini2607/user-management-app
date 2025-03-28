import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any) {
    try {
      // Validate the value against the Zod schema
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException(
        error.errors.map((e) => e.message).join(', '),
      );
    }
  }
}
