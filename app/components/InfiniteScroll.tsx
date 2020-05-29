import React from 'react';
import {
  PaginatedRequestOptions,
  PaginationOptions
} from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';
import { Typography, Button } from '@material-ui/core';
import Loading from './Loading';
import CircularLoading from './CircularLoading';

interface IInfiniteScrollProps {
  reducer: IReducer & { pagination?: PaginationOptions; data: Array<any> };
  getData: Function;
  children?: React.ReactNode;
}

const InfiniteScroll = ({
  reducer,
  getData,
  children
}: IInfiniteScrollProps) => {
  const [paginatedRequest, setPaginatedRequest] = React.useState<
    PaginatedRequestOptions
  >({ perPage: 100, page: 1 });

  // TODO : On Scroll
  // const handleScroll = () => {
  //   var lastLi = document.querySelector('ul.container > li:last-child');
  //   var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
  //   var pageOffset = window.pageYOffset + window.innerHeight;
  //   if (pageOffset > lastLiOffset) {
  //     this.loadMore();
  //   }
  // };

  const loadMore = () => {
    setPaginatedRequest((prevPaginatedRequest: PaginatedRequestOptions) => ({
      ...prevPaginatedRequest,
      page: prevPaginatedRequest?.page! + 1
      // reducer?.pagination?.totalPages > prevPaginatedRequest?.page!
      // ? prevPaginatedRequest?.page! + 1
      // : prevPaginatedRequest
    }));
  };

  React.useEffect(() => {
    getData(paginatedRequest);
  }, [paginatedRequest]);

  return (
    <>
      {reducer.loading && <Loading />}
      {reducer.error && <Typography>An Unexpected Error</Typography>}
      {children}
      {reducer.data &&
        reducer.data?.length > 0 &&
        (reducer.loading ? (
          <CircularLoading height="60px" />
        ) : (
          <Button onClick={loadMore}>Load More</Button>
        ))}
      {reducer.data && reducer.data?.length > 0 && reducer.error && (
        <Typography>An Unexpected Error</Typography>
      )}
    </>
  );
};

export default InfiniteScroll;
