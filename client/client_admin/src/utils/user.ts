import { HOME_URL } from "~/config/urls";
import { LOCAL_USER } from "~/constant/config";
import storage, { storageService } from "./storage";

export const currentUser = storageService.getStorage(LOCAL_USER);

export const Logout = () => {
  window.open(HOME_URL, "_parent");

  storage.clearToken();
  storageService.clearStorage("user");
};
