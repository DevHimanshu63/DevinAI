import React, {  createContext, useEffect, useState } from 'react'

export const userContext = createContext();

function UserProvider({children}) {
    const [user , setUser] = useState(null);
    useEffect(()=>{
        console.log('userData----->',user);
    },[user])    
  return (
    <userContext.Provider value={{user , setUser}} >
        {children}
    </userContext.Provider>
  )
}

export {UserProvider};