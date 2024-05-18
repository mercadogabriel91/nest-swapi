import { HttpException, HttpStatus } from '@nestjs/common';

export class CognitoException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
