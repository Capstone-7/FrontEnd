import React from 'react'
import randomToken from "random-token";
import Cookies from "js-cookie";

export const Auth = {
    isAuthorization() {
        const token = Cookies.get("token");
        // const display_name = Cookies.get("display_name")

        if (token) {
            return { token };
        }
        return { token: '' };
    },
    signOut() {
        Cookies.remove("token");
        Cookies.remove("rt");
        Cookies.remove("username");
        Cookies.remove("id_user");
    },
};