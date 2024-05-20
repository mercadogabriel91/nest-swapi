import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { LogInDto } from './dto/LogIn.dto';
import { ConfirmUserDto } from './dto/ConfirmUser.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn().mockReturnValue({}),
    login: jest.fn().mockReturnValue({}),
    confirmUser: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      const dto: SignUpDto = {
        email: 'test@example.com',
        password: 'password',
        isAdmin: false,
      };
      expect(await controller.signUp(dto)).toEqual({});
      expect(mockAuthService.signUp).toHaveBeenCalledWith(
        dto.email,
        dto.password,
        dto.isAdmin,
      );
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const dto: LogInDto = { email: 'test@example.com', password: 'password' };
      expect(await controller.signIn(dto)).toEqual({});
      expect(mockAuthService.login).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );
    });
  });

  describe('confirmUser', () => {
    it('should confirm a user', async () => {
      const dto: ConfirmUserDto = {
        email: 'test@example.com',
        confirmationCode: '123456',
      };
      expect(await controller.confirmUser(dto)).toEqual({});
      expect(mockAuthService.confirmUser).toHaveBeenCalledWith(
        dto.email,
        dto.confirmationCode,
      );
    });
  });
});
