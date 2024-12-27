import {
    ADD_GST_CONFIG, DELETE_GST_CONFIG,
    GET_GAME_WISE_REVENUE_REPORT,
    GET_GST_CONFIG,
    GET_GST_REPORT, GET_MGP_WALLETS_HISTORY, GET_MGP_WALLETS_HISTORY_REPORT, GET_MONTHLY_GST_HISTORY,
    GET_OVER_ALL_REVENUE_REPORT, GET_TRANSACTION_TYPE_PLATFORM_REPORT, UPDATE_GST_CONFIG,GET_MGP_WALLET_WITHDRAWAL_AND_DEPOSIT, GET_NEW_GST, ADD_NEW_GST, UPDATE_NEW_GST, GET_NEW_GST_HISTORY, GET_NEW_GST_TOTEL_REVENUE, GET_NEW_GST_MONTHLY_HISTORY
} from "../../route";

export const revenueGameWise = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_GAME_WISE_REVENUE_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const revenueOverAll = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_OVER_ALL_REVENUE_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const overAllGSTDetailsApi = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_GST_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_GST_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const addGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_GST_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_GST_CONFIG, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const updateGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_GST_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getMonthlyGstHistory = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_MONTHLY_GST_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getMGPWalletsHistory = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_MGP_WALLETS_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const getMGPWalletsHistoryReport = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_MGP_WALLETS_HISTORY_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getTransactionTypePlatformReport = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_TRANSACTION_TYPE_PLATFORM_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getMgpWalletWithdrawalAndDeposit = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_MGP_WALLET_WITHDRAWAL_AND_DEPOSIT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//New Gst

export const addNewGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_NEW_GST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getNewGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_NEW_GST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateNewGSTConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_NEW_GST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getNewGSTHistory = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_NEW_GST_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getNewGSTHistoryTotalRevenue = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_NEW_GST_TOTEL_REVENUE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getMonthlyGstNewHistory = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_NEW_GST_MONTHLY_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
