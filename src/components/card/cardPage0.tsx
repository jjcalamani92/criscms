import Link from "next/link"
import { FC, useRef } from "react";
import Image from "next/image";
import { Page } from "../../../interfaces";
import Swal from 'sweetalert2';
import { useDeletePage0 } from "../../hooks";
import { useRouter } from "next/router";
import { useLongPress } from "ahooks";
interface CardPage0 {
  page?: Page
  checked: boolean
  partiallySelected: boolean
  toggle: () => void
}
export const CardPage0: FC<CardPage0> = ({ page, checked, partiallySelected, toggle }) => {
  const { push } = useRouter()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(toggle, ref, {
    moveThreshold: { x: 5, y: 5 },

    // onClick: (e) => { push(`/dashboard/sites/${page?.site}/page0=${page?._id}`); e.stopPropagation() },
  },);
  return (
    <div className="group relative max-w-xs rounded-md shadow hover:shadow-2xl transition-all z-0  delay-150  bg-gray-100 text-gray-800">
      <input
        type="checkbox"
        className={`h-5 w-5 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 absolute  top-2 left-2 z-100 opacity-0 ${partiallySelected && "opacity-100"} group-hover:opacity-100 transition ease-in-out delay-150`}
        onChange={() => toggle}
        checked={checked}
        onClick={toggle}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={page?.data.seo.image.src!}
          alt={page?.data.seo.image.alt!}
        />

        <Link href={`/dashboard/sites/${page?.site}/page0=${page?._id}`}>
          <a className="flex items-center h-[3rem] mx-2 cursor-pointer">
            <h2 className=" text-sm tracking-wide truncate">{page?.data.seo.title}</h2>

          </a>
        </Link>
      </div>


    </div>
  )
}