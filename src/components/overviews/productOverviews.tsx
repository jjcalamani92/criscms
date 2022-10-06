import { useRouter } from 'next/router'
import React from 'react'
import { ProductEngine, ProductWear } from '..'
import { useProduct } from '../../hooks'

export const ProductOverviews = () => {
  const { asPath } = useRouter()
  const { data: product } = useProduct(asPath)
  switch (product?.type) {
    case "engine": return <ProductEngine product={product} />;
    case "clothing": return <ProductWear product={product} />;
    case "backpacks": return <ProductWear product={product} />;
    case "handbags": return <ProductWear product={product} />;
    case "hardware-store": return <ProductWear product={product} />;
    case "glasses": return <ProductWear product={product} />;
    case "furniture": return <ProductWear product={product} />;
    default:
      return null
  }
  
}
