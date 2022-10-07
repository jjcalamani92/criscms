import Link from "next/link"
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Page, Product, Site } from "../../../interfaces";
import Swal from 'sweetalert2';
import { useDeleteProduct, useDeleteSite } from "../../hooks";
import { useForm } from 'react-hook-form';
interface CardProduct {
  product?: Product
  select: string[]
  setSelect: React.Dispatch<React.SetStateAction<string[]>>
}

export const CardProduct: FC<CardProduct> = ({ product, select, setSelect }) => {
  const [check, setCheck] = useState(false)
  console.log(check, product?.data.name)
  useEffect(() => {
    if (select.length === 0) {
      setCheck(false)
    }
  }, [select])
  
  const { mutate: deleteProduct } = useDeleteProduct(product?.parent!)
  const onSelect = ( id:string) => {
    const uid = select.find(data => data === id)
    if (uid) {
      setSelect(select.filter(data => data !== id))
    } else {
      setSelect([...select, id])
    }
  } 
  

  const onDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        deleteProduct({ id: id, type: product?.type! })
      }
    })
  }

  return (
    <div className="max-w-xs rounded-md shadow hover:shadow-2xl transition ease-in-out delay-150 bg-gray-50 text-gray-800 relative">

        <form className="flex h-5 items-center absolute z-10 top-2 left-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            // {...register("_id")}
            onClick={() => onSelect(product?._id!)}
            onChange={(e) => setCheck(!check)}  
            // value={check as any}
            checked={check}
            // defaultChecked={check}
            
          />
        </form>
      <Link href={`/dashboard/sites/${product?.site}/product/${product?.type}=${product?._id}`}>
        <a>
          <Image
            width={400}
            height={400}
            src={product?.data.seo.image.src!}
            alt={product?.data.seo.image.alt!}
          />
          <div className="flex flex-col justify-between px-4 space-y-8 mb-2">
            <div className="space-y-2">
              <h2 className=" text-sm tracking-wide">{product?.data.seo.title}</h2>
            </div>
          </div>
        </a>
      </Link>
      {/* <div className="flex flex-col justify-between p-4 space-y-8">
        <button className="justify-center btn-primary"
          onClick={() => onDelete(product?._id!)}
        >
          Delete
        </button>

      </div> */}
    </div>
  )
}