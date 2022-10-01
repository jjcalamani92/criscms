import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../../../graphql/graphQLClient";
import { FIND_SITES } from "../../../graphql/query/site.query";
import { Site } from "../../../interfaces/site.interface";



export const findSites = async () => {
  const { findSites } = await graphQLClient.request(FIND_SITES);
  return findSites;
};

export function useSites() {
  return useQuery<[Site]>(["find-sites"], () => findSites());
}
