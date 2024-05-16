import { IsEmail, IsString } from 'class-validator';

export class ConfirmUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'confirmationCode is required' })
  confirmationCode: string;
}
