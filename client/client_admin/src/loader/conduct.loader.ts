import { useMutation, useQuery } from "react-query";

import { AxiosRequestConfig } from "axios";
import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "~/lib/react-query";
import { getConductOfClass, updateConducts } from "~/service/conduct.service";
import { CACHE } from "./cache";

const useGetConductsOfClass = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof getConductOfClass>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getConductOfClass>>({
    ...config,
    queryKey: [CACHE.CONDUCT, params],
    queryFn: () => getConductOfClass(params),
  });
};

const useUpdateConducts = ({
  config,
}: {
  config?: MutationConfig<typeof updateConducts>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateConducts,
  });
};

export { useGetConductsOfClass, useUpdateConducts };
