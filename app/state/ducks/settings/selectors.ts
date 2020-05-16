import { useSelector } from 'react-redux';
import { ISettingsAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useSettings = () => {
  const projectState = useSelector(
    (state: ISettingsAwareState) => state.settings
  );

  return {
    projectState
  };
};
