import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminAddUserToGroupCommand,
  SignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import * as dotenv from 'dotenv';

dotenv.config();

class CognitoModule {
  private appClientId: string;
  private region: string;
  private client: CognitoIdentityProviderClient;

  constructor() {
    this.appClientId = process.env.COGNITO_APP_CLIENT_ID;
    this.region = process.env.AWS_REGION;
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
        console.log(res);
        return res;
      });
    } catch (err) {
      return err;
    }
  }
}

const cognitoModule = new CognitoModule();

export default cognitoModule;
