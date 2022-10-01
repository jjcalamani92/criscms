/* eslint-disable react/no-children-prop */
/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { classNames, getQuery } from '../../../utils/function'

// import { Modal } from '../modal'

// import { SiteForm } from '../form/siteForm'
// import { ProductForm } from '../form/productForm'
// import { PageForm } from '../form/pageForm'
import { useRouter } from 'next/router'
import { Page, Site } from '../../../interfaces'
import { Button, Text } from '../polymorphic'
import { Modal } from '../utils'
import { SiteForm } from '../form'
import { TabFormPage, TabFormSite } from '../tabs'
import { StringDecoder } from 'string_decoder'
// import { Text } from '../../polymorphic/text'
// import { Button } from '../../polymorphic/button'



interface HeadingDashboard {
  title: string
  page?: Page
  site?: Site
}
export const HeadingDashboard: FC<HeadingDashboard> = ({ title, page, site }) => {
  const { asPath } = useRouter()
  const query = getQuery(asPath)
  const [openMCD, setOpenMCD] = useState(false)
  const [children, setChildren] = useState<any>()




  const editHandle = (type: string) => {
    if (type === "site") {
      setOpenMCD(true)
      setChildren(<TabFormSite setOpenMCD={setOpenMCD} site={site} />)
    } else if (type === "page") {
      setOpenMCD(true)
      setChildren(<TabFormPage setOpenMCD={setOpenMCD} page={page} type={page?.data.type}/>)
    }
  }
  const addHandle = (type: string) => {
    if (type === 'site') {
      setOpenMCD(true)
      setChildren(<TabFormSite setOpenMCD={setOpenMCD} />)
    }
    else if (type === 'page') {
      setOpenMCD(true)
      setChildren(<TabFormPage setOpenMCD={setOpenMCD} type={site ? site?.data.type : page?.data.type} uid={site ? site?._id : page?._id}/>)
    }
    else if (type === 'product') {
      setOpenMCD(true)
      // setChildren(<ProductForm />)
    }
    else if (type === 'article') {
      console.log('article add');

      // setOpenMCD(true)
      // setChildren(<ProductForm />)
    }
  }
  return (
    <div className="flex lg:items-center lg:justify-between py-6 sm:py-10">
      <div className="min-w-0 flex-1">
        <div className='flex'>
          <Text as="h2" className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{title}</Text>
          
          {
            site &&
            <span className="hidden sm:block ml-3">
              <Button className="btn-default" onClick={() => editHandle('site')}>
                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                Edit
              </Button>
            </span>
          }
          {
            page &&
            <span className="hidden sm:block ml-3">
              <Button className="btn-default" onClick={() => editHandle('page')}>
                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                Edit
              </Button>
            </span>
          }
        </div>
        
      </div>
      <div className="flex lg:mt-0 lg:ml-4">



        {
          query.length > 2 &&
          <>
            {
              query.length > 3 &&
              <>

                {
                  page?.data.type === 'blog' &&
                  <span className="sm:ml-3 hidden sm:block">
                    <Button className="btn-primary" onClick={() => addHandle('blog')}>
                      {/* <BlockOutlined className='mr-2' style={{ fontSize: '20px' }} /> */}
                      Add Blog
                    </Button>

                  </span>}
                <span className="sm:ml-3 hidden sm:block">
                  <Button className="btn-primary" onClick={() => addHandle('product')}>
                    {/* <AppstoreAddOutlined className='mr-2' style={{ fontSize: '20px' }} /> */}
                    Add Product
                  </Button>

                </span>
              </>
            }
            <span className="sm:ml-3">
              <Button className="btn-primary" onClick={() => addHandle('page')}>
                {/* <FileAddOutlined className='mr-2' style={{ fontSize: '20px' }} /> */}
                Add Page
              </Button>

            </span>
          </>
        }
        {
          query.length === 2 &&
          <span className="sm:ml-3 hidden sm:block">
            <Button className="btn-primary" onClick={() => addHandle('site')}>
              Add Site
            </Button>
          </span>
        }

        

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    View
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Modal openMCD={openMCD} setOpenMCD={setOpenMCD} children={children} />
    </div>
  )
}