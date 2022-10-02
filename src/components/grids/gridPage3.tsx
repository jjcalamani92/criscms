import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useAllProductsByParent, usePage0, usePage2, usePages0ByParent, usePages1ByParent, usePages3ByParent, useProductsByParent, useSite } from '../../hooks';
import { CardPage1, CardPage2, CardPage3, CardProduct } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
import { typePageEcommerceCategory } from '../../../utils';
interface GridPage3 {

}

export const GridPage3: FC<GridPage3> = () => {
  const { query, asPath } = useRouter()
  const { data: page2 } = usePage2(asPath)
  const { data: pages3 } = usePages3ByParent(asPath)
  const { data: products } = useAllProductsByParent(asPath)
  return (
    <Fragment>
      <HeadingDashboard title={page2?.data.seo.title!} page={page2}/>
      <Grid>
        {pages3?.map((data, i) => <CardPage3 key={i} page={data} />)}
      </Grid>
      {
        typePageEcommerceCategory.map(data => data.value).includes(page2?.data.type!) &&
        <Grid>
        {products?.map((data, i) => <CardProduct key={i} product={data} />)}
        </Grid>
      }
      
    </Fragment>
  )
}