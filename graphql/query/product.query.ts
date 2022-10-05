import { gql } from "graphql-request";

export const FIND_PRODUCTS_BY_PARENT = gql`
  query FindProductsByParent($parentId: String!, $type: String!) {
    findProductsByParent(parentId: $parentId, type: $type) {
      _id
      data {
        name
        slug
        mark
        inStock
        price
        discountPrice
        description
      }
    }
  }
`;
export const FIND_ALL_PRODUCTS_BY_PARENT = gql`
  query FindAllProductsByParent($parentId: String!) {
    findAllProductsByParent(parentId: $parentId) {
      _id
      site
      parent
      type
      data {
        name
        slug
        mark
        inStock
        price
        discountPrice
        description
        seo {
          title
          description
          image{
            src
            alt
          }
        }
        image {
          uid
          src
          alt
        }
      }
    }
  }
`;
export const FIND_ALL_PRODUCTS = gql`
  query FindAllProducts {
    findAllProducts {
      _id
      site
      type
      data{
        seo{
          title
          description
          
        }
      }
    }
  }
`;
export const FIND_PRODUCT = gql`
  query FindProduct($id: ID!, $type: String!) {
    findProduct(id: $id, type: $type) {
      _id
      type
      data {
        name
        slug
        mark
        inStock
        price
        discountPrice
        description
        featured{
          name
          href
        }
        image {
          src
          alt
        }
        seo{
          title
          href
          description
          image{
            src
            alt
          }
        }
      }
    }
  }
`;
