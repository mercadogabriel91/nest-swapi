import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
// Paths
import Endpoints from './Endpoints/Endpoints';
// Guards
import { AuthGuard } from '../auth/guard/auth.guard';
// Srvices
import { MovieService } from './movie.service';
// DTOs
import { UploadMovieDto } from './dto/upload-movie.dto';

@Controller(Endpoints.MOVIE)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(Endpoints.GET_ALL)
  // @UseGuards(AuthGuard)
  getProtectedResource() {
    return this.movieService.getAllMovies();
  }

  @Post(Endpoints.UPLOAD)
  async uploadMovie(@Body(ValidationPipe) uploadMovieDto: UploadMovieDto) {
    const { movie } = uploadMovieDto;

    return await this.movieService.uploadMovie(movie);
  }

  @Get(`${Endpoints.FIND_ONE}/:id`)
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(+id);
  }

  @Get(Endpoints.EASTEREGG)
  publicResource() {
    return this.movieService.easterEgg();
  }
}
