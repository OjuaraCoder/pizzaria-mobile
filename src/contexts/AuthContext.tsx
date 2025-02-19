import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
  signOut: () => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);


  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });


  const isAuthenticated = !!user.name; // boolean

  useEffect(() =>{
    async function getUser() {
        //pegar os dados salvos no asyncstorage
        const userInfo = await AsyncStorage.getItem("@sujeitopizzaria");
        let hasUser:UserProps = JSON.parse(userInfo || "{}");

        if(Object.keys(hasUser).length > 0){
            api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`   
            setUser({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email,
                token: hasUser.token
            })
        }
        setLoading(false);
    }

    getUser();
  }, [])




  async function signIn({email, password}: SignProps){
    setLoadingAuth(true);
    try {
        const response = await api.post("/session",{
            email,
            password
        })

        const { id, name, token } = response.data;

        const data = {
            ...response.data
        }
        await AsyncStorage.setItem("@sujeitopizzaria", JSON.stringify(data) );
        
        //defininando o token para todas as solicitações a serem realizadas
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`

        setUser({id, name, email, token})
        
    } catch (error) {
        console.log("erro ao acessar: ", error)
    }
        setLoadingAuth(false)
  }

  async function signOut(){
    await AsyncStorage.clear().then(() => {
        setUser({
            id: "",
            name: "",
            email: "",
            token: "",            
        })
    })
  }

  return (
    <AuthContext.Provider value={{ user,
                                   isAuthenticated,
                                   signIn,
                                   signOut,
                                   loadingAuth,
                                   loading }}>
     {children}
    </AuthContext.Provider>
  )
}
