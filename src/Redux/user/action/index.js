import {jsonToFormData} from "../../../utils";
import {
    ACTIVE_DEACTIVATE_USER_KYC_LIST,
    ADD_REPORT_CONFIG,
    ADD_USER_NOTE, APPROVE_REJECT_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST,
    APPROVE_REJECT_USER_WITHDRAW_REQUEST,
    APPROVED_REJECT_USER_KYC_REQUEST,
    BLOCK_ALL_USER_LIST,
    BLOCK_USER_BLOCKED_LIST,
    DELETE_REPORT_CONFIG,
    DELETE_USER_NOTE,
    GET_ALL_USER_LIST,
    GET_INACTIVE_USER_LIST,
    GET_REPORT_CONFIG,
    GET_USER_BLOCKED_LIST, GET_USER_DEPOSITE_HISTORY, GET_USER_EARNING_REPORT,
    GET_USER_GAME_STATISTICS,
    GET_USER_KYC_LIST,
    GET_USER_KYC_REQUEST_LIST,
    GET_USER_KYC_VIEW_REQUEST_LIST,
    GET_USER_MOBILE_NUMBER_UPDATE_REQUEST_LIST,
    GET_USER_NOTE, GET_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST_LIST,
    GET_USER_PAYMENT_HISTORY,
    GET_USER_PLAYED_GAME_LIST, GET_USER_PROFILE,
    GET_USER_REPORTED_LIST,
    GET_USER_TRANSACTION_HISTORY, GET_USER_WISE_GST_REPORT,
    GET_USER_WISE_KYC_LIST,
    GET_USER_WITHDRAW_REQUEST,
    GET_USER_WITHDRAWAL_HISTORY,
    UPDATE_BONUS_USER_PROFILE,
    UPDATE_COIN_USER_PROFILE,
    UPDATE_DEPOSIT_USER_PROFILE,
    UPDATE_REPORT_CONFIG,
    UPDATE_USER_KYC_LIST,
    UPDATE_USER_NOTE,
    UPDATE_USER_PROFILE,
    UPDATE_WINNING_CASH_USER_PROFILE,
    VIEW_USER_BLOCKED_LIST,
    VIEW_USER_PLAYED_GAME_LIST,
    VIEW_USER_REPORTED_LIST
} from "../../route";

