import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { classNames, getQuery, typeSite } from '../../../utils';
import { useSession } from 'next-auth/react';

import Swal from 'sweetalert2';
import { Site } from '../../../interfaces';
import { useCreateSite, useUpdateSite } from '../../hooks';
interface SiteForm {
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  site?: Site
}
interface FormValues {
  name: string;
  domain: string;
  description: string;
  type: string;
  client: string;
};
export const SiteForm: FC<SiteForm> = ({ setOpenMCD, site }) => {
  const { asPath, replace } = useRouter()
  const query = getQuery(asPath)
  // console.log(site);

  const { mutate: createSite } = useCreateSite()
  const { mutate: updateSite } = useUpdateSite()
  const { data: session } = useSession()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({ mode: "onChange", defaultValues: site ? { name: site?.data.name, domain: site?.url, description: site?.data.description, type: site?.data.type, client: site.client } : {name: "", domain: ".vercel.app", description: "site description", type: "ecommerce", client: "Jesus Calamani"} });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = { ...data, name: data.name.trim(), domain: data.domain.trim(), description: data.description.trim(), change: "change", uid: session?.user.sid! }
    const {client, ...updateForm} = form;
    const createForm = { ...form, client: data.client?.trim() }
// console.log('created', createForm);

    if (site) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Site',
        showConfirmButton: false,
        timer: 1000
      })
      // console.log(updateForm, site._id);
      
      updateSite({ id: site._id, input: updateForm })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Created Site',
        showConfirmButton: false,
        timer: 1000
      }),
        createSite(createForm)
    }
    setOpenMCD(false)


  }

  const cancelButtonRef = useRef(null)
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden sm:rounded-md">
          <div className="px-5">
            {/* <div className="text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {
                  site ? 'Update Site' : 'New Site'
                }
              </h3>
            </div> */}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  {...register("name", {
                    required: 'Name required!!',
                    minLength: {value: 2, message: 'min 2 characters'}
                  })}
                  
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  
                />
                {errors.name && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
              <div className="col-span-6">
                <label
                  // htmlFor="company-website" 
                  className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                    http://
                  </span>
                  <input
                    type="text"
                    // name="company-website"
                    // id="company-website"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="example.com"
                    {...register("domain")}

                  />
                </div>
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    // id="about"
                    // name="about"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    // placeholder="you@example.com"
                    // defaultValue={''}
                    {...register("description")}
                  />
                </div>
                {/* <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile. URLs are hyperlinked.
                </p> */}
              </div>
              
              {
                query.length === 2 &&
                <div className="col-span-6">
                  <label
                    className="block text-sm font-medium text-gray-700">
                    Client name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    {...register("client")}
                  />
                </div>
              }

              <div className="col-span-6">
                <fieldset>
                  <legend className="contents text-sm font-medium text-gray-700">Type </legend>
                  {/* <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p> */}
                  <div className=" grid grid-cols-2 ">
                    {
                      typeSite.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            // onBlur={onBlur} 
                            {...register('type')}
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          // {...register("type", {required:true, onChange: (e) => {setValue("type", e.target.value, {shouldValidate: true});}, onBlur: (e) => {},})}
                          />
                          {/* {errors.type && <p>This is required</p>} */}
                          <label className="ml-3 block text-sm text-gray-500">
                            {data.label}
                          </label>
                        </div>)
                      )
                    }

                  </div>
                </fieldset>
              </div>


            </div>
          </div>

        </div>
        <div className="bg-gray-50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-4">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          // onClick={() => setOpen(false)}
          >
            {site ? 'Update' : 'Created'}
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