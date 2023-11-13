import { lazyLoad } from "~/utils/loadable";

export const ClassPage = lazyLoad(
  () => import("./Class"),
  (module) => module.default
);
