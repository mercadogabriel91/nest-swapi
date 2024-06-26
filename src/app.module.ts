import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [AuthModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
