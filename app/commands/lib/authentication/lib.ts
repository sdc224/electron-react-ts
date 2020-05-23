// eslint-disable-next-line import/prefer-default-export
export const authenticate = async (
  credentials: Promise<IGitlabCredentials> | IGitlabCredentials
) => {
  try {
    const { host } = await credentials;
    const response: Response = await fetch(host!);
    if (!response) throw new Error('Something went wrong!');
    if (response.status >= 400) {
      if (response!.status === 401) {
        throw new Error('Invalid Access Token');
      }
      if (response!.status === 403) {
        throw new Error('Please connect VPN first!');
      } else if (response!.status >= 500) {
        throw new Error('Sorry guys...server down. Please try after some time');
      } else if (!response.ok) {
        throw new Error('No Internet Connection');
      } else {
        throw new Error('Maybe some other Internet Issue');
      }
    }
  } catch (error) {
    if (/^Failed to fetch/.test(error.message))
      throw new Error(
        'Maybe some network issue(Not connected, DNS Resolve Failure)'
      );
    throw error;
  }
};