export const getAllUserDetailsList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_ALL_USER_LIST, payload)
        .then((res) => {
            if (res.status === 200 && !res?.data?.data?.filePath) {
                dispatch({
                    type:"USER_DATA_DETAILS",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const userBlockAction = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(BLOCK_ALL_USER_LIST, payload)
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type:"USER_BLOCK_DETAILS",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

// ============================================= User Profile ================================================================
export const getUserProfile = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_PROFILE, payload)
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type:"USER_PROFILE_DETAILS",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateUserProfile = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPDATE_USER_PROFILE, jsonToFormData(payload))
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type:"USER_UPDATE_PROFILE",
                    payload:res?.data?.data?.userData
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateBonus = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPDATE_BONUS_USER_PROFILE, payload)
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type:"UPDATE_DEPOSITS_CASH",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateDepositWinningCash = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPDATE_WINNING_CASH_USER_PROFILE, payload)
        .then((res) => {
            if (res.data.success) {
                dispatch({
                    type:"UPDATE_WIN_CASH",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateDepositCash = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPDATE_DEPOSIT_USER_PROFILE, payload)
        .then((res) => {
            if (res.data.success) {
                dispatch({
                    type:"UPDATE_DEPOSITS_CASH",
                    payload:res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateCoins = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(UPDATE_COIN_USER_PROFILE, payload)
        .then((res) => {
            if (res.data.success) {
                dispatch({
                    type:"UPDATE_COINS",
                    payload:res?.data?.data?.userData
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const userDetailGameStatistics = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_GAME_STATISTICS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const userDetailTransactions = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_TRANSACTION_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//------------------------------------------ Note Module------------------------------------
export const getUsersNote = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_NOTE, payload)
        .then((res) => {
            dispatch({
                type:"GET_NOTE_DATA_LIST",
                payload:res.data.data
            })
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const createUsersNote = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_USER_NOTE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateUsersNote = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_USER_NOTE, payload)
        .then((res) => {
            dispatch({
                type:"UPDATE_NOTE_DATA",
                payload:res.data.data
            })
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteUsersNote = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_USER_NOTE, {data:payload})
        .then((res) => {
            dispatch({
                type:"UPDATE_NOTE_DATA",
                payload:res.data.data
            })
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


//------------------------------ Users KYC Api [Start]-----------------------------------------------------//

export const getUserKYCList = (payload) => async (dispatch,getState,api) => {
    return await api.post(GET_USER_KYC_LIST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const updateUserKYCList = (payload) => async (dispatch,getState,api) => {
    return await api.put(UPDATE_USER_KYC_LIST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const activateDeactivateUserKYCList = (payload) => async (dispatch,getState,api) => {
    return await api.post(ACTIVE_DEACTIVATE_USER_KYC_LIST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const getUserKYCListRequest = (payload) => async (dispatch,getState,api) => {
    return await api.post(GET_USER_KYC_REQUEST_LIST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const userKYCViewRequestList = (payload) => async (dispatch,getState,api) => {
    return await api.post(GET_USER_KYC_VIEW_REQUEST_LIST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const ApproveRejectUserKYCListRequest = (payload) => async (dispatch,getState,api) => {
    return await api.post(APPROVED_REJECT_USER_KYC_REQUEST, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}

//------------------------Payment History [Start] -------------------------------------------------------------- //
export const userPaymentHistoryList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_PAYMENT_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const userDepositeHistoryList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_DEPOSITE_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const userPWithdrawlHistoryList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_WITHDRAWAL_HISTORY, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//------------------------Payment History [End] -------------------------------------------------------------- //

//------------------------------ Users KYC Api [End]-----------------------------------------------------//
//------------------------user reported [Start]-------------------------------------------------------------- //
export const userReportedDetailsData = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("getReportedUser", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getUserReportedList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_REPORTED_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const viewUserReportedList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(VIEW_USER_REPORTED_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//------------------------user reported [End] -------------------------------------------------------------- //
//------------------------user Block [start] -------------------------------------------------------------- //
export const getUserBlockListData = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("blockUser/getList", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getUserBlockListDetails = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("blockUser/getList/view", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getUserBlockList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_BLOCKED_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getViewUserBlockList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(VIEW_USER_BLOCKED_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const userBlockUnblockListData = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(BLOCK_USER_BLOCKED_LIST, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//------------------------user Block [End] -------------------------------------------------------------- //

//------------------------user Played Tab [start] -------------------------------------------------------------- //
export const getUserPlayedGamesList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_PLAYED_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const viewUserPlayedDetailsGames = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(VIEW_USER_PLAYED_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//------------------------user Played Tab [End] -------------------------------------------------------------- //
//------------------------user KYC Tab [start] -------------------------------------------------------------- //
export const getSingleUserKYC = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_WISE_KYC_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//------------------------user KYC Tab [End] -------------------------------------------------------------- //
export const getWithdrawRequests = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_WITHDRAW_REQUEST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const approveRejectUserWithdrawalRequest = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(APPROVE_REJECT_USER_WITHDRAW_REQUEST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//--------------------------------------update user Mobile number Request -----------------------------

export const getUpdateUserMobileNumberReqList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_MOBILE_NUMBER_UPDATE_REQUEST_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getUserOldPhoneNumber = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const phoneNumberUpdateApproveRejectRequest = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(APPROVE_REJECT_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//------------------------------------------------ user GST ----------------------------------------------------

export const getUserWiseGSTReport = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_WISE_GST_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

// ----------------------------- User Earning Report --------------------------------------------

export const getUserEarningReport = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_USER_EARNING_REPORT, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//========================== inactive User =====================================

export const getInactiveUserList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_INACTIVE_USER_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//========================== Reported Users =====================================
export const getReportedConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_REPORT_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deletedReportedConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_REPORT_CONFIG, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateReportedConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_REPORT_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createReportedConfig = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_REPORT_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};