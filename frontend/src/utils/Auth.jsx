import React from 'react'
import randomToken from "random-token";
import Cookies from "js-cookie";
import axios from "axios";

export const Auth = {
    isAuthorization() {
        const token = Cookies.get("token");
        
        console.log(token)
        // const display_name = Cookies.get("display_name")

        if (token) {
            return { token };
        }
        return { token: '' };
    },
    signOut() {
        return Cookies.remove("token");
        // Cookies.remove("rt");
        // Cookies.remove("username");
        // Cookies.remove("id_user");
    },
};

// export const isLogin = () => {
//     if (Cookies.get("BangOrderToken")) {
//         var auth = axios.post(process.env.REACT_APP_API_URL+"auth", null, {headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") }})
//         .then(()=>{
//             return true
//         })
//         .catch(()=>{
//             return false
//         })
        
//         if (auth.then((res) => {return res})){
//             return true;
//         } else {
//             return false;
//         }
//     } else {
//         return false;
//     }
// };