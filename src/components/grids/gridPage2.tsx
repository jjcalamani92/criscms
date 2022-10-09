import { FC, useState, Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAllProductsByParent, usePage0, usePage1, usePages0ByParent, usePages1ByParent, useSite } from '../../hooks';
import { CardPage1, CardPage2, CardProduct } from '../card';
import { Grid } from '../grid';
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
  const { selected, allSelected, noneSelected, isSelected, toggle, toggleAll, unSelectAll } = useSelections(
      list?.map(data => data._id)!
    );
  return (
    <Fragment>
      <HeadingDashboard title={page1?.data.seo.title!} page={page1}/>
      <HeadingDashboardOption checked={allSelected} toggleAll={toggleAll} selected={selected} unSelectAll={unSelectAll} /> 
      <Grid>
        {pages2?.map((data, i) => <CardPage2 key={i} page={data} checked={isSelected(data._id)} toggle={() => toggle(data._id)} partiallySelected={selected.length !== 0}/>)}
      </Grid>
      {
        typePageEcommerceCategory.map(data => data.value).includes(page1?.data.type!) &&
        <Grid>
        {products?.map((data, i) => <CardProduct key={i} product={data} />)}
        </Grid>
      }
    </Fragment>
  )
}