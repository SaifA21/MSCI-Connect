import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../components/Firebase/firebase'
import { useAuth } from './AuthContext';

const DBContext = React.createContext()


export function useDB() {
  return (useContext(DBContext))
}

export function DBProvider ({children}){

    const{currentUser} = useAuth()
    const [admin, setAdmin] = useState()

    setAdmin(callCheckAdmin)

    const callCheckAdmin = async () => {
        console.log('whewewelkrjw;elkrjw;ek')
        const url = serverURL + "/api/checkAdmin"
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: currentUser.uid
      
        });
        const body = await response.json();
        if (response.status != 200) throw Error(body.message);
        console.log(body)

        return body;
      
    }
    
    
    const value = {admin}

    return(
        <DBContext.Provider value = {value}>
            {children}
        </DBContext.Provider>
    ) 

}
