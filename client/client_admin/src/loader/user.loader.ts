import { useMutation } from "react-query";
import { MutationConfig } from "~/lib/react-query";
import { loginService } from "~/service/user.service";

const useLogin = ({
  config,
}: {
  config?: MutationConfig<typeof loginService>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: loginService,
  });
};
export { useLogin };
