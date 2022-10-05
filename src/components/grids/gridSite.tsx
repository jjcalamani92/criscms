import { FC, Fragment, useState } from 'react';
import { useSites } from '../../hooks';
import { CardSite } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
interface GridSite {

}

export const GridSite: FC<GridSite> = () => {
  const { data: sites, isError, isLoading, isFetching } = useSites();

  return (
    <Fragment>
      <HeadingDashboard title={"Sites"} />
      <Grid>
        {sites?.map((data, i) => <CardSite key={i} site={data} />)}
      </Grid>
    </Fragment>
  )
}