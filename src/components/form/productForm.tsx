import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Product } from '../../../interfaces';
import { getQuery } from '../../../utils';
import { useCreateProduct, useUpdateProduct } from '../../hooks';


interface FormValues {
  name: string;
  mark: string;
  featured: string;
  description: string;
  price: number;
  discountPrice: number;
  inStock: number;
};
interface ProductForm {
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  uid?: string
  type?: string
  product?: Product
}
export const ProductForm:FC<ProductForm> = ({setOpenMCD, uid, type, product}) => {
  const { data: session } = useSession()
  // console.log(product);
  
  
  const { asPath } = useRouter()
  const query = getQuery(asPath)
  
  const { register, handleSubmit,  formState: { errors }, setValue  } = useForm<FormValues>({defaultValues: product ? {name: product.data.name, mark: product.data.mark, featured: product.data.featured.href, description: product.data.description, price: product.data.price, discountPrice: product.data.discountPrice, inStock: product.data.inStock} : {name: "", mark: 'none', featured:'none', description: 'product description', price: 0, discountPrice:0, inStock:1}});
  
  const {mutate: createProduct} = useCreateProduct(uid!)
  const {mutate: updateProduct} = useUpdateProduct()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateForm ={...data, name: data.name.trim(), price: Number(data.price), discountPrice: Number(data.discountPrice), inStock: Number(data.inStock), uid: session?.user.sid!, change: "create product" }
    const form = {...updateForm, site: query[2], parent: uid!}
    if (product) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Product',
        showConfirmButton: false,
        timer: 1000
      })
      updateProduct({id: product._id, input: updateForm, type: product.type})
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Created Product',
        showConfirmButton: false,
        timer: 500
      })
      createProduct({input:form, type:type!})

    }
    setOpenMCD(false)
  };
  const cancelButtonRef = useRef(null)

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="px-5 pb-5">
          {/* <div className="text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                { product ? "Edit Product" :"New Product"}
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register("name", {
                    required: 'Name required!!',
                    minLength: {value: 2, message: 'min 2 characters'}
                  })}
                />
                {errors.name && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Mark
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                  {...register("mark", {
                    required: "Mark required!!"
                  })}
                >
                  <option value="none" >None</option>
                  <option value="cris" >Cris</option>
                  <option value="terra" >Terra</option>
                </select>
                {errors.mark && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Featured
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                  {...register("featured", {
                    required: "Featured required!!"
                  })}
                >
                  <option value="none" >None</option>
                  <option value="dos-por-uno" >Dos por Uno</option>
                  <option value="descuentos-de-julio" >Descuentos de Julio</option>
                </select>
                {errors.featured && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
              
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    {...register("description", {
                      required: "Description required!!"
                    })}
                  />
                  {errors.description && <p className='text-red-600 text-sm'>This is required!!</p>}
                </div>
              </div>
              
              <div className="col-span-3 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price [Bs]
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register("price", { required :"Price required!!", min:0})}
                />
                {errors.price && <p className='text-red-600 text-sm'>This is required!!</p>}

              </div>
              <div className="col-span-3 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Discount price [Bs]
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register("discountPrice", { required :"Discount price required!!", min:0})}
                />
                {errors.discountPrice && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
              <div className="col-span-3 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Stock [#]
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register("inStock", { required :"Stock required!!", min:1})}
                />
                {errors.inStock && <p className='text-red-600 text-sm'>This is required!!</p>}
              </div>
            </div>
          </div>
          
        </div>
        <div className="bg-gray-50 p-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {product ? "Update" : "Create"}
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