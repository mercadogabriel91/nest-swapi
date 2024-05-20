import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UploadMovieDto } from './dto/upload-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';

describe('AppController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockMovieService = {
    getAllMovies: jest.fn().mockReturnValue([]),
    uploadMovie: jest.fn().mockReturnValue({}),
    findOne: jest.fn().mockReturnValue({}),
    updateMovie: jest.fn().mockReturnValue({}),
    deleteOne: jest.fn().mockReturnValue({}),
    easterEgg: jest.fn().mockReturnValue({
      ayo: 'Get Duned my boy!',
      watchme_on_youtube: 'https://www.youtube.com/watch?v=sEymyO5Abp4',
      message: "If you haven't watched this movie yet do yourself a favor",
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array of movies', async () => {
      expect(await controller.getAllMovies()).toEqual([]);
    });
  });

  describe('uploadMovie', () => {
    it('should upload a movie', async () => {
      const dto: UploadMovieDto = { movie: {} as any };
      expect(await controller.uploadMovie(dto)).toEqual({});
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      expect(await controller.findOne(1)).toEqual({});
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const dto: PatchMovieDto = { episode_id: 1, updateMovieDto: {} as any };
      expect(await controller.updateMovie(dto)).toEqual({});
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', async () => {
      expect(await controller.deleteOne(1)).toEqual({});
    });
  });

  describe('publicResource', () => {
    it('should return easter egg', async () => {
      const esterEggResponse = {
        ayo: 'Get Duned my boy!',
        watchme_on_youtube: 'https://www.youtube.com/watch?v=sEymyO5Abp4',
        message: "If you haven't watched this movie yet do yourself a favor",
      };

      expect(await controller.publicResource()).toStrictEqual(esterEggResponse);
    });
  });
});
