import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ResponseDto } from './dto/Response.dto';
import {
  AdminAddUserToGroupCommandOutput,
  AuthenticationResultType,
  GetUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import cognitoModule from '../AWS/Cognito/cognito.module';

// Mock implementations for the methods in cognitoModule
const mockCognitoModule = {
  signUp: jest.fn(),
  login: jest.fn(),
  addUserToAdminGroup: jest.fn(),
  confirmUser: jest.fn(),
  validateToken: jest.fn(),
  checkIfAdmin: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  const mockSignUpResponse = { $metadata: { httpStatusCode: 200 } };
  const mockAuthResult: AuthenticationResultType = { AccessToken: 'token' };
  const mockAdminGroupResponse: AdminAddUserToGroupCommandOutput = {
    $metadata: { httpStatusCode: 200 },
  };
  const mockConfirmationResponse = { $metadata: { httpStatusCode: 200 } };
  const mockGetUserResponse: GetUserCommandOutput = {
    UserAttributes: [{ Name: 'email', Value: 'test@example.com' }],
    $metadata: { httpStatusCode: 200 },
    Username: 'test@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // Assign mock implementations
    (cognitoModule.signUp as jest.Mock) = mockCognitoModule.signUp;
    (cognitoModule.login as jest.Mock) = mockCognitoModule.login;
    (cognitoModule.addUserToAdminGroup as jest.Mock) =
      mockCognitoModule.addUserToAdminGroup;
    (cognitoModule.confirmUser as jest.Mock) = mockCognitoModule.confirmUser;
    (cognitoModule.validateToken as jest.Mock) =
      mockCognitoModule.validateToken;
    (cognitoModule.checkIfAdmin as jest.Mock) = mockCognitoModule.checkIfAdmin;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      mockCognitoModule.signUp.mockResolvedValue(mockSignUpResponse);
      mockCognitoModule.addUserToAdminGroup.mockResolvedValue(
        mockAdminGroupResponse,
      );

      const result = await service.signUp('test@example.com', 'password', true);
      expect(result).toEqual(
        new ResponseDto(200, 'A confirmation email has been sent'),
      );
      expect(mockCognitoModule.signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );
      expect(mockCognitoModule.addUserToAdminGroup).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      mockCognitoModule.login.mockResolvedValue(mockAuthResult);

      const result = await service.login('test@example.com', 'password');
      expect(result).toEqual(mockAuthResult);
      expect(mockCognitoModule.login).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );
    });
  });

  describe('confirmUser', () => {
    it('should confirm a user', async () => {
      mockCognitoModule.confirmUser.mockResolvedValue(mockConfirmationResponse);

      const result = await service.confirmUser('test@example.com', '123456');
      expect(result).toEqual(new ResponseDto(200, 'User confirmed'));
      expect(mockCognitoModule.confirmUser).toHaveBeenCalledWith(
        'test@example.com',
        '123456',
      );
    });
  });

  describe('validateToken', () => {
    it('should validate token', async () => {
      mockCognitoModule.validateToken.mockResolvedValue(mockGetUserResponse);

      const result = await service.validateToken('token');
      expect(result).toEqual(mockGetUserResponse);
      expect(mockCognitoModule.validateToken).toHaveBeenCalledWith('token');
    });
  });

  describe('checkIfAdmin', () => {
    it('should return true if user is admin', async () => {
      mockCognitoModule.checkIfAdmin.mockResolvedValue(true);

      const result = await service.checkIfAdmin(mockGetUserResponse);
      expect(result).toBe(true);
      expect(mockCognitoModule.checkIfAdmin).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should log an error if email attribute is not found', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const responseWithoutEmail = {
        UserAttributes: [],
      } as GetUserCommandOutput;

      await service.checkIfAdmin(responseWithoutEmail);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Email attribute not found in UserAttributes',
      );
    });
  });
});
