//--------------------------------------------------------- Coupon Module Api [Start]--------------------------------------------//
import {
    ACTIVE_DEACTIVATE_REFER_AND_EARN, ADD_COUPON_CODE,
    ADD_DAILY_WHEEL_BONUS, ADD_DAILY_WHEEL_BONUS_TYPE_LIST,
    ADD_LEADER_BOARD_BONUS_CONFIG,
    ADD_MONTHLY_BONUS_RELEASE_DATE_REFER_AND_EARN,
    ADD_MONTHLY_MAX_BONUS_LIMIT_REFER_AND_EARN,
    ADD_OFFER,
    ADD_REFER_AND_EARN,
    ADD_REFER_AND_EARN_CONFIG,
    ADD_REFER_AND_EARN_POINT_CONFIG, DELETE_COUPON_CODE,
    DELETE_OFFER,
    DELETE_REFER_AND_EARN_CONFIG,
    DELETE_REFER_AND_EARN_POINT_CONFIG, GET_COUPON_CODE,
    GET_CURRENT_REFER_AND_EARN_LEADERBOARD,
    GET_DAILY_SPIN_DIVISION_CONFIG,
    GET_DAILY_SPIN_DIVISION_ROW,
    GET_DAILY_WHEEL_BONUS,
    GET_DAILY_WHEEL_BONUS_TYPE, GET_DAILY_WHEEL_BONUS_TYPE_LIST,
    GET_DAY_DAILY_WHEEL_BONUS, GET_LEADER_BOARD_BONUS_CONFIG,
    GET_LEADERBOARD_GAME_NAME,
    GET_LEADERBOARD_LIST,
    GET_OFFER,
    GET_PREVIOUS_REFER_AND_EARN_LEADERBOARD,
    GET_REFER_AND_EARN,
    GET_REFER_AND_EARN_CONFIG,
    GET_REFER_AND_EARN_DETAIL,
    GET_REFER_AND_EARN_POINT_CONFIG, UPDATE_COUPON_CODE,
    UPDATE_DAILY_WHEEL_BONUS,
    UPDATE_OFFER,
    UPDATE_REFER_AND_EARN_CONFIG,
    UPDATE_REFER_AND_EARN_POINT_CONFIG,
    VIEW_LEADERBOARD_LIST,
    VIEW_REFER_AND_EARN,
    DELETE_REFER_AND_EARN_SHARE_CONFIG,
    GET_REFER_AND_EARN_SHARE_CONFIG,
    ADD_REFER_AND_EARN_SHARE_CONFIG,
    UPDATE_REFER_AND_EARN_SHARE_CONFIG
} from "../../route";

export const getCouponCodeList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_COUPON_CODE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createCouponCode =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_COUPON_CODE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const updateCouponCode =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_COUPON_CODE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteCouponCode =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_COUPON_CODE, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//--------------------------------------------------------- Coupon Module Api [End]--------------------------------------------//

//--------------------------------------------------------- Offer Module Api [Start]--------------------------------------------//

export const getOfferList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_OFFER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const createOfferList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_OFFER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateOfferList = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_OFFER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteOfferList = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_OFFER, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//--------------------------------------------------------- Offer Module Api [End]--------------------------------------------//

///-------------------------------------------------- daily bonus type -------------------------------------------------------
export const getDailyWheelBonusTypeList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAILY_WHEEL_BONUS_TYPE_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addDailyWheelBonusTypeList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_DAILY_WHEEL_BONUS_TYPE_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//--------------------------------------------------------- Daily Wheel Bonus [Start]-----------------------------------------------------//
export const getDailyWheelBonusType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAILY_WHEEL_BONUS_TYPE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getDailySpinDivisionRow =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAILY_SPIN_DIVISION_ROW, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getDailySpinDivisionConfigList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAILY_SPIN_DIVISION_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getDailyWheelBonusList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAILY_WHEEL_BONUS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const createDailyWheelBonusList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_DAILY_WHEEL_BONUS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const updateDailyWheelBonusList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_DAILY_WHEEL_BONUS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getDayDailyWheelBonus =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DAY_DAILY_WHEEL_BONUS, {})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//--------------------------------------------------------- Daily Wheel Bonus [End]-----------------------------------------------------//
//--------------------------------------------------------- Refer And Earn [Start]-----------------------------------------------------//
export const getReferAndEarn = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_REFER_AND_EARN, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const createReferAndEarn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_REFER_AND_EARN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const activateReferAndEarnList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ACTIVE_DEACTIVATE_REFER_AND_EARN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getReferAndEarnListingDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_REFER_AND_EARN_DETAIL, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getReferAndEarnListingView =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(VIEW_REFER_AND_EARN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//--------------------------------------------------------- Refer And Earn [End]-----------------------------------------------------//
//--------------------------------------------------------- Leaderboard [Start]-----------------------------------------------------//

export const getViewGameLeaderboardList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(VIEW_LEADERBOARD_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getLeaderboardList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LEADERBOARD_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getLeaderboardGameList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LEADERBOARD_GAME_NAME, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getCurrentReferAndEarnLeaderboard =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_CURRENT_REFER_AND_EARN_LEADERBOARD, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getPreviousReferAndEarnLeaderboard =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_PREVIOUS_REFER_AND_EARN_LEADERBOARD, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//--------------------------------------------------------- Leaderboard [End]-----------------------------------------------------//

//---------------------------------- Refer and Earn Monthly --------------------------------------------------------

export const addMonthlyReferAndEarnBonusAmountList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_MONTHLY_MAX_BONUS_LIMIT_REFER_AND_EARN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const addMonthlyReferAndEarnBonusReleaseDate =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_MONTHLY_BONUS_RELEASE_DATE_REFER_AND_EARN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const referAndEarnRankConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_REFER_AND_EARN_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const updateReferAndEarnRankConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_REFER_AND_EARN_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteReferAndEarnRankConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_REFER_AND_EARN_CONFIG, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getReferAndEarnRankConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_REFER_AND_EARN_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const referAndEarnPointsConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_REFER_AND_EARN_POINT_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getReferAndEarnPointsConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_REFER_AND_EARN_POINT_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const updateReferAndEarnPointsConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_REFER_AND_EARN_POINT_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteReferAndEarnPointsConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_REFER_AND_EARN_POINT_CONFIG, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addLeaderboardBonusList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_LEADER_BOARD_BONUS_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const geLeaderboardBonus =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LEADER_BOARD_BONUS_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };


    export const deleteReferAndEarnShare =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DELETE_REFER_AND_EARN_SHARE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    export const getReferAndEarnShare =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_REFER_AND_EARN_SHARE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    export const addReferAndEarnShareList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_REFER_AND_EARN_SHARE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const updateReferAndEarnShare =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_REFER_AND_EARN_SHARE_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
