import type { NextPageWithLayout } from '../../_app'
import { LayoutDashboard, LayoutPages } from '../../../layouts'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { findSites } from '../../../hooks'
import { Fragment } from 'react'
import { GridSite, HeadingDashboard } from '../../../components'


const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}


export default function Sites() {
  return (
    <Fragment>
      <GridSite />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["find-sites"], findSites)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    }
  }
}


Sites.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}
