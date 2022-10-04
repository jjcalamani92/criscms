/* eslint-disable @next/next/no-img-element */

import { Fragment } from 'react'
import { Hero } from '../components'
import { LayoutDashboard, LayoutPages } from '../layouts'

export default function Home() {
  return (
    <Fragment>
      {/* <div className='flex items-center justify-center h-screen'>
        <div className="bg-gray-200 p-2 mx-6 rounded-2xl ">
          <div className='flex flex-col md:flex-row rounded-2xl'>
            <img src="https://res.cloudinary.com/dqsbh2kn0/image/upload/v1655178762/samples/ecommerce/leather-bag-gray.jpg" 
            alt="" 
            className='object-cover rounded-xl transform hover:scale-105 duration-200 w-full sm:w-48' />
            <div className='p-6 md:p-12' >
              <h2 className='font-serif text-xl font-medium text-center md:text-left'>
                Get Clothes
              </h2>
              <p className='max-w-xs my-4 text-xs leading-5 tracking-wide text-center md:text-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quaerat repellat accusamus qui laboriosam? Nihil aut nobis aperiam alias! Optio, fugit. Officia illum tempore similique, ipsa eveniet odio eius ipsum.
              </p>
              <div className='flex flex-col md:flex-row mt-5 space-x-0 md:space-x-3 space-y-3 md:space-y-0'>
                <input type="text" placeholder='Enter Your Email' className='p-2 px-4 text-center border border-gray-300 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none' />
                <button className=' bg-lime-500 px-5 py-3 text-md text-white hover:bg-lime-700 rounded-md duration-500' >Subscribe</button>
              </div>
            </div>
          </div>
          
        </div>
          
      </div> */}
      <Hero />
    </Fragment>
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutPages>
      {page}
    </LayoutPages>
  )
}
