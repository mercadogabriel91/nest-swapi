import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminAddUserToGroupCommand,
  SignUpCommandOutput,
  AdminAddUserToGroupCommandOutput,
  AdminListGroupsForUserCommand,
  InitiateAuthCommand,
  AuthFlowType,
  ConfirmSignUpCommand,
  GetUserCommand,
  AuthenticationResultType,
  ConfirmSignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { HttpStatus, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CognitoException } from './cognito.exception';

dotenv.config();

class CognitoModule {
  private readonly logger = new Logger(CognitoModule.name);
  private appClientId: string;
  private region: string;
  private cognitoUserPoolId: string;
  private client: CognitoIdentityProviderClient;

  constructor() {
    this.appClientId = process.env.COGNITO_APP_CLIENT_ID;
    this.region = process.env.AWS_REGION;
    this.cognitoUserPoolId = process.env.COGNITO_USER_POOL_ID;
    this.client = new CognitoIdentityProviderClient({
      region: this.region,
    });
  }

  async signUp(email: string, password: string): Promise<SignUpCommandOutput> {
    const command = new SignUpCommand({
      ClientId: this.appClientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    });

    try {
      return await this.client.send(command).then((res) => {
        this.logger.log(`User signed up Successfully!`);
        return res;
      });
    } catch (err) {
      this.logger.error(`User sign up error: ${err}`);
      throw new CognitoException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addUserToAdminGroup(
    username: string,
  ): Promise<AdminAddUserToGroupCommandOutput> {
    const params = {
      UserPoolId: this.cognitoUserPoolId,
      Username: username,
      GroupName: 'Admin',
    };

    const command = new AdminAddUserToGroupCommand(params);

    try {
      return await this.client.send(command).then((res) => {
        this.logger.log(`Successfully added ${username} as Admin`);

        return res;
      });
    } catch (err) {
      this.logger.error(`Error adding ${username} as Admin:`, err);

      throw new CognitoException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkIfAdmin(email: string) {
    const params = {
      UserPoolId: this.cognitoUserPoolId,
      Username: email,
    };

    const command = new AdminListGroupsForUserCommand(params);

    try {
      const response = await this.client.send(command);
      const groups = response.Groups;
      this.logger.log(`User ${email} is Admin`);

      return groups?.some((group) => group.GroupName === 'Admin');
    } catch (error) {
      this.logger.error(`User ${email} not found in admins list`);
      throw new CognitoException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<AuthenticationResultType> {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.appClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const response = await this.client.send(command);
      const { AuthenticationResult } = response;

      this.logger.log('Login successful!');

      return AuthenticationResult;
    } catch (error) {
      this.logger.error(`Error logging in: ${error}`);
      throw new CognitoException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  async confirmUser(
    email: string,
    confirmationCode: string,
  ): Promise<ConfirmSignUpCommandOutput> {
    const params = {
      ClientId: this.appClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      const response = await this.client.send(command);
      this.logger.log(`User confirmation successful!`);

      return response;
    } catch (error) {
      this.logger.error(`Error confirming user: ${error}`);

      throw new CognitoException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateToken(accessToken: string) {
    const params = {
      AccessToken: accessToken,
    };

    try {
      const command = new GetUserCommand(params);
      const response = await this.client.send(command);
      this.logger.log(`Token is valid`);

      return response;
    } catch (error) {
      this.logger.error(`Token validation failed: ${error}`);
      throw new CognitoException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}

const cognitoModule = new CognitoModule();

export default cognitoModule;
