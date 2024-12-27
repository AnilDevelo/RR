import {
    ADD_DELETE_USER_ACCOUNT_POLICY,
    ADD_DELETE_USER_ACCOUNT_TERMS_ADN_CONDITION_POLICY,
    ADD_FAIR_POLICY,
    ADD_GST_POLICY,
    ADD_LEADERBOARD_RULES,
    ADD_LEGAL_POLICY,
    ADD_PRIVACY_POLICY, ADD_REFER_AND_EARN_RULES,
    ADD_REFUND_POLICY,
    ADD_TERMS_AND_CONDITIONS_POLICY,
    ADD_WALLET_POLICY, ADD_WITHDRAWAL_TERM_AND_CONDITION,
    DOCUMENTATION_UPLOAD_IMAGE,
    GET_DELETE_USER_ACCOUNT_POLICY,
    GET_FAIR_POLICY, GET_GST_POLICY, GET_LEADERBOARD_RULES,
    GET_LEGAL_POLICY,
    GET_PRIVACY_POLICY, GET_REFER_AND_EARN_RULES,
    GET_REFUND_POLICY,
    GET_TERMS_AND_CONDITIONS_POLICY,
    GET_WALLET_POLICY, GET_WITHDRAWAL_TERM_AND_CONDITION,
} from "../../route";

export const getLegalPolicy = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_LEGAL_POLICY, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const createLegalPolicy =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_LEGAL_POLICY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getPrivacyPolicyList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_PRIVACY_POLICY, {})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createPrivacyPolicy =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_PRIVACY_POLICY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getTermsAndConditionList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_TERMS_AND_CONDITIONS_POLICY, {})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createTermsAndCondition =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_TERMS_AND_CONDITIONS_POLICY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };


export const documentationUploadImages =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DOCUMENTATION_UPLOAD_IMAGE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getRefundPolicyList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_REFUND_POLICY, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createRefundPolicy =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_REFUND_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getDeleteUserPolicyList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DELETE_USER_ACCOUNT_POLICY, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createDeleteUserPolicy =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_DELETE_USER_ACCOUNT_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createUserDeleteAccountRules =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_DELETE_USER_ACCOUNT_TERMS_ADN_CONDITION_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//------------------------------------- wallet rules ---------------------------------------------------

export const getWalletRulesList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_WALLET_POLICY, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createWalletRules =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_WALLET_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//------------------------------------- GST rules ---------------------------------------------------

export const getGSTRulesList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GST_POLICY, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createGSTRules =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GST_POLICY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };    
//------------------------------Fair Play Policy[Start]--------------------------------------------------------------- //
export const createFairPlayPolicy = (payload) => async (dispatch,getState,api) => {
    return await api.post(ADD_FAIR_POLICY, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const getFairPlayPolicy = (payload) => async (dispatch, getState, api) => {
    return await api
        .get(GET_FAIR_POLICY, payload)
        .then((res) => {
            // if(res.data.success) {
            //     dispatch({
            //         type:"GET_FAIR_PLAY_POLICY_DATA",
            //         payload: res.data.data
            //     })
            // }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//------------------------------Fair Play Policy[End]--------------------------------------------------------------- //

//------------------------------Leaderboard Rules[Start]--------------------------------------------------------------- //
export const createLeaderboardRules = (payload) => async (dispatch,getState,api) => {
    return await api
        .post(ADD_LEADERBOARD_RULES, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}
export const getLeaderboardRules = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_LEADERBOARD_RULES, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//------------------------------Leaderboard Rules[End]--------------------------------------------------------------- //


export const createReferAndEarnRules = (payload) => async (dispatch,getState,api) => {
    return await api.post(ADD_REFER_AND_EARN_RULES, payload)
        .then((res) => {
            return res;
        })   .catch((err) => {
            return err.response;
        });
}
export const getReferAndEarnRules = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_REFER_AND_EARN_RULES, {})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getWithdrawalTermAndConditionList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_WITHDRAWAL_TERM_AND_CONDITION, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createWithdrawalTermAndCondition =
    (payload) => async (dispatch, getState, api) => {

        return await api
            .post(ADD_WITHDRAWAL_TERM_AND_CONDITION, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };