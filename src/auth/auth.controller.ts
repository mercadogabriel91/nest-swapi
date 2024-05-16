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
import { SignUpDto } from './dto/SignUp.dto';
import { LogInDto } from './dto/LogIn.dto';
import { ConfirmUserDto } from './dto/ConfirmUser.dto';
// Paths
import Endpoints from './Endpoints/Endpoints';

// @Controller('auth')
@Controller(Endpoints.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signup')
  @Post(Endpoints.SIGNUP)
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const { email, password, isAdmin } = signUpDto;

    return this.authService.signUp(email, password, isAdmin);
  }

  // @Post('/login')
  @Post(Endpoints.LOGIN)
  async signIn(@Body(ValidationPipe) logInDto: LogInDto) {
    const { email, password } = logInDto;

    return await this.authService.login(email, password);
  }

  // @Post('/confirm')
  @Post(Endpoints.CONFIRM)
  async confirmUser(@Body(ValidationPipe) confirmUserDto: ConfirmUserDto) {
    const { email, confirmationCode } = confirmUserDto;

    return await this.authService.confirmUser(email, confirmationCode);
  }

  // @Post('/validate')
  // async validateToken(@Body() body: any) {
  //   const { accessToken } = body;

  //   return await this.authService.validateToken(accessToken);
  // }

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
