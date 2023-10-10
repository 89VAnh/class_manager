import axios from "axios";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext<{
  user: string | null;
  setUser: (newToken: string) => void;
}>({ user: null, setUser: () => {} });

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser_] = useState(JSON.parse(localStorage.getItem("user")!));

  const setUser = (user: string) => {
    setUser_(user);
  };

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("user");
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user: user,
      setUser: setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
