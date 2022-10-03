import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphQLClient, UPDATE_SITE_IMAGE } from "../../../graphql";
import { Site, UpdateSiteImage } from "../../../interfaces";


export const useUpdateSiteImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({id, input, type, uid}:UpdateSiteImage) => {
      const { updateSiteImage } = await graphQLClient.request(UPDATE_SITE_IMAGE, {
        id,
        input,
        type,
        uid,
      });
      return updateSiteImage;
    },
    {
      onSuccess: async (updateSiteImage, {id, input, type}) => {
        queryClient.setQueryData<Site>(['find-site', id], updateSiteImage);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
