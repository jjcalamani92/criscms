import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_SITE, graphQLClient, UPDATE_SITE, UPDATE_SITE_DB } from "../../../graphql";
import { Site, UpdateSiteDB } from "../../../interfaces";


export const useUpdateSiteDB = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({id, input}:UpdateSiteDB) => {
      const { updateDataBase } = await graphQLClient.request(UPDATE_SITE_DB, {
        id,
        input
      });
      return updateDataBase;
    },
    {
      onSuccess: async (updateDataBase, {id, input}) => {
        queryClient.setQueryData<Site>(['find-site', id], updateDataBase);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
