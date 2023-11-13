import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "~/lib/react-query";
import { getStudentById } from "~/service/student.service";
import { CACHE } from "./cache";

const useGetStudentById = ({
  id,
  config,
}: {
  id: string;
  config?: QueryConfig<typeof getStudentById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getStudentById>>({
    ...config,
    queryKey: [CACHE.STUDENT, id],
    queryFn: () => getStudentById(id),
  });
};
export { useGetStudentById };
