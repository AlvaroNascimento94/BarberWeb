/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState } from "react";
import { destroyCookie } from 'nookies'
import { useNavigate} from 'react-router-dom'

interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    SignIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps{
    id: string;
    name: string;
    email: string;
    endereco: string | null;
    subscriptions?:SubscriptionsProps | null
}

interface SubscriptionsProps {
    id: string;
    status: string;
}

type AuthProviderProps = {
    children: ReactNode;
}


interface SignInProps{
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function SignOut(){
    console.log("Error logut");
    const navigate = useNavigate();
    try {
        destroyCookie(null, '@barber.token',{path: '/'});
        navigate('/');
    } catch ( err) {
        console.log("erro ao sair");
        
    }
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;


    async function SignIn({email, password}:SignInProps) {
        console.log("Chamou a função signIn");
        
        console.log({
            email,
            password
        });
        
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, SignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

