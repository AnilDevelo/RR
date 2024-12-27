import Cookies from "js-cookie";
import {
    ADD_ADMIN_USER_LIST, ADD_SUB_ADMIN_USER_LIST,
    ADMIN_USER_GET_PERMISSIONS,
    DELETE_ADMIN_USER_LIST, DELETE_SUB_ADMIN_USER_LIST,
    GET_ADMIN_USER_LIST, GET_SUB_ADMIN_USER_LIST,
    UPDATE_ADMIN_USER_LIST, UPDATE_STATUS_ADMIN_USER_LIST,
    UPDATE_STATUS_SUB_ADMIN_USER_LIST, UPDATE_SUB_ADMIN_USER_LIST
} from '../../route';
let CryptoJS = require("crypto-js");

export const getPermissionsKey = () => async (dispatch, getState, api) => {
  return await api
    .post(ADMIN_USER_GET_PERMISSIONS, {})
    .then((res) => {
      if (res?.data?.success) {
          if(Object.keys(res.data.data?.agentData || {})?.length > 0){
            const secretKey = process.env.REACT_APP_CALL_BREAK_TOKEN_KEY;
            const agentDataEncrypt = JSON.stringify(res.data.data?.agentData);
            const encryptedAgentData = CryptoJS.AES.encrypt(agentDataEncrypt, secretKey).toString();
            document.cookie = `agentDetails=${encodeURIComponent(encryptedAgentData)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
        }
        // dispatch({
        //   type: "GET_PERMISSION_KEY",
        //   payload: res.data.data.permissions,
        // });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const createAdminUserList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_ADMIN_USER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getAdminUserListing =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_ADMIN_USER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateAdminUserList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_ADMIN_USER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteAdminUserList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_ADMIN_USER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateStatusAdminUserList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(UPDATE_STATUS_ADMIN_USER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//====================================== Sub Admin ================================================================

export const addSubAdminUserList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_SUB_ADMIN_USER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getSubAdminUserListing =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_SUB_ADMIN_USER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };


export const updateSubAdminUserList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_SUB_ADMIN_USER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteSubAdminUserList =
        (payload) => async (dispatch, getState, api) => {
            return await api
                    .delete(DELETE_SUB_ADMIN_USER_LIST, {data:payload})
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err.response;
                });
        };
export const updateStatusSubAdminUserList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(UPDATE_STATUS_SUB_ADMIN_USER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };