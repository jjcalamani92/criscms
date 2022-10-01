import { FC } from 'react';
interface Grid {
  children: React.ReactNode;
}

export const Grid: FC<Grid> = ({ children }) => {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-6  sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5`}>
      {children}
    </div>

  )
}