import { useState, useCallback, useEffect } from "react";

let logoutTimer;
export const useAuth =() =>{
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

  
    const login = useCallback((id,token, expirationDate)=>{
        setUserId(id);
        setToken(token);
        const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000*60*60 );
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData', 
                            JSON.stringify(
                                {userId: id, 
                                token: token,
                                expiration:tokenExpirationDate.toISOString()
                            }))
    },[]);
    const logout = useCallback(()=>{
        setToken(false);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    });

    useEffect(()=>{
        if(token && tokenExpirationDate){
            const remainingTime =  tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime)
        }else{
            clearTimeout(logoutTimer)
        }
        
    },[token, tokenExpirationDate,logout])

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(storedData
            && storedData.token
            && new Date(storedData.expiration) > new Date()){
            login(storedData.userId,storedData.token,new Date(storedData.expiration) );
        }
    },[login]);

    return{
        token, login, logout, userId
    }

};