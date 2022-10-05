import Link from "next/link"
import { FC } from "react";
import Image from "next/image";
import { Page, Product, Site } from "../../../interfaces";
import Swal from 'sweetalert2';
import { useDeleteProduct, useDeleteSite } from "../../hooks";
interface CardProduct {
  product?: Product 
  
}
export const CardProduct: FC<CardProduct> = ({ product }) => {
  const { mutate: deleteProduct } = useDeleteProduct(product?.parent!)
  // console.log(product?.data.seo.image.src);
  
  const onDelete = (id:string) => {
    Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then( async (result) => {
			if (result.isConfirmed ) {
				Swal.fire({ 
						title: 'Deleted!',
						text: 'Your file has been deleted.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					})
          deleteProduct({id: id, type: product?.type!})
			}
		})
  }
  return (
    <div className="max-w-xs rounded-md shadow hover:shadow-2xl transition ease-in-out delay-150 bg-gray-50 text-gray-800">
      <Link href={`/dashboard/sites/${product?.site}/product/${product?.type}=${product?._id}`}>
        <a>
          <Image
            width={400}
            height={400}
            src={product?.data.seo.image.src!}
            alt={product?.data.seo.image.alt!}
          />
          <div className="flex flex-col justify-between px-4 space-y-8">
            <div className="space-y-2">
              <h2 className=" text-sm tracking-wide">{product?.data.seo.title }</h2>
            </div>
          </div>
        </a>
      </Link>
      <div className="flex flex-col justify-between p-4 space-y-8">
        <button className="justify-center btn-primary"
        onClick={() => onDelete(product?._id!)}
        >
          Delete
        </button>
        
      </div>
    </div>
  )
}