import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { usePage0, usePage2, usePages0ByParent, usePages1ByParent, usePages3ByParent, useSite } from '../../hooks';
import { CardPage1, CardPage2, CardPage3 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
import { usePages2ByParent } from '../../hooks/page/page2';
interface GridPage3 {

}

export const GridPage3: FC<GridPage3> = () => {
  const { query, asPath } = useRouter()
  const { data: page2 } = usePage2(asPath)
  const { data: pages3 } = usePages3ByParent(asPath)

  return (
    <Fragment>
      <HeadingDashboard title={page2?.data.seo.title!} page={page2}/>
      <Grid>
        {pages3?.map((data, i) => <CardPage3 key={i} page={data} />)}
      </Grid>
      
    </Fragment>
  )
}