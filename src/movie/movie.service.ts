import { Injectable } from '@nestjs/common';
// AWS modules
import dynamoDbModule from '../AWS/DynamoDb/dynamodb.module';
// DTOs
import { CreateMovieDto } from './dto/create-movie.dto';
import { ResponseDto } from '../auth/dto/Response.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  async getAllMovies() {
    return await dynamoDbModule.getAllMovies();
  }

  async uploadMovie(movie: CreateMovieDto): Promise<ResponseDto> {
    const ddbRes = await dynamoDbModule.addMovie(movie);
    const { $metadata } = ddbRes;

    return new ResponseDto(
      $metadata.httpStatusCode,
      'Movie uploaded successfully',
    );
  }

  async findOne(id: number) {
    return await dynamoDbModule.findOne(id);
  }

  async updateMovie(episode_id: number, updateMovieDto: UpdateMovieDto) {
    return await dynamoDbModule.update(episode_id, updateMovieDto);
  }

  easterEgg() {
    return {
      ayo: 'Get Duned my boy!',
      watchme_on_youtube: 'https://www.youtube.com/watch?v=sEymyO5Abp4',
      message: `If you haven't watched this movie yet do yourself a favor`,
    };
  }
}
