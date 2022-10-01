import { Image, Seo } from "./site.interface"

export interface Products {
  clothings?: Product[]
  furnituries?: Product[]
}
export interface Product {
  _id: string
  data: DataProduct
  site: string
  type: string
  page: string
}
export interface DataProduct {
  name: string;
  slug: string;
  mark: string;
  inStock: number;
  price: number;
  discountPrice: number;
  description: string;
  image: Image[];
  seo: Seo;
  featured: Featured
}

// export interface Page {
//   _id: string;
//   data: Data;
//   // blogs: Blog[];
//   slug: string;
//   page:Page[];
// }

export interface Featured {
  name: string;
  href: string;
}
export interface Data {
  type: string;
  seo: Seo;
}

export interface ImageProduct extends Image {}

export interface CreateProduct {
  type: string
  input:{
    name: string
    mark: string
    description: string
    featured: string
    inStock: number
    price: number
    discountPrice: number
    site: string
    parent: string
  }
}
export interface UpdateProduct {
  id:string
  type: string
  input:{
    name: string
    mark: string
    description: string
    featured: string
    inStock: number
    price: number
    discountPrice: number
  }
}
export interface DeleteProduct {
  id:string
  type: string
}