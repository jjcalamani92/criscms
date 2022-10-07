import { Image, Seo } from "./site.interface"

export interface Products {
  clothings?: Product[]
  furnituries?: Product[]
}
export interface Product {
  _id: string
  data: DataProduct
  site: string
  parent: string
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
  promotion: Promotion
}


export interface Promotion {
  name: string;
  href: string;
}
export interface Data {
  type: string;
  seo: Seo;
}
export interface ConnectionArgs {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  // before?: string | null;
  // after?: string | null;
  // first?: number | null;
  // last?: number | null;
}

export interface ListProductResponse{
  page: ProductConnection
  pageData: PageData
}

export interface ProductConnection{
  edges: ProductEdge[]
  pageInfo: ProductPageInfo
}
export interface ProductEdge {
  cursor: string
  node: Product
}
export interface ProductPageInfo {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageData {
  count: number
  limit: number
  offset: number
}

export interface ImageProduct extends Image {}

export interface CreateProduct {
  input:{
    name: string
    mark: string
    description: string
    promotion: string
    inStock: number
    price: number
    discountPrice: number
    site: string
    parent: string
    uid: string
    change: string
  }
  type: string
}
export interface UpdateProduct {
  id:string
  input:{
    name: string
    mark: string
    description: string
    promotion: string
    inStock: number
    price: number
    discountPrice: number
    change: string
    uid: string
  }
  type: string
}
export interface UpdateProductImage {
  id:string
  input: UpdateImage[]
  type: string
  uid: string
}
export interface UpdateImage {
  uid: string
  src: string
  alt: string
}
export interface DeleteProduct {
  id:string
  type: string
}
export interface DeleteManyProductById {
  ids:string[]
  type: string
}