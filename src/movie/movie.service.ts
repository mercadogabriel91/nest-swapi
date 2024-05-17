import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }

  easterEgg() {
    return {
      ayo: 'Get Duned my boy!',
      watchme_on_youtube: 'https://www.youtube.com/watch?v=sEymyO5Abp4',
      message: `If you haven't watched this movie yet do yourself a favor`,
    };
  }
}
