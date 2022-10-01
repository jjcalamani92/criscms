import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { usePage0, usePages0ByParent, usePages1ByParent, useSite } from '../../hooks';
import { CardPage1 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
interface GridPage1 {

}

export const GridPage1: FC<GridPage1> = () => {
  const { query, asPath } = useRouter()
  const { data: page0 } = usePage0(asPath)
  const { data: pages1 } = usePages1ByParent(asPath)
  return (
    <Fragment>
      <HeadingDashboard title={page0?.data.seo.title!} page={page0}/>
      <Grid>
        {pages1?.map((data, i) => <CardPage1 key={i} page={data} />)}
      </Grid>
    </Fragment>
  )
}