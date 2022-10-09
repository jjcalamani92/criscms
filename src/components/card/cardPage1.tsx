import Link from "next/link"
import { FC, useRef } from "react";
import Image from "next/image";
import { Page } from "../../../interfaces";
import Swal from 'sweetalert2';
import { useDeletePage1 } from "../../hooks";
import { useRouter } from "next/router";
import { useLongPress } from "ahooks";
interface CardPage1 {
  page?: Page
  checked: boolean
  partiallySelected: boolean
  toggle: () => void
}
export const CardPage1: FC<CardPage1> = ({ page, checked, partiallySelected, toggle }) => {
  const { push } = useRouter()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(toggle, ref, {
    onClick: (e) => { push(`/dashboard/sites/${page?.site}/page1=${page?._id}`); e.stopPropagation() },
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
      <div ref={ref}>
        <img
          className="h-[12rem] w-full object-cover"
          src={page?.data.seo.image.src!}
          alt={page?.data.seo.image.alt!}
        />

        <div className="flex items-center h-[3rem] mx-2">

          <h2 className=" text-sm tracking-wide truncate">{page?.data.seo.title}</h2>

        </div>
      </div>


    </div>
  )
}