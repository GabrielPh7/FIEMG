import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";

import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();

    token ? router.push("/usersList") : router.push("/signIn");

  }, [isAuthenticated]);

  async function signIn({ username, password }) {

  const response = await api.post("/login", {
    username,
    password
  })

  console.log("response", response)

  setCookie(undefined, "token", response.data.data.token, {
    maxAge: 60 * 60 * 720, // 30 dias
  });

  api.defaults.headers[
    "Authorization"
  ] = `Bearer ${response.data.data.token}`;

  setIsAuthenticated(true);

  router.push("/usersList");
}


  async function signOut(){
    destroyCookie(undefined, 'token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}