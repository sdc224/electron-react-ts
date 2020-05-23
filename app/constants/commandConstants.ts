export const RegularExpressions = {
  GitVersion: /^git version ([\w.]+[\w]+)$/,
  GitCloneCountObjects: /Counting objects:\s*(\d+)%/i,
  GitCloneCompressObjects: /Compressing objects:\s*(\d+)%/i,
  GitCloneReceiveObjects: /Receiving objects:\s*(\d+)%/i,
  GitCloneReceiveDeltas: /Resolving deltas:\s*(\d+)%/i,
  GitlabEnterpriseJSONError: /Unexpected token < in JSON at position 0/
};

export const GitlabDefaultURL = 'https://gitlab.com';
