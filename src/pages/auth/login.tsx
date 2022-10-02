import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { Login1 } from '../../components'

export default function Home() {
  return (
    <Login1 />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
  const session = await getSession({ req });
  // console.log({session});

  const { p = '/' } = query;

  if ( session ) {
      return {
          redirect: {
              destination: p.toString(),
              permanent: false
          }
      }
  }


  return {
      props: { }
  }
}
