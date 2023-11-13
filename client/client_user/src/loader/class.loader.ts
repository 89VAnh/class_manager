import { useQuery } from "react-query";

import { AxiosRequestConfig } from "axios";
import { ExtractFnReturnType, QueryConfig } from "~/lib/react-query";
import { getById, searchClasses } from "~/service/class.service";
import { CACHE } from "./cache";

const useGetClassById = ({
  id,
  config,
}: {
  id: string;
  config?: QueryConfig<typeof getById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getById>>({
    ...config,
    queryKey: [CACHE.CLASS, id],
    queryFn: () => getById(id),
  });
};

const useSearchClasses = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchClasses>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchClasses>>({
    ...config,
    queryKey: [CACHE.CLASS, params],
    queryFn: () => searchClasses(params),
  });
};

export { useGetClassById, useSearchClasses };
