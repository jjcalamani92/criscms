import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Hero } from '../components'
import { LayoutDashboard, LayoutPages } from '../layouts'

export default function Home() {
  return (
    <Hero />
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutPages>
      {page}
    </LayoutPages>
  )
}
