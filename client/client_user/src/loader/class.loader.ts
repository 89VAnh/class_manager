import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "~/lib/react-query";
import { getClasses } from "~/service/class.service";
import { CACHE } from "./cache";

const useGetClasses = ({
  lectureId,
  config,
}: {
  lectureId: string;
  config?: QueryConfig<typeof getClasses>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getClasses>>({
    ...config,
    queryKey: [CACHE.CLASS, lectureId],
    queryFn: () => getClasses(lectureId),
  });
};

export { useGetClasses };
