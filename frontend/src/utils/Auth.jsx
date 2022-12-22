import React from "react";
import randomToken from "random-token";
import Cookies from "js-cookie";
import axios from "axios";

export const Auth = {
  isAuthorization() {
    const token = Cookies.get("token");

    if (token) {
      return { token };
    }
    return { token: "" };
  },
  signOut() {
    Cookies.remove("token");
  },
  storeUserInfoToCookie(data) {
    Cookies.set("token", data);
    return data;
  },
};
