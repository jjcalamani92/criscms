import Link from "next/link"
import { FC } from "react";
import Image from "next/image";
import { Page } from "../../../interfaces";
import Swal from 'sweetalert2';
import { useDeletePage2 } from "../../hooks";
interface CardPage2 {
  page?:  Page
  
}
export const CardPage2: FC<CardPage2> = ({ page }) => {
  
  const { mutate: deletePage2 } = useDeletePage2(page?.parent!)
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
        deletePage2(id)
			}
		})
  }
  return (
    <div className="max-w-xs rounded-md shadow-lg bg-gray-50 text-gray-800">
      <Link href={`/dashboard/sites/${page?.site}/page2=${page?._id}`}>
        <a>
          <Image
            width={400}
            height={400}
            src={"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"}
            alt={"description image"}
          />
          <div className="flex flex-col justify-between px-4 space-y-8">
            <div className="space-y-2">
              <h2 className=" text-sm tracking-wide">{page?.data.seo.title }</h2>
            </div>
          </div>
        </a>
      </Link>
      <div className="flex flex-col justify-between p-4 space-y-8">
        <button className="justify-center btn-primary"
        onClick={() => onDelete(page?._id!)}
        >
          Delete
        </button>
        
      </div>
    </div>
  )
}