import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    authToken: null,
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
})


function AuthContextProvider({children}){

    const [authToken, setAuthToken] = useState()

    function authenticate (token){
        AsyncStorage.setItem("@token", token)
        setAuthToken(token)
    }

    function logout (){
        AsyncStorage.removeItem("@token")
        setAuthToken(null)
    }

    const authContext = {
        authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return <AuthContext.Provider value = {authContext}>{children}</AuthContext.Provider>
}

export default AuthContextProvider