import {ADD_ANALYTICS_REPORT,GET_ANALYTICS_APP_INSTALL_USER_REPORT, GET_ANALYTICS_APP_UNINSTALL_USER_REPORT, GET_ANALYTICS_DAILY_REPORT} from "../../route";

export const getGameRackReport =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post("reports", payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "GET_GAME_RACK_REPORT",
            payload: res.data.data,
          });
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const analyticsUserReport = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_ANALYTICS_REPORT, payload)
        .then((res) => {
            if(res.status === 200 && typeof res?.data?.data?.filePath !== 'string'){
                let Payload = {
                    dailyActiveUserReport:res?.data?.data?.dailyActiveUserReport,
                    dailyNewUserReport:res?.data?.data?.dailyNewUserReport,
                    monthalyActiveUserReport:res?.data?.data?.monthalyActiveUserReport,
                    payingUserReport:res?.data?.data?.payingUserReport,
                    totalUserReport:res?.data?.data?.totalUserReport,
                }
                dispatch({
                    type:"ANALYTICS_USER_REPORT",
                    payload:Payload,
                    totalKey:{
                        TotalDailyActiveUserReport:res?.data?.data?.TotalDailyActiveUserReport,
                        TotalDailyNewUserReport:res?.data?.data?.TotalDailyNewUserReport,
                        TotalMonthalyActiveUserReport:res?.data?.data?.TotalMonthalyActiveUserReport,
                        TotalPayingUserReport:res?.data?.data?.TotalPayingUserReport,
                        TotalUserReport:res?.data?.data?.TotalUserReport
                    }
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const analyticsAppInstallUserReport = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(GET_ANALYTICS_APP_INSTALL_USER_REPORT, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const analyticsAppUninstallUserReport = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(GET_ANALYTICS_APP_UNINSTALL_USER_REPORT, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const analyticsDailyReport = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(GET_ANALYTICS_DAILY_REPORT, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};