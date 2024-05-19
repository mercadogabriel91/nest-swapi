<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Lambda mode
$ npm run start:lambda

# NestJS SWAPI API Documentation

This document provides an overview of the NestJS SWAPI API, including its endpoints, data models, and required payloads.

## Endpoints

The API exposes the following endpoints:

### Movie Endpoints:

- **GET /movie/getall**: Retrieves all movies from the database.
- **POST /movie/upload**: Uploads a new movie to the database. Requires an `UploadMovieDto` payload.
- **GET /movie/findone/:id**: Retrieves a specific movie by its ID.
- **PATCH /movie/updateone**: Updates a specific movie by its ID. Requires a `PatchMovieDto` payload.
- **DELETE /movie/deleteone/:id**: Deletes a specific movie by its ID.
- **GET /movie/easteregg**: Returns a fun easter egg message.

### Authentication Endpoints:

- **POST /auth/signup**: Registers a new user. Requires an email and password.
- **POST /auth/login**: Logs in a user. Requires an email and password.
- **POST /auth/confirm/:email/:confirmationCode**: Confirms a user's email address. Requires an email and confirmation code.

## Data Models

The API uses the following data models:

### Movie Model:

- `episode_id`: (number) The episode ID of the movie.
- `title`: (string) The title of the movie.
- `opening_crawl`: (string) The opening crawl of the movie.
- `director`: (string) The director of the movie.
- `producer`: (string) The producer of the movie.
- `release_date`: (string) The release date of the movie.
- `characters`: (array of strings) The characters in the movie.
- `planets`: (array of strings) The planets in the movie.
- `starships`: (array of strings) The starships in the movie.
- `vehicles`: (array of strings) The vehicles in the movie.
- `species`: (array of strings) The species in the movie.
- `created`: (string) The date the movie was created in the database.
- `edited`: (string) The date the movie was last edited in the database.
- `url`: (string) The URL of the movie in the SWAPI API.

### User Model:

- `email`: (string) The user's email address.
- `password`: (string) The user's password.
- `isAdmin`: (boolean) Whether the user is an administrator.

## Required Payloads

### UploadMovieDto:

- `movie`: (Movie Model) The movie data to be uploaded.

### PatchMovieDto:

- `episode_id`: (number) The episode ID of the movie to be updated.
- `updateMovieDto`: (Movie Model) The updated movie data.

### Authentication Payloads:

#### Signup:

- `email`: (string) The user's email address.
- `password`: (string) The user's password.

#### Login:

- `email`: (string) The user's email address.
- `password`: (string) The user's password.

#### Confirm:

- `email`: (string) The user's email address.
- `confirmationCode`: (string) The confirmation code sent to the user's email.

## Authentication and Authorization

The API uses JWT authentication. Users must first register and confirm their email address before they can log in. Once logged in, users can access protected resources based on their roles. The API supports the following roles:

- **User**: Can access all public resources and their own private resources.
- **Admin**: Can access all resources, including other users' private resources.

## Additional Notes

- The API uses DynamoDB as its database.
- The API is written in TypeScript.
- The API uses the NestJS framework.

## Code Documentation

### /home/adminstrador/dev/nest-swapi/src/auth/guards/auth.guard.ts

This file contains the `AuthGuard` class, which is used to protect routes that require authentication. The guard checks for the presence of a valid JWT token in the request headers. If a valid token is found, the user is granted access to the route. Otherwise, an unauthorized error is thrown.

### /home/adminstrador/dev/nest-swapi/src/movie/movie.service.ts

This file contains the `MovieService` class, which provides methods for interacting with the movie data in the database. The service includes methods for getting all movies, uploading a new movie, finding a specific movie by ID, updating a movie, and deleting a movie.

### /home/adminstrador/dev/nest-swapi/src/AWS/Cognito/cognito.exception.ts

This file defines a custom exception class for handling errors related to Cognito authentication. The exception includes a message and an HTTP status code.

### /home/adminstrador/dev/nest-swapi/src/AWS/Cognito/cognito.module.ts

This file contains the `CognitoModule` class, which provides methods for interacting with the AWS Cognito service. The module includes methods for signing up new users, confirming user email addresses, logging in users, and validating JWT tokens.

### /home/adminstrador/dev/nest-swapi/src/auth/auth.service.ts

This file contains the `AuthService` class, which provides methods for user authentication and authorization. The service includes methods for signing up new users, logging in users, confirming user email addresses, and validating JWT tokens.

### /home/adminstrador/dev/nest-swapi/src/movie/dto/upload-movie.dto.ts

This file defines the `UploadMovieDto` class, which is used to validate the payload for the movie upload endpoint. The DTO includes a movie property, which is an instance of the `CreateMovieDto` class.

### /home/adminstrador/dev/nest-swapi/src/movie/Endpoints/Endpoints.ts

This file defines a constant object containing the names of the movie endpoints. This object is used to make the endpoint names more readable and maintainable.

### /home/adminstrador/dev/nest-swapi/src/movie/movie.controller.ts

This file contains the `MovieController` class, which defines the routes and controllers for the movie endpoints. The controller includes methods for getting all movies, uploading a new movie, finding a specific movie by ID, updating a movie, and deleting a movie.

### /home/adminstrador/dev/nest-swapi/src/AWS/DynamoDb/dynamodb.module.ts

This file contains the `DynamoDbModule` class, which provides methods for interacting with the AWS DynamoDB service. The module includes methods for adding new movies, getting all movies, finding a specific movie by ID, updating a movie, and deleting a movie.

### /home/adminstrador/dev/nest-swapi/src/auth/RolesAndPermissions/roles.decorator.ts

This file defines the `Roles` decorator, which is used to specify the roles required to access a route. The decorator takes an array of roles as arguments.

## Conclusion

This documentation provides a comprehensive overview of the NestJS SWAPI API, including its endpoints, data models, required payloads, authentication and authorization, and code documentation.
```
