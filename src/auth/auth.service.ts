import { Injectable } from '@nestjs/common';
import cognitoModule from '../AWS/Cognito/cognito.module';

@Injectable()
export class AuthService {
  async signUp(email: string, password: string, isAdmin?: boolean) {
    const useSignupResponse = await cognitoModule.signUp(email, password);

    if (isAdmin) {
      await this.makeAdmin(email);
    }

    return useSignupResponse;
  }

  async login(email: string, password: string) {
    return cognitoModule.login(email, password);
  }

  async makeAdmin(email: string) {
    return cognitoModule.addUserToAdminGroup(email);
  }

  async confirmUser(email: string, confirmationCode: string) {
    return cognitoModule.confirmUser(email, confirmationCode);
  }

  async validateToken(accessToken: string) {
    return cognitoModule.validateToken(accessToken);
  }
}
