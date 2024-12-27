import {
    ADD_DESIGN_REFER_AND_EARN_TITLE,
    ADD_FOOTER_ICONS,
    ADD_HOME_FOOTER_ICONS,
    ADD_HOME_SCREEN_LOGO,
    ADD_KYC_HEADER_LOGO,
    ADD_KYC_SCREEN_ICON,
    ADD_LOGIN_SCREEN_LOGO,
    ADD_LOGIN_SCREEN_PRIVACY_POLICY,
    ADD_LOGIN_SCREEN_TYPE_CONFIG,
    ADD_PAYMENT_SETTINGS,
    ADD_REFER_AND_EARN_STEPS, ADD_WALLET_HELP_SCREEN_ICON, ADD_WALLET_SCREEN_ICON,
    DELETE_FOOTER_ICONS,
    DELETE_HOME_FOOTER_ICONS,
    DELETE_HOME_SCREEN_LOGO,
    DELETE_IMAGE,
    DELETE_KYC_SCREEN_ICON,
    DELETE_PAYMENT_SETTINGS,
    DELETE_REFER_AND_EARN_STEPS, DELETE_WALLET_HELP_SCREEN_ICON, DELETE_WALLET_SCREEN_ICON,
    EDIT_FOOTER_ICONS,
    GET_DESIGN_REFER_AND_EARN_TITLE,
    GET_FOOTER_ICONS,
    GET_HOME_FOOTER_ICONS,
    GET_HOME_SCREEN_LOGO,
    GET_KYC_HEADER_LOGO,
    GET_KYC_SCREEN_ICON,
    GET_LOGIN_SCREEN_LOGO,
    GET_LOGIN_SCREEN_PRIVACY_POLICY,
    GET_LOGIN_SCREEN_TYPE_CONFIG,
    GET_PAYMENT_SETTINGS,
    GET_REFER_AND_EARN_STEPS, GET_WALLET_HELP_SCREEN_ICON, GET_WALLET_SCREEN_ICON,
    SWAP_FOOTER_ICONS,
    UPDATE_HOME_FOOTER_ICONS,
    UPDATE_KYC_SCREEN_ICON,
    UPDATE_LOGIN_SCREEN_LOGO,
    UPDATE_PAYMENT_SETTINGS,
    UPDATE_REFER_AND_EARN_STEPS, UPDATE_WALLET_HELP_SCREEN_ICON, UPDATE_WALLET_SCREEN_ICON,
    UPLOAD_SLIDER_LOGIN_SCREEN_LOGO
} from "../../route";
import {jsonToFormData} from "../../../utils";
//--------------------------------Login Screen-------------------------------//
export const getLoginScreenTypeConfigList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LOGIN_SCREEN_TYPE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    export const deleteImage = (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_IMAGE, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const addLoginScreenTypeConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_LOGIN_SCREEN_TYPE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getLoginScreenPrivacyPolicy = (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LOGIN_SCREEN_PRIVACY_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };



export const createDesignLoginScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_LOGIN_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateDesignLoginScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_LOGIN_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const UploadSliderImageLoginScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPLOAD_SLIDER_LOGIN_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const AddLoginScreenPrivacyPolicy = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_LOGIN_SCREEN_PRIVACY_POLICY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getDesignLoginScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_LOGIN_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getAllFooters = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_FOOTER_ICONS, payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"GET_ALL_FOOTERS",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const addFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_FOOTER_ICONS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const editFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(EDIT_FOOTER_ICONS, payload)
    .then((res) => {
        if(res.status === 200){
            dispatch({
                type:"UPDATE_FOOTER_AVATAR_DATA",
                payload:res.data.data
            })
        }
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};

export const deleteFooterAvatarData = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_FOOTER_ICONS, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//---------------------------------Home Screen--------------------------------//




export const getHomeScreenFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_HOME_FOOTER_ICONS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createHomeScreenFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_HOME_FOOTER_ICONS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteHomeScreenFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_HOME_FOOTER_ICONS, {data: payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateHomeScreenFooterIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_HOME_FOOTER_ICONS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const getHomeScreenLogo = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_HOME_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createHomeScreenLogo = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_HOME_SCREEN_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
        
};

export const deleteHomeScreenLogo = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_HOME_SCREEN_LOGO, {data: payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const swapFooterIcons = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(SWAP_FOOTER_ICONS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//---------------------------------Refer And Earn--------------------------------//

export const createReferAndEarnTitleInReferAndEarn = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_DESIGN_REFER_AND_EARN_TITLE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getReferAndEarnTitleInReferAndEarn = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_DESIGN_REFER_AND_EARN_TITLE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createReferAndEarnSteps = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_REFER_AND_EARN_STEPS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getReferAndEarnSteps = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_REFER_AND_EARN_STEPS, payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"GET_ALL_REFER_ICONS",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateReferAndEarnSteps = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(UPDATE_REFER_AND_EARN_STEPS, payload)
    .then((res) => {
        if(res.status === 200){
            dispatch({
                type:"UPDATE_REFER_AND_EARN_DATA",
                payload:res.data.data
            })
        }
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};
export const deleteReferAndEarnSteps = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_REFER_AND_EARN_STEPS, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//---------------------------------Payment Settings--------------------------------//


export const createPaymentSettings = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_PAYMENT_SETTINGS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const getPaymentSettingsData = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_PAYMENT_SETTINGS, payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"GET_ALL_PAYMENT_SETTINGS",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updatePaymentSettingsData = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(UPDATE_PAYMENT_SETTINGS, payload)
    .then((res) => {
        if(res.status === 200){
            dispatch({
                type:"UPDATE_PAYMNET_SETTINGS_DATA",
                payload:res.data.data
            })
        }
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};

export const deletePaymentSettingsData = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_PAYMENT_SETTINGS, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//---------------------------------KYC Screen--------------------------------//
export const createKYCHeaderLogo = (payload) => async (dispatch, getState, api) => {
    return await api
        .post( ADD_KYC_HEADER_LOGO, jsonToFormData(payload))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getKYCHeaderLogo = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_KYC_HEADER_LOGO, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const createKYCScreenIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_KYC_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateKYCScreenIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_KYC_SCREEN_ICON, payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"UPDATE_KYC_SCREEN_DATA",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getKYCScreenIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_KYC_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteKYCScreenIcon = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_KYC_SCREEN_ICON, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


//---------------------------------Wallet Screen--------------------------------//
export const createWalletHelpScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WALLET_HELP_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getWalletHelpScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WALLET_HELP_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateWalletHelpScreen = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(UPDATE_WALLET_HELP_SCREEN_ICON, payload)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};
export const deleteWalletHelpScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WALLET_HELP_SCREEN_ICON, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const createWalletScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WALLET_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getWalletScreenImage = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WALLET_SCREEN_ICON, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateWalletScreen = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(UPDATE_WALLET_SCREEN_ICON, payload)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};
export const deleteWalletScreen = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WALLET_SCREEN_ICON, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};