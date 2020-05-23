import { findPassword } from 'keytar';
import { GitlabDefaultURL } from '@constants/commandConstants';
import { checkStringEmpty } from '@utils/stringHelper';

const credentials = async (
  organization?: string,
  token?: string
): Promise<IGitlabCredentials> => {
  const host = checkStringEmpty(organization, GitlabDefaultURL)!;

  if (token)
    return {
      host,
      token
    };

  const generatedToken = await findPassword('accessToken');
  if (!generatedToken) throw new Error('First Time User');

  return {
    host,
    token: generatedToken
  };
};

export default credentials;
