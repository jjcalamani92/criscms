/* eslint-disable react/no-children-prop */
import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { HomeFood, MarkdownComponentFC, MarkdownComponentSection} from '../../../../components'
import Custom404 from '../../../404'
import {  findSites, usePages0, usePages1, useSites } from '../../../../hooks'
import { getPathByProject, getPathByProjects } from '../../../../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { LayoutPagesProyects } from '../../../../layouts'
import { CategoryPreview0 } from '../../../../components/ecommerce/categoryPreview'


const holas = `
# Hola Mundo
`
const hola = MarkdownComponentSection(HomeFood)

function Page() { 
  const { asPath } = useRouter()
  const { data: sites } = useSites();
  const { data: pages0 } = usePages0();
  const { data: pages1 } = usePages1();
  // console.log(getPathByProjects(sites!));
  
  switch (asPath) {
    case getPathByProject(sites!, asPath): return (
    <Fragment>
      {
        MarkdownComponentSection(HomeFood)
      }
    </Fragment>)
    case '/dashboard/projects/6324d2d5132d462bc1c57b55/woman/tops': return (
    <Fragment>
      <CategoryPreview0 />
    </Fragment>)
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
  await queryClient.prefetchQuery(["find-sites"], findSites)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    }
  }
}
Page.getLayout = function getLayout(children: React.ReactNode) {
  return (
    <LayoutPagesProyects>
      {children}
    </LayoutPagesProyects>
  )
}

export default Page