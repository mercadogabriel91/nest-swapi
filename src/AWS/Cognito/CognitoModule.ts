import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const appClientId = '2jll54kbh3mr1gafbsglnj8n83';

class CognitoModule {
  async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: appClientId,
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
      return await client.send(command).then((res) => {
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
