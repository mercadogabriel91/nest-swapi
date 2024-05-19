import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsUrl,
  IsDateString,
} from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  episode_id: number;

  @IsOptional()
  @IsString()
  opening_crawl?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsDateString()
  release_date?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  characters?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  planets?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  starships?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  vehicles?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  species?: string[];

  @IsOptional()
  @IsString()
  created?: string;

  @IsOptional()
  @IsString()
  edited?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}
