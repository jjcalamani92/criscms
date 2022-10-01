import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { usePage0, usePage1, usePages0ByParent, usePages1ByParent, useSite } from '../../hooks';
import { CardPage1, CardPage2 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
import { usePages2ByParent } from '../../hooks/page/page2';
interface GridPage2 {

}

export const GridPage2: FC<GridPage2> = () => {
  const { query, asPath } = useRouter()
  const { data: page1 } = usePage1(asPath)
  const { data: pages2 } = usePages2ByParent(asPath)
  
  
  
  
  // const { data: pages1 } = usePages1ByParent(asPath)
  return (
    <Fragment>
      <HeadingDashboard title={page1?.data.seo.title!} page={page1}/>
      <Grid>
        {pages2?.map((data, i) => <CardPage2 key={i} page={data} />)}
      </Grid>
    </Fragment>
  )
}