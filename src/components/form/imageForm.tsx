import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useRef } from 'react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import { graphQLClient, UPDATE_PRODUCT_IMAGE } from '../../../graphql';
import { DataProduct, ImageProduct, Product } from '../../../interfaces';



import { getQuery, uuidv3 } from '../../../utils/function';
import { useUpdateProductImage } from '../../hooks/product/useUpdateProductImage';


interface FormValues {
  // _id:string
  data: DataProduct
  // image: ImageProduct[] ;
};
interface ImageForm {
  toggle: () => void
  setLeft: () => void
  product?: Product
  image?: ImageProduct[]
}
export const ImageForm: FC<ImageForm> = ({ toggle, setLeft, product, image }) => {

  const { data: session } = useSession()

  const { asPath, replace } = useRouter()
  const query = getQuery(asPath)
  
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormValues>({defaultValues: {...product}});
  const {mutate: updateProductImage} = useUpdateProductImage()
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {

  };
  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file )
        formData.append('site', query[2] )

        const { data } = await axios.post(`${process.env.API_URL}/upload/file`, formData)
        setValue('data.image', [...getValues('data.image'), {uid: uuidv3(), src: data.url, alt:`description image of the ${product?.data.name}`}], { shouldValidate: true })
        updateProductImage({id: product?._id!, input: getValues('data.image'), type: product?.type!, uid: session?.user.sid!})

      }
    } catch (error) {
      console.log({ error })
    }
  }
  const cancelButtonRef = useRef(null)

  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            {/* <div className="my-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Update Images
              </h3>
            </div> */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {
                getValues('data.image').map(data => (

                  <div className="flex items-center" key={data.uid}>
                    <div className=" rounded-lg leading-none">
                      <Image
                        // src={getValues('imageSrc')}
                        src={data.src}
                        alt="image"
                        height={200}
                        width={200}
                        objectFit="cover"
                      />
                    </div>
                  </div>
                ))
              }

              {/* <label className="label-form">Cover photo</label> */}
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-3">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-7 w-7 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 flex-col">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 mb-1"
                    >
                      <span>Upload a file</span>

                      <input id="file-upload" name="file-upload" accept=".png, .jpeg, .jpg, .webp" type="file" className="sr-only" onChange={onFileSelected} multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div className="group-button-form">
          
          <button
            className="btn-default"
            type='button'
            onClick={setLeft}
            ref={cancelButtonRef}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}