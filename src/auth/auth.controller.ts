import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
//DTOs
import { SignUpDto } from './dto/SignUp.dto';
import { LogInDto } from './dto/LogIn.dto';
import { ConfirmUserDto } from './dto/ConfirmUser.dto';
// Paths
import Endpoints from './Endpoints/Endpoints';

@Controller(Endpoints.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Endpoints.SIGNUP)
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const { email, password, isAdmin } = signUpDto;

    return this.authService.signUp(email, password, isAdmin);
  }

  @Post(Endpoints.LOGIN)
  async signIn(@Body(ValidationPipe) logInDto: LogInDto) {
    const { email, password } = logInDto;

    return await this.authService.login(email, password);
  }

  @Post(Endpoints.CONFIRM)
  async confirmUser(@Body(ValidationPipe) confirmUserDto: ConfirmUserDto) {
    const { email, confirmationCode } = confirmUserDto;

    return await this.authService.confirmUser(email, confirmationCode);
  }
}
