import { IsNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateMovieDto } from './update-movie.dto';

export class PatchMovieDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateMovieDto)
  updateMovieDto: UpdateMovieDto;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  episode_id: number;
}
