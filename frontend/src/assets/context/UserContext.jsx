import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../../url";

export const  UserContext = createContext({})

export function UserContextProvider({children}){

    const [user,setUser] = useState(null)
    const getUser = async()=>{
        try{
            const res = await axios.get(window.location.origin+'/api/auth/refetch',{withCredentials:true})
            console.log(res, "")
            setUser(res.data)

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
getUser()
    },[])
return <UserContext.Provider value={{user,setUser}}>
    {children}

</UserContext.Provider>

}