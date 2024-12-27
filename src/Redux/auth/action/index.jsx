import Cookies from 'js-cookie'
import {AUTH_CHANGE_PASSWORD, AUTH_FORGOT_PASSWORD, AUTH_LOGIN, AUTH_RESET_PASSWORD} from "../../route";
let CryptoJS = require("crypto-js");

export const loginUser = (payload) => async (dispatch, getState, api) => {
    Cookies.set(`token`, "checkuser", { path: "/", expires: 1 / 2 })
    return await api
        .post(AUTH_LOGIN, payload)
        .then((res) => {
            if (res.data.success) {
                document.cookie = "test=true; expires=1/2;"
                const dataToEncrypt = JSON.stringify(res.data.data?.userData);
                const secretKey = process.env.REACT_APP_CALL_BREAK_TOKEN_KEY;
                const encryptedUserData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
                document.cookie = `userDetails=${encodeURIComponent(encryptedUserData)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
                Cookies.set(`token`, res.data.data?.tokenData?.token, { path: "/", expires: 1 / 2 })
                if(Object?.keys(res.data.data?.agentData || {})?.length > 0) {
                    const agentDataEncrypt = JSON.stringify(res.data.data?.agentData);
                    const encryptedAgentData = CryptoJS.AES.encrypt(agentDataEncrypt, secretKey).toString();
                    document.cookie = `agentDetails=${encodeURIComponent(encryptedAgentData)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
                }else {
                    Cookies.set(`agentDetails`, JSON.stringify(null), { path: "/", expires: 1 / 2 });
                }

//                 const setCookie = (name, value, hours) => {
//                     const expirationDate = new Date();
//                     expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);
//                     const expires = 'expires=' + expirationDate.toUTCString();
//                     document.cookie = name + '=' + value + ';' + expires + ';path=/';
//                 };
//
// // Set the cookie with an expiration time of 24 hours
//                 setCookie('myCookie', 'cookie value', 24);

            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const changePasswordHandle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(AUTH_CHANGE_PASSWORD, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const forgotPasswordHandler = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(AUTH_FORGOT_PASSWORD, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const resetPasswordHandle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(AUTH_RESET_PASSWORD, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};