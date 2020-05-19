import { findPassword } from 'keytar';
import { Organizations } from '@commands/models/organization';

const credentials = async (
  organization: Organizations,
  token?: string
): Promise<IGitlabCredentials> => {
  if (token)
    return {
      host: organization,
      token
    };

  const generatedToken = await findPassword('accessToken');
  if (!generatedToken) throw new Error('First Time User');

  return {
    host: organization,
    token: generatedToken
  };
};

export default credentials;
