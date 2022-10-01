import { useQuery } from "@tanstack/react-query";
import { ParsedUrlQuery } from "querystring";
import { FIND_PAGES_0, FIND_PAGE_0_BY_PARENT, graphQLClient } from "../../../../graphql";
import { Page } from "../../../../interfaces";



export const findPages0 = async () => {
  const { findPages0 } = await graphQLClient.request(FIND_PAGES_0);
  return findPages0;
};

export function usePages0() {
  return useQuery<[Page]>(["find-pages0"], () => findPages0());
}
