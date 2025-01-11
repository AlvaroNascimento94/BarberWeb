/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  SignIn: (credentials: SignInProps) => Promise<void>;
  SignUp: (credentials: SignUpProps) => Promise<void>;
  LogoutUser: () => Promise<void>;
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

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function SignOut() {
  const navigate = useNavigate();
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    navigate("/");
  } catch (err) {
    console.log("Erro ao Deslogar");
  }
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@barber.token": token } = parseCookies();

    if (token) {
      api.get("/me")
        .then((response) => {
          const { id, name, email, endereco, subscriptions } = response.data;
          setUser({ id, name, email, endereco, subscriptions });
        })
        .catch(() => {
          LogoutUser();
        });
    }
  }, []);

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
      setCookie(undefined, "@user", JSON.stringify({ id, name, email, endereco, subscriptions }));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.log("Erro ao logar", err);
    }
  }

  async function SignUp({ name, email, password }: SignUpProps) {
    try {
    await api.post("/users", {
        name,
        email,
        password,
      });

      SignIn({ email, password });

    } catch (error) {
      console.log("erro ao cadastrar", error);
    }
  }

  async function LogoutUser() {
    try {
      destroyCookie(null, "@barber.token", { path: "/" });
      destroyCookie(null, "@user", { path: "/" });
      setUser(null);
    } catch (error) {
      console.log("erro ao sair", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn, SignUp, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
