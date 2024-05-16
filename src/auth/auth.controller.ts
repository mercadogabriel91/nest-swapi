import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
//DTOs
import { SignUpDto } from './dto/SignUpDto';
import { LogInDto } from './dto/LogInDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const { email, password, isAdmin } = signUpDto;

    return this.authService.signUp(email, password, isAdmin);
  }

  @Post('/login')
  async signIn(@Body(ValidationPipe) logInDto: LogInDto) {
    const { email, password } = logInDto;

    
    // Error logging in InvalidParameterException: USER_PASSWORD_AUTH flow not enabled for this client

    return await this.authService.login(email, password);

    // // Check if the user is an admin
    // const isAdmin = await this.authService.isUserAdmin(email);

    // return {
    //   ...response,
    //   isAdmin,
    // };
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
