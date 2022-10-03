import { RadioGroup } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useRef, useState } from 'react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import { DataBase, Site } from '../../../../interfaces';
import { typePageEcommerceCategory } from '../../../../utils';

import { classNames, getQuery } from '../../../../utils/function';
import { useUpdateSiteDB } from '../../../hooks';
import { Alert } from '../../tailwindComponents';


interface FormValues {
  value: string[];
};
interface DataBaseForm {
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  site?: Site
}
export const DataBaseForm: FC<DataBaseForm> = ({ setOpenMCD, site }) => {
  // console.log(site);

  const { asPath, replace } = useRouter()
  const query = getQuery(asPath)
  const { mutate: updateSiteDB } = useUpdateSiteDB()

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { value: site?.data.dataBase.map(data => data.value) } });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateFormDB = data.value.map(data => ({ type: data }))
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Data Base',
      showConfirmButton: false,
      timer: 1000
    })
    updateSiteDB({ id: site?._id!, input: updateFormDB })
    setOpenMCD(false)
  };
  const cancelButtonRef = useRef(null)
  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-5 pb-5">
            <div className=" text-center sm:mt-0 sm:text-left">
              {/* <h3 className="text-lg font-medium leading-6 text-gray-900">
                More Options
              </h3> */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {' '}
                          {color.name}{' '}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}
              {/* <Alert /> */}
              <div className="grid grid-cols-2 mt-4 gap-3">
                {
                  typePageEcommerceCategory.map(data =>
                  (<div key={data.value} className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        value={data.value}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        {...register("value", {
                          required: 'Title required!!'
                        })}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700">
                        {data.label}
                      </label>
                      <p className="text-gray-500">{data.categories}</p>
                    </div>
                  </div>)
                  )
                }


              </div>
            </div>

          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          // onClick={() => setOpen(false)}
          >
            Update DB
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