import { useLongPress, useSelections } from 'ahooks';
import { FC, Fragment, useMemo, useRef, useState } from 'react';
import { Site } from '../../../interfaces';
import { useSites, useSitesWithCursor } from '../../hooks';
import { CardSite } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard, HeadingDashboardOption } from '../heading';
import { Pagination01 } from '../pagination';
import { Skeleton } from '../skeleton';

interface GridSite {

}

export const GridSite: FC<GridSite> = () => {
  const {data:sites, isFetching} = useSites()
  const list = useMemo(() => sites,
    [sites])
    const { selected, allSelected, noneSelected, isSelected, toggle, toggleAll, unSelectAll } = useSelections(
      list?.map(data => data._id)!
    );
  return (
    <Fragment>
      <HeadingDashboard title={"Sites"} />
      <HeadingDashboardOption checked={allSelected} toggleAll={toggleAll} selected={selected} unSelectAll={unSelectAll} /> 
        <Grid>
        
        {
          isFetching ?
          <Skeleton />
          :
          <Fragment>
          {
            list?.map((data, i) => <CardSite key={i} site={data} checked={isSelected(data._id)} toggle={() => toggle(data._id)} partiallySelected={selected.length !== 0} />)
          }
          </Fragment>
        }
        </Grid>
      {/* <Pagination01 setArgs={setArgs} amount={amount} pageInfo={list?.page.pageInfo!} pageData={sitess?.pageData!}/> */}
    </Fragment>
  )
}