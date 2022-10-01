import {  gql } from 'graphql-request'
import { SITE_FRAGMENT } from '../fragment/site.fragment';

export const CREATE_SITE = gql`
  mutation CreateSite($input: CreateSite!) {
    createSite(input: $input) {
			_id
      data{
        seo{
          title
        }
      }
    }
  }
`;
export const UPDATE_SITE = gql`
  mutation UpdateSite($id: ID!, $input: UpdateSite!) {
    updateSite(id: $id, input: $input) {
			_id
      data{
        name
        description
        type
        seo{
          title
        }
      }
      url
    }
  }
`;
export const DELETE_SITE = gql`
  mutation DeleteSite($id: ID!) {
    deleteSite(id: $id) 
  }
`;