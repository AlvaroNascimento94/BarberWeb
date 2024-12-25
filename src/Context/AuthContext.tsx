/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  SignIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscriptions?: SubscriptionsProps | null;
}

interface SubscriptionsProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function SignOut() {
  console.log("Error logut");
  const navigate = useNavigate();
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    navigate("/");
  } catch (err) {
    console.log("erro ao sair");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  
  async function SignIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      const { name, id, token, endereco, subscriptions } = response.data;

      setCookie(undefined, "@barber.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser({ id, name, email, endereco, subscriptions });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.log("erro ao logar", err);
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}
