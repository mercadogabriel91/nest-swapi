import { Injectable } from '@nestjs/common';
import {
  AdminAddUserToGroupCommandOutput,
  AuthenticationResultType,
  GetUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
// AWS serices
import cognitoModule from '../AWS/Cognito/cognito.module';
// DTOs
import { ResponseDto } from './dto/Response.dto';

@Injectable()
export class AuthService {
  async signUp(
    email: string,
    password: string,
    isAdmin?: boolean,
  ): Promise<ResponseDto> {
    const useSignupResponse = await cognitoModule.signUp(email, password);

    if (isAdmin) {
      await this.makeAdmin(email);
    }

    const { $metadata } = useSignupResponse;

    return new ResponseDto(
      $metadata.httpStatusCode,
      'A confirmation email has been sent',
    );
  }

  async login(
    email: string,
    password: string,
  ): Promise<AuthenticationResultType> {
    return cognitoModule.login(email, password);
  }

  async makeAdmin(email: string): Promise<AdminAddUserToGroupCommandOutput> {
    return cognitoModule.addUserToAdminGroup(email);
  }

  async confirmUser(
    email: string,
    confirmationCode: string,
  ): Promise<ResponseDto> {
    const confirmationResponse = await cognitoModule.confirmUser(
      email,
      confirmationCode,
    );

    const { $metadata } = confirmationResponse;

    return new ResponseDto($metadata.httpStatusCode, 'User confirmed');
  }

  async validateToken(accessToken: string): Promise<GetUserCommandOutput> {
    return cognitoModule.validateToken(accessToken);
  }

  async checkIfAdmin(userData: GetUserCommandOutput): Promise<boolean> {
    const { UserAttributes } = userData;
    const emailAttribute = UserAttributes.find((attr) => attr.Name === 'email');

    if (emailAttribute) {
      const email = emailAttribute.Value;
      return await cognitoModule.checkIfAdmin(email);
    } else {
      console.log('Email attribute not found in UserAttributes');
    }
  }
}
