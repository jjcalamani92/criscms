import { FC, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useAllProductsByParent, usePage0, usePage2, usePages0ByParent, usePages1ByParent, usePages3ByParent, useProductsByParent, useProductsWithCursor, useSite } from '../../hooks';
import { CardPage1, CardPage2, CardPage3, CardProduct } from '../card';
import { Grid } from '../grid';
import { HeadingDashboard } from '../heading';
import { getQuery, typePageEcommerceCategory } from '../../../utils';
import { Pagination01 } from '../pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
interface GridProduct {

}

export const GridProduct: FC<GridProduct> = () => {
  const {asPath} = useRouter()
  const query = getQuery(asPath) 
  
  const [amount, setAmount] = useState(10)
  const [args, setArgs] = useState({
    first: amount,
  })
  const { data: products, isError, isLoading, isFetching, status, isPreviousData } = useProductsWithCursor( args, query[4], query[2]);
  
  const rows = [];
  for (let i = 0; i < 10; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      rows.push(<div key={i}>
        <Skeleton height={200} />
        <Skeleton height={50} />
      </div>);
  }

  return (
    <Fragment>
      <HeadingDashboard title={"products"} />
      <Grid>
      {
        isLoading ?
        rows
        :
        products?.page.edges.map((data, i) => <CardProduct key={i} product={data.node} />)
      }
      </Grid>
      <Pagination01 setArgs={setArgs} amount={amount} pageInfo={products?.page.pageInfo!} pageData={products?.pageData!}/>
      
    </Fragment>
  )
}