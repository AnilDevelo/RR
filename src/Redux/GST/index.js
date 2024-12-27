import { GET_ALL_GST_REPORT, GET_GAME_WISE_GST_REPORT, GET_GAME_WISE_USER_GST_REPORT, GET_GST_CONFIG_PERCENT, GET_PARTICULAR_USER_WISE_GST_REPORT, VIEW_ALL_USER_WISE_GST_REPORT } from "Redux/route";

export const getGameWiseGstReportList =
(payload) => async (dispatch, getState, api) => {
    return await api
    .post(GET_GAME_WISE_GST_REPORT, payload)
    .then((res)=> {
        return res;
    })
    .catch((err)=> {
        return err.response;
    });
    }; 

    export const getGSTConfigPercent =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GST_CONFIG_PERCENT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getGstReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_ALL_GST_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getGSTUserWiseViewGameReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(VIEW_ALL_USER_WISE_GST_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getGameWiseUserGSTReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
        .post(GET_GAME_WISE_USER_GST_REPORT, payload)
        .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

