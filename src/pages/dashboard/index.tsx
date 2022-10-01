import type { NextPage } from 'next'
import type { NextPageWithLayout } from '../_app'
import { LayoutDashboard, LayoutPages } from '../../layouts'


const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}


export default function Dashboard() {
  return (
    <h1>dashboard</h1>
  )
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}
