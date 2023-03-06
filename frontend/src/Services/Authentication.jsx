import React, { createContext, useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const AppContext = createContext();

function UserProvider ({children}) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if (!isLoading) {
            setUser(decodificar(token));
        }
        setIsLoading(false);

    }, [])
    
    return (
        <AppContext.Provider value={{user , setUser , isLoading}}>
            {children}
        </AppContext.Provider>
    )
}

export default UserProvider;


export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if (appContext === undefined){
        throw Error('AppContext tiene que estar definido en APP.JS');
    }

    return appContext
}

export function decodificar(token){
    const decoded = jwt_decode(token);
    return decoded
}