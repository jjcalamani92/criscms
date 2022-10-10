import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { LayoutDashboard, LayoutPages } from '../../../../layouts'
import { GridPage0, GridPage1, GridPage2, GridPage3, GridProduct, ProductOverviews, ProductOverviews1 } from '../../../../components'
import Custom404 from '../../../404'
import { findPage0, findPage1, findPages0, findPages0ByParent, findPages1, findPages1ByParent, findSite, findSites, usePage0, usePages0, usePages1, useSites, findPages2ByParent, usePages2, findPages2, findPage2, findPages3ByParent, findAllProductsByParent, useAllProducts, findAllProducts, findProduct, useFindAllArticles, useProductsWithCursor, findProductsWithCursor } from '../../../../hooks'
import { getPathBySite, getPathByPages0, getPathByPage0, getPathByPage1, getPathByPages1, getPathByPage2, getPathByProduct, getPathBySiteProductsDB, getPathByProducts } from '../../../../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { LayoutPagesMarketing } from '../../../../layouts/layoutPagesMarketing'
import { LayoutPagesEcommerce } from '../../../../layouts/layoutPagesEcommerce'



function Page() {



  const { asPath } = useRouter()
  const { data: sites } = useSites();
  const { data: pages0 } = usePages0();
  const { data: pages1 } = usePages1();
  const { data: pages2 } = usePages2();
  const { data: allProducts } = useAllProducts();
  switch (asPath) {
    case '/dashboard/projects/6324d2d5132d462bc1c57b55': return <Fragment><div><h1>Hi</h1></div></Fragment>
    default:
      return <Custom404 />
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [{ params: { slug: ["6324d2d5132d462bc1c57b55"] } }],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {

  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    }
  }
}
Page.getLayout = function getLayout(children: React.ReactNode) {
  return (
    <LayoutPagesEcommerce>
      {children}
    </LayoutPagesEcommerce>
  )
}

export default Page