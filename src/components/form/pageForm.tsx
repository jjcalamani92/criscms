
import { useRouter } from 'next/router';
import { FC, Fragment, useRef, useState } from 'react';
import { useForm, Resolver, SubmitHandler, PathString } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Page } from '../../../interfaces';
import { getQuery, typePageEcommerce, typePageMarketing, typePagePortfolio } from '../../../utils';
import { useCreatePage0, useCreatePage1, useCreatePage2, useSite, useUpdatePage0, useUpdatePage2 } from '../../hooks';
import { useUpdatePage1 } from '../../hooks/page/page1/useUpdatePage1';


interface PageForm {
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  uid?: string
  page?: Page
  type?: string
}

export interface Page0 {
  title: string;
  description: string;
  site: string;
  parent: string;
  type: string;

}

interface FormValues {
  title: string;
  description: string;
  type: string;
};

export const PageForm: FC<PageForm> = ({ setOpenMCD, uid, page, type }) => {
  const { asPath, replace } = useRouter()
  const query = getQuery(asPath)
  const { data:site } = useSite(asPath)
  // console.log(query);
  // console.log(page);
  
  
  const { mutate: createPage0 } = useCreatePage0()
  const { mutate: updatePage0 } = useUpdatePage0()
  const { mutate: createPage1 } = useCreatePage1()
  const { mutate: updatePage1 } = useUpdatePage1()
  const { mutate: createPage2 } = useCreatePage2()
  const { mutate: updatePage2 } = useUpdatePage2()
  const [radio, setRadio] = useState('')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({ mode: "onChange", defaultValues: page ? { title: page?.data.seo.title, description: page?.data.seo.description, type: page?.data.type } : {title: "", description: "page description", type: ''} });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = { ...data, title: data.title.trim(), description: data.description.trim(), site: query[2], parent: uid! }
    const formUpdate = { ...data }
    
    
    if (page) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Page',
        showConfirmButton: false,
        timer: 1000
      })
      if (query.length === 4 && query.at(-1)?.split('=')[0] === 'page1') {
        updatePage1({ id: page._id, input: formUpdate })
      } else if(query.length === 4 && query.at(-1)?.split('=')[0] === 'page0') {
        updatePage0({ id: page._id, input: formUpdate })
      }
      // if (query.length === 6) { updatePage2({ id: page._id, input: formUpdate }) }
      // else if (query.length === 5) { updatePage1({ id: page._id, input: formUpdate }) }
      // else if (query.length === 4) { updatePage0({ id: page._id, input: formUpdate }) }
      // replace(getURL(asPath))
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Created Page',
        showConfirmButton: false,
        timer: 1000
      })
      if (query.length === 4 && query.at(-1)?.split('=')[0] === 'page1') {
        createPage2(form)
        
      } else if (query.length === 4 && query.at(-1)?.split('=')[0] === 'page0') {
        createPage1(form)
        
      } else if(query.length === 3 ) {
        createPage0(form)
      }
      // if (query.length === 5) { createPage2(form) }
      // else if (query.length === 4) { createPage1(form) }
      // else if (query.length === 3) { createPage0(form) }
    }
    setOpenMCD(false)
  }
  const cancelButtonRef = useRef(null)

  // const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="px-5">
            {/* <div className="text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-3">
                {page ? 'Update Page' : 'New Page'}
              </h3>
            </div> */}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register("title", {
                    required: 'Title required!!',
                    minLength: {value: 2, message: 'min 2 characters'}
                  })}
                  
                  />
                  {errors.title && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    
                    {...register("description", {
                      required: 'Title required!!',
                      minLength: {value: 2, message: 'min 2 characters'}
                    })}
                  />
                  {errors.description && <p className='text-red-600 text-sm'>This is required!!</p>}

                </div>
                
              </div>


              <div className="col-span-6">
                <h2 className="contents text-sm font-medium text-gray-700">Type </h2>
                <div className="grid grid-cols-2">
                  {
                    page ?
                    <>
                    {
                      type === 'page' &&
                      (typePageEcommerce.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            {...register('type', { required: true })}
                            name="type"
                            id={data.value}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}

                            
                            />
                          <label className="ml-3 block text-sm text-gray-500">
                            {data.label}
                          </label>
                          {/* {errors.type && <p>This is required</p>} */}
                        </div>)
                      )
                      
                      )
                    }
                    {
                      type === 'category' &&
                      (typePageEcommerce.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            {...register('type', { required: true })}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}

                            
                            />
                          <label className="ml-3 block text-sm text-gray-500">
                            {data.label}
                          </label>
                        </div>)
                      )
                      )
                      
                    }
                    {
                      site?.data.dataBase.map(data => data.value).includes(page?.data.type!) &&
                      (site?.data.dataBase.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            {...register('type', { required: true })}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}

                            
                            />
                          <label className="ml-3 block text-sm text-gray-700">
                            {data.label}
                          </label>
                        </div>)
                      )
                      )
                      
                    }
                    {
                      type === 'article' &&
                      (typePagePortfolio.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            {...register('type', { required: true })}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}

                            
                            />
                          <label className="ml-3 block text-sm text-gray-700">
                            {data.label}
                          </label>
                        </div>)
                      )
                      )
                      
                    }
                    {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}
                    </>
                    :
                    <>
                    {
                      type === 'ecommerce' &&
                      <>
                        {typePageEcommerce.map(data => (
                          <div className="flex items-center my-2" key={data.label}>
                            <input
                              type="radio"
                              value={data.value}
                              // onBlur={onBlur} 
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                              // onChange={() => setRadio(data.value)}
                              
                              />
                            <label className="ml-3 block text-sm text-gray-500">
                              {data.label}
                            </label>
                          </div>)
                        )}
                        {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}

                      </>
                    }
                    {
                      type === 'portfolio' &&
                      <>
                        {typePagePortfolio.map(data => (
                          <div className="flex items-center my-2" key={data.label}>
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                              
                              />
                            <label className="ml-3 block text-sm text-gray-500">
                              {data.label}
                            </label>
                          </div>)
                        )}
                        {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}


                      </>
                    }
                    {
                      type === 'marketing' &&
                      <>
                        {typePageMarketing.map(data => (
                          <div className="flex items-center" key={data.label}>
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                              
                              />
                            <label className="ml-3 block text-sm font-medium text-gray-700">
                              {data.label}
                            </label>
                          </div>)
                        )}
                        {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}


                      </>
                    }
                    {
                      type === 'page' &&
                      <>
                        {typePageEcommerce.map(data => (
                          <div className="flex items-center my-2" key={data.label}>
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                              
                              />
                            <label className="ml-3 block text-sm text-gray-500">
                              {data.label}
                            </label>
                          </div>)
                        )}
                        {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}


                      </>
                    }
                    
                    {
                      type === 'category' &&
                      <>
                        {site?.data.dataBase.map(data => (
                          <div className="flex items-center my-2" key={data.label}>
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={() => setRadio(data.value)}
                              />
                            <label className="ml-3 block text-sm text-gray-500">
                              {data.label}
                            </label>
                          </div>)
                        )}
                        {errors.type && <p className='text-red-600 text-sm'>This is required!!</p>}

                      </>
                    }
                    
                    </>
                  }
                  
                </div>
                <fieldset>
                  
                </fieldset>
              </div>
            </div>
          </div>

        </div>
        <div className="bg-gray-50 p-4 sm:flex sm:flex-row-reverse ">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          // onClick={() => setOpen(false)}
          >
            {page ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setOpenMCD(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}