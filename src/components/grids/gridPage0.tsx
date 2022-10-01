import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { usePages0ByParent, useSite } from '../../hooks';
import { CardPage0 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
interface GridPage0 {

}

export const GridPage0: FC<GridPage0> = () => {
  const { query, asPath } = useRouter()
  const { data: pages0 } = usePages0ByParent(asPath)
  const { data: site } = useSite(asPath);

  return (
    <Fragment>
      <HeadingDashboard title={site?.data.name!} site={site}/>
      <Grid>
        {pages0?.map((data, i) => <CardPage0 key={i} page={data} />)}
      </Grid>
    </Fragment>
  )
}