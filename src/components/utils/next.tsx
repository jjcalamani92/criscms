import Link from 'next/link'
import React, { createRef, FC, forwardRef } from 'react'
import { useRouter } from 'next/router';
interface LinkURL {
  label: string
  href: string
  type: string
}
export const LinkURL:FC<LinkURL> = ({label, href, type}) => {
  let style
  if (type === 'primary') {
    style="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
  } else
  if (type === 'link') {
    style="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
  } else
  if (type === 'a') {
    style="font-medium text-indigo-600 hover:text-indigo-500"
  }
  return (
    <Link href={href}>
      <a className={style}>
        {label}
      </a>
    </Link>
  )
}

interface Button {
  children: React.ReactNode;
}
export const Button:FC<Button> = ({ children, ...restProps}) => {
  return (
    <button {...restProps} >{children}</button>
  )
}
