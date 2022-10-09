import { FC, useState, Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { usePage0, usePages0ByParent, usePages1ByParent, useSite } from '../../hooks';
import { CardPage1 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard, HeadingDashboardOption } from '../heading';
import { useSelections } from 'ahooks';
interface GridPage1 {

}

export const GridPage1: FC<GridPage1> = () => {
  const { query, asPath } = useRouter()
  const { data: pages1 } = usePages1ByParent(asPath)
  const { data: page0 } = usePage0(asPath)
  const list = useMemo(() => pages1,
    [pages1])
  const { selected, allSelected, noneSelected, isSelected, toggle, toggleAll, unSelectAll } = useSelections(
      list?.map(data => data._id)!
    );
  
  return (
    <Fragment>
      <HeadingDashboard title={page0?.data.seo.title!} page={page0}/>
      <HeadingDashboardOption checked={allSelected} toggleAll={toggleAll} selected={selected} unSelectAll={unSelectAll} /> 
      <Grid>
        {list?.map((data, i) => <CardPage1 key={i} page={data} checked={isSelected(data._id)} toggle={() => toggle(data._id)} partiallySelected={selected.length !== 0}/>)}
      </Grid>
    </Fragment>
  )
}