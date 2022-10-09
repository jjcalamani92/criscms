import { useSelections } from 'ahooks';
import { FC, Fragment, useRef } from 'react';
import { Site } from '../../interfaces';
import { useDeleteManySitesById } from '../hooks';
import { CardSite } from './card';
import { HeadingDashboardOption } from './heading';
interface Grid {
  children: React.ReactNode;
}

export const Grid: FC<Grid> = ({ children }) => {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-6  sm:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 py-6 sm:pt-10`}>
      {children}
    </div>

  )
}

// interface Sites {
//   sites: Site[];
// }

// export const Sites: FC<Sites> = ({ sites}) => {
//   const { selected, allSelected, noneSelected, isSelected, toggle, toggleAll, unSelectAll } = useSelections(
//     sites?.map(data => data._id)!
//   );
//   return (
//     <Fragment>
//     <HeadingDashboardOption checked={allSelected} toggleAll={toggleAll} selected={selected} unSelectAll={unSelectAll} /> 
//     <Grid>
//       {
//         sites?.map((data, i) => <CardSite key={i} site={data} checked={isSelected(data._id)} toggle={() => toggle(data._id)} partiallySelected={selected.length !== 0} />)
//       }
//     </Grid>
//       </Fragment>

//   )
// }