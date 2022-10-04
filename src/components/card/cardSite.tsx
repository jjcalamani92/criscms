import Link from "next/link"
import { FC } from "react";
import Image from "next/image";
import Swal from 'sweetalert2';
import { Page, Site } from "../../../interfaces";
import { useDeleteSite } from "../../hooks";
interface CardSite {
  site?: Site
}
export const CardSite: FC<CardSite> = ({ site }) => {
  // console.log(site);

  const { mutate: deleteSite } = useDeleteSite()
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
        deleteSite(id)
      }
    })
  }
  return (
    <div className="max-w-xs rounded-md shadow hover:shadow-2xl transition  delay-200 bg-gray-50 text-gray-800">
      <Link href={`/dashboard/sites/${site?._id}`}>
        <a>
          <Image
            width={400}
            height={400}
            src={site?.data.seo.image.src!}
            alt={site?.data.seo.image.alt!}
            objectFit="cover"
          />
          <div className="flex flex-col justify-between px-4 space-y-8">
            <div className="space-y-2">
              <h2 className=" text-sm tracking-wide">{site?.data.seo.title}</h2>
            </div>
          </div>
        </a>
      </Link>
      <div className="flex flex-col justify-between p-4 space-y-8">
        <button className="justify-center btn-primary" onClick={() => onDelete(site?._id!)}>
          Delete
        </button>

      </div>
    </div>
  )
}