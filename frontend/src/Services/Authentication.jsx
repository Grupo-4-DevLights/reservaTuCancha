import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import UserContext from './userContext'

function UserProvider ({children}) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
        setLoading(false);
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;