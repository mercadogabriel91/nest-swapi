import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 number or special character, 1 uppercase letter, and 1 lowercase letter',
  })
  password: string;

  @IsOptional()
  @IsBoolean({ message: 'isAdmin must be a boolean value' })
  @Transform(({ value }) => (value === undefined ? false : value))
  isAdmin?: boolean;
}
