import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @UseGuards(AuthGuard)
  getProtectedResource() {
    return this.movieService.getProtectedResource();
  }

  @Get('/easteregg')
  publicResource() {
    return this.movieService.easterEgg();
  }
}
