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
} from '@aws-sdk/client-cognito-identity-provider';
import * as dotenv from 'dotenv';

dotenv.config();

class CognitoModule {
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
        return res;
      });
    } catch (err) {
      return err;
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
        console.log(`Successfully added ${username} as Admin`);

        return res;
      });
    } catch (err) {
      console.error(`Error adding ${username} as Admin:`, err);

      throw err;
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
      return groups?.some((group) => group.GroupName === 'Admin');
    } catch (error) {
      // Handle error
      console.error('Error checking admin status:', error);
      throw error; // or throw a custom error
    }
  }

  async login(email: string, password: string): Promise<string> {
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
      const { AccessToken } = AuthenticationResult;

      console.log('Login successful!');

      return AccessToken;
    } catch (error) {
      console.error('Error logging in', error);
      throw new Error('Login failed');
    }
  }

  async confirmUser(email: string, confirmationCode: string) {
    const params = {
      ClientId: this.appClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      const response = await this.client.send(command);
      console.log('User confirmation successful', response);

      return response;
    } catch (error) {
      console.error('Error confirming user', error);
      throw new Error('User confirmation failed');
    }
  }
}

const cognitoModule = new CognitoModule();

export default cognitoModule;
