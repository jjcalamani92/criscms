import Link from "next/link"
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Page, Product, Site } from "../../../interfaces";
import { useLongPress } from 'react-use';

interface CardProduct {
  product?: Product
  select?: string[]
  setSelect?: React.Dispatch<React.SetStateAction<string[]>> | any
}

export const CardProduct: FC<CardProduct> = ({ product, select, setSelect }) => {
  const [check, setCheck] = useState(false)
  const onLongPress = () => {
    setCheck(true)
    console.log('calls callback after long pressing 300ms');
  };

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  useEffect(() => {
    if (select!.length === 0) {
      setCheck(false)
    }
  }, [select])
  
  const onSelect = ( id:string) => {
    const uid = select!.find(data => data === id)
    if (uid) {
      setSelect(select!.filter(data => data !== id))
    } else {
      setSelect([...select!, id])
    }
  } 
  

  
  return (
    <div {...longPressEvent} className="group max-w-xs rounded-md shadow hover:shadow-2xl transition ease-in-out delay-150 bg-gray-50 text-gray-800 relative">

        <div className={`flex p-1 items-center absolute z-10 top-2 left-2 opacity-0 ${(select?.length !== 0 || check) && "opacity-100"} group-hover:opacity-100  group-hover:transition-all transition ease-in-out delay-150`}>
          <input
            type="checkbox"
            className="h-5 w-5  rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onClick={() => onSelect(product?._id!)}
            onChange={(e) => setCheck(!check)}  
            checked={check}
            
          />
        </div>
      <Link href={`/dashboard/sites/${product?.site}/product/${product?.type}=${product?._id}`}>
        <a>
          <Image
            width={400}
            height={400}
            src={product?.data.seo.image.src!}
            alt={product?.data.seo.image.alt!}
          />
          <div className="flex flex-col justify-between px-4 my-3">
            <div className="">
              <h2 className=" text-sm tracking-wide truncate">{product?.data.seo.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}