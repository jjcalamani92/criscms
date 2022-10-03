import { gql } from "graphql-request";

export const FIND_SITES = gql`
  query FindSites {
    findSites {
      _id
      data{
        seo{
          title
        }
      }
    }
  }
`;

export const FIND_SITE = gql`
  query FindSite($id: ID!) {
    findSite(id: $id) {
      _id
      data{
        name
        description
        type
        seo{
          title
          description
        }
        dataBase{
          uid
          label
          value
        }
        image{
          src
          alt
        }
        logo{
          src
          alt
        }
        icon{
          src
          alt
        }
      }
      client
      url
    }
  }
`;
