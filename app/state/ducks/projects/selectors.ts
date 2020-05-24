import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginatedRequestOptions } from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';
import { getAllProjectsStart } from './actions';
import { IProjectAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useProjects = () => {
  const dispatch = useDispatch();

  const projectState = useSelector(
    (state: IProjectAwareState) => state.projects
  );

  const getAllProjects = useCallback(
    (paginatedRequestOption: PaginatedRequestOptions) =>
      dispatch(getAllProjectsStart(paginatedRequestOption)),
    [dispatch]
  );

  return {
    projectState,
    getAllProjects
  };
};
