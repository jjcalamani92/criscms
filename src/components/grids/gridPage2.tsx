import { FC, useState, Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAllProductsByParent, usePage0, usePage1, usePages0ByParent, usePages1ByParent, useSite } from '../../hooks';
import { CardPage1, CardPage2, CardProduct, CardProduct0 } from '../card';
import { Grid, Pages2, Products } from '../grid';
import { HeadingDashboard, HeadingDashboardOption } from '../heading';
import { usePages2ByParent } from '../../hooks/page/page2';
import { typePageEcommerceCategory } from '../../../utils';
import { useSelections } from 'ahooks';
interface GridPage2 {

}

export const GridPage2: FC<GridPage2> = () => {
  const { asPath } = useRouter()
  const { data: page1 } = usePage1(asPath)
  const { data: pages2 } = usePages2ByParent(asPath)
  const { data: products } = useAllProductsByParent(asPath)
  const list = useMemo(() => pages2,
    [pages2])
  const listProducts = useMemo(() => products,
    [products])
  return (
    <Fragment>
      <HeadingDashboard title={page1?.data.seo.title!} page={page1}/>
      
      <Pages2 pages2={list!}/>
      
      {
        typePageEcommerceCategory.map(data => data.value).includes(page1?.data.type!) &&
        <Products products={listProducts!} type={page1?.data.type!} />
      }
    </Fragment>
  )
}