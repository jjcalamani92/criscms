import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { LayoutDashboard, LayoutPages } from '../../../../layouts'
import { GridPage0, GridPage1, GridPage2, GridPage3, GridProduct, ProductOverviews, ProductOverviews1 } from '../../../../components'
import Custom404 from '../../../404'
import { findPage0, findPage1, findPages0, findPages0ByParent, findPages1, findPages1ByParent, findSite, findSites, usePage0, usePages0, usePages1, useSites, findPages2ByParent, usePages2, findPages2, findPage2, findPages3ByParent, findAllProductsByParent, useAllProducts, findAllProducts, findProduct, useFindAllArticles, useProductsWithCursor, findProductsWithCursor } from '../../../../hooks'
import { getPathBySite, getPathByPages0, getPathByPage0, getPathByPage1, getPathByPages1, getPathByPage2, getPathByProduct, getPathBySiteProductsDB } from '../../../../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'



function Page() {



  const { asPath } = useRouter()
  const { data: sites } = useSites();
  const { data: pages0 } = usePages0();
  const { data: pages1 } = usePages1();
  const { data: pages2 } = usePages2();
  const { data: allProducts } = useAllProducts();
  // console.log(getPathBySiteProductsDB(sites!, asPath));
  
  // const { data: articles, isError, isLoading, isFetching, status } = useFindAllArticles();
  // const { data: products, isError, isLoading, isFetching, status } = useProductsWithCursor( {
  //   first: first,
  //   before: before,
  //   after: after,
  //   last: last
  // }, "clothing");
  
  // console.log('articles', articles)
  // console.log('isError', isError)
  // console.log('status', status)
  // console.log('isLoading', isLoading)
  // console.log('isFetching', isFetching)
  
  // console.log(pages0);
  
  

  switch (asPath) {
    case getPathBySite(sites!, asPath): return <GridPage0 />
    case getPathByPage0(pages0!, asPath): return <GridPage1 />
    case getPathByPage1(pages1!, asPath): return <GridPage2 />
    case getPathByPage2(pages2!, asPath): return <GridPage3 />
    case getPathByProduct(allProducts!, asPath): return <ProductOverviews/>
    case '/dashboard/sites/6324d2d5132d462bc1c57b55/$products': return <GridProduct />
    case getPathBySiteProductsDB(sites!, asPath): return <GridProduct />
    default:
      return <Custom404 />
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [{ params: { page: ["6324d2d5132d462bc1c57b55"] } }],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {

  const queryClient = new QueryClient()

  const query = context?.params?.page!
  // console.log(query);
  
  if (query.length === 1) {
    const siteId = query[0]; const parentId = siteId
    await queryClient.prefetchQuery(["find-site", siteId], async () => await findSite(siteId))
    await queryClient.prefetchQuery(["find-pages0-by-parent", parentId], async () => await findPages0ByParent(parentId))
  } else if (query.length === 2) {
    if (query[1]?.split('=')[0] === 'page0') {
      
      const pageId = query[1].split('=')[1]!; const parentId = pageId
      await queryClient.prefetchQuery(["find-page0", pageId], async () => await findPage0(pageId))
      await queryClient.prefetchQuery(["find-pages1-by-parent", parentId], async () => await findPages1ByParent(parentId))
    } else if(query[1]?.split('=')[0] === 'page1' ) {
      const pageId = query[1].split('=')[1]!; const parentId = pageId
      await queryClient.prefetchQuery(["find-page1", pageId], async () => await findPage1(pageId))
      await queryClient.prefetchQuery(["find-pages2-by-parent", parentId], async () => await findPages2ByParent(parentId))
      await queryClient.prefetchQuery(["find-all-products-by-parent", parentId], async () => await findAllProductsByParent(parentId))

    } else if(query[1]?.split('=')[0] === 'page2' ) {
      const pageId = query[1].split('=')[1]!; const parentId = pageId
      await queryClient.prefetchQuery(["find-page2", pageId], async () => await findPage2(pageId))
      await queryClient.prefetchQuery(["find-pages3-by-parent", parentId], async () => await findPages3ByParent(parentId))
      await queryClient.prefetchQuery(["find-all-products-by-parent", parentId], async () => await findAllProductsByParent(parentId))
    } 
  } else if (query.length === 3 && query[1] !== '$products') {
    const id = query[2]?.split('=')[1]!
    const type = query[2]?.split('=')[0]!
    await queryClient.prefetchQuery(["find-product", id, type], async () => await findProduct(id, type))

  }

  await queryClient.prefetchQuery(["find-all-products"], findAllProducts)
  await queryClient.prefetchQuery(["find-sites"], findSites)
  await queryClient.prefetchQuery(["find-pages0"], findPages0)
  await queryClient.prefetchQuery(["find-pages1"], findPages1)
  await queryClient.prefetchQuery(["find-pages2"], findPages2)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    }
  }
}
Page.getLayout = function getLayout(children: React.ReactNode) {
  return (
    <LayoutDashboard>
      {children}
    </LayoutDashboard>
  )
}

export default Page