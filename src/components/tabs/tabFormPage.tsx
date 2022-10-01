import { FC, useState } from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from '../../../utils/function'
import { PageForm, SiteForm } from '../form'
import { Page, Site } from '../../../interfaces'
interface TabFormPage {
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  page?: Page
  type?: string 
  uid?: string
}

export const TabFormPage:FC<TabFormPage> = ({setOpenMCD, page, type, uid}) => {

  return (
    <div className="w-full max-w-lg">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-white p-3">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-indigo-900 hover:bg-white/[0.12] '
              )
            }
          >
            New Page
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-900 hover:bg-white/[0.12] '
              )
            }
          >
            Seo
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-900 hover:bg-white/[0.12] '
              )
            }
          >
            More
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white'
            )}
          >
            <PageForm setOpenMCD={setOpenMCD} type={type} uid={uid} page={page}/>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white'
            )}
          >
            <h1>2</h1>

          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white'
            )}
          >
            <h1>2</h1>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}