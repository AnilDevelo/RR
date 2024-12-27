import {
  ADD_AVATAR,
  DELETE_AVATAR,
  GET_AVATAR,
  UPDATE_AVATAR,
  ADD_REASON_REPORT,
  GET_REASON_REPORT,
  UPDATE_REASON_REPORT,
  DELETE_REASON_REPORT,
} from "../../route";

export const getAllAvatars = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_AVATAR, payload)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "GET_ALL_AVATAR",
          payload: res.data.data,
        });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const createAvatarData =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_AVATAR, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const editAvatarData = (payload) => async (dispatch, getState, api) => {
  return await api
    .put(UPDATE_AVATAR, payload)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "UPDATE_AVATAR_DATA",
          payload: res.data.data,
        });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const deleteAvatarData =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_AVATAR, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addReasonReport = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_REASON_REPORT, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getReasonReport = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_REASON_REPORT, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateReasonReport =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_REASON_REPORT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteReasonReport =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_REASON_REPORT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
