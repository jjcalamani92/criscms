import { useQuery } from "@tanstack/react-query";
import { ParsedUrlQuery } from "querystring";
import { FIND_PAGE_1_BY_PARENT, graphQLClient } from "../../../../graphql";
import { Page } from "../../../../interfaces";
import { getQuery } from "../../../../utils";



export const findPages1ByParent = async (parentId:string) => {
  const { findPages1ByParent } = await graphQLClient.request(FIND_PAGE_1_BY_PARENT, {parentId: parentId});
  return findPages1ByParent;
};

export function usePages1ByParent(asPath: string) {
  const query = getQuery(asPath)
  const parentId = query.at(-1)?.split('=')[1]!
  return useQuery<[Page]>(["find-pages1-by-parent", parentId], () => findPages1ByParent(parentId));
}
