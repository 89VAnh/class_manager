import { useQuery } from "react-query";

import { AxiosRequestConfig } from "axios";
import { ExtractFnReturnType, QueryConfig } from "~/lib/react-query";

import { searchLecturer } from "~/service/lecture.service";
import { CACHE } from "./cache";

const useSearchLecturer = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchLecturer>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchLecturer>>({
    ...config,
    queryKey: [CACHE.LECTURER, params],
    queryFn: () => searchLecturer(params),
  });
};

export { useSearchLecturer };
