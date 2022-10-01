import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LayoutDashboard, LayoutPages } from '../layouts'

export default function Home() {
  return (
    <h1>Hola</h1>
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutPages>
      {page}
    </LayoutPages>
  )
}
