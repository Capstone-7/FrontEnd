import React from 'react'
import randomToken from "random-token";
import Cookies from "js-cookie";

export const Auth = {
    isAuthorization() {
        const token = Cookies.get("token");
        // const refreshToken = Cookies.get("rt");
        // const display_name = Cookies.get("display_name")

        if (token) {
            return { token };
        }
        return { token: '' };
    },
    signOut() {
        Cookies.remove("token");
        Cookies.remove("rt");
        // Cookies.remove("username");
        // Cookies.remove("id_user");
    },
    storeUserInfoToCookie(data) {
        Cookies.set("token", data);
        // Cookies.set("rt", data);
        // Cookies.set("display_name", data.display_name, { expires: 2 });
        // Cookies.set("id_user", data.id_user, { expires: 2 });
        return data;
    },
};