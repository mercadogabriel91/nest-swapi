import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMovieDto } from './create-movie.dto';

export class UploadMovieDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMovieDto)
  movie: CreateMovieDto;
}
