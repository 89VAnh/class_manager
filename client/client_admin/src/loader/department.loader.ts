import { useQuery } from "react-query";

import { AxiosRequestConfig } from "axios";
import { ExtractFnReturnType, QueryConfig } from "~/lib/react-query";

import { searchDepartment } from "~/service/department.service";
import { CACHE } from "./cache";

const useSearchDepartment = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchDepartment>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchDepartment>>({
    ...config,
    queryKey: [CACHE.DEPARTMENT, params],
    queryFn: () => searchDepartment(params),
  });
};

export { useSearchDepartment };
