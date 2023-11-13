import { useMutation, useQuery } from "react-query";

import { AxiosRequestConfig } from "axios";
import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "~/lib/react-query";
import {
  createClass,
  deleteClass,
  getById,
  searchClasses,
  updateClass,
} from "~/service/class.service";
import { CACHE } from "./cache";

const useGetClassById = ({
  id,
  enabled,
  config,
}: {
  id: string;
  enabled: boolean;
  config?: QueryConfig<typeof getById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getById>>({
    ...config,
    enabled,
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

const useCreateClass = ({
  config,
}: {
  config?: MutationConfig<typeof createClass>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createClass,
  });
};

const useUpdateClass = ({
  config,
}: {
  config?: MutationConfig<typeof updateClass>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateClass,
  });
};

const useDeleteClass = ({
  config,
}: {
  config?: MutationConfig<typeof deleteClass>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteClass,
  });
};

export {
  useCreateClass,
  useDeleteClass,
  useGetClassById,
  useSearchClasses,
  useUpdateClass,
};
