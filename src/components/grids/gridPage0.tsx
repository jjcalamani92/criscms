import { FC, useState, Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { usePages0ByParent, useSite } from '../../hooks';
import { CardPage0 } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard, HeadingDashboardOption } from '../heading';
import { useSelections } from 'ahooks';
interface GridPage0 {

}

export const GridPage0: FC<GridPage0> = () => {
  const { query, asPath } = useRouter()
  const { data: pages0 } = usePages0ByParent(asPath)
  const { data: site } = useSite(asPath);
  // console.log(pages0)
  const list = useMemo(() => pages0,
    [pages0])
  const { selected, allSelected, noneSelected, isSelected, toggle, toggleAll, unSelectAll } = useSelections(
      list?.map(data => data._id)!
    );
  return (
    <Fragment>
      <HeadingDashboard title={site?.data.name!} site={site}/>
      <HeadingDashboardOption checked={allSelected} toggleAll={toggleAll} selected={selected} unSelectAll={unSelectAll} /> 
      <Grid>
        {list?.map((data, i) => <CardPage0 key={i} page={data} checked={isSelected(data._id)} toggle={() => toggle(data._id)} partiallySelected={selected.length !== 0}/>)}
      </Grid>
    </Fragment>
  )
}