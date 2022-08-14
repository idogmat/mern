import {useState,useCallback,useEffect} from "react";
const storageName = 'userData'
export const useAuth = ()=>{
    const [token, setToken]=useState(null)
    const [userId, setUserId]=useState(null)
    const login = useCallback((jwtToken,userId)=>{
        setToken(jwtToken)
        setUserId(userId)
        localStorage.setItem(storageName,JSON.stringify({userId,token}))
    },[])
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.setItem(storageName)
    },[])
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
        }
    },[login])
    return {login, logout, token, userId}
}