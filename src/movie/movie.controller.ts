import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
// Paths
import Endpoints from './Endpoints/Endpoints';
// Guards
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
// Srvices
import { MovieService } from './movie.service';
// DTOs
import { UploadMovieDto } from './dto/upload-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';
// Roles
import { Roles } from '../auth/RolesAndPermissions/roles.decorator';
import { Role } from '../auth/RolesAndPermissions/roles.enum';

@Controller(Endpoints.MOVIE)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(Endpoints.GET_ALL)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  getProtectedResource() {
    return this.movieService.getAllMovies();
  }

  @Post(Endpoints.UPLOAD)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async uploadMovie(@Body(ValidationPipe) uploadMovieDto: UploadMovieDto) {
    const { movie } = uploadMovieDto;

    return await this.movieService.uploadMovie(movie);
  }

  @Get(`${Endpoints.FIND_ONE}/:id`)
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(+id);
  }

  @Patch(Endpoints.UPDATE_ONE)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateMovie(@Body(ValidationPipe) patchMovieDto: PatchMovieDto) {
    const { episode_id, updateMovieDto } = patchMovieDto;

    return this.movieService.updateMovie(episode_id, updateMovieDto);
  }

  @Delete(`${Endpoints.DELETE_ONE}/:id`)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteOne(@Param('id') id: number) {
    return this.movieService.deleteOne(id);
  }

  @Get(Endpoints.EASTEREGG)
  publicResource() {
    return this.movieService.easterEgg();
  }
}
