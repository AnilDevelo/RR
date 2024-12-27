import {
  ACTIVE_DEACTIVATE_MGP_RELEASE,
  ADD_DOWNLOAD_APPLICATION,
  ADD_MGP_RELEASE,
  DELETE_DOWNLOAD_APPLICATION,
  GET_DOWNLOAD_APPLICATION,
  GET_MGP_RELEASE,
  MGP_RELEASE_HALF_ROLL_OUT,
  MGP_RELEASE_UPDATE_ROLL_OUT,
  UPDATE_DOWNLOAD_APPLICATION,
  UPDATE_MGP_RELEASE,
  DELETE_MGP_RELEASE,
} from "../../route";

export const createMGPRelease =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_MGP_RELEASE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getMgpReleases = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_MGP_RELEASE, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateMGPRelease =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_MGP_RELEASE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const haltRollOutDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(MGP_RELEASE_HALF_ROLL_OUT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateRollOutDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(MGP_RELEASE_UPDATE_ROLL_OUT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//-------------------------------- download Application -----------------------------------

export const createDownloadApplication =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_DOWNLOAD_APPLICATION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getDownloadApplication =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_DOWNLOAD_APPLICATION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateDownloadApplication =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_DOWNLOAD_APPLICATION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteDownloadApplication =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_DOWNLOAD_APPLICATION, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const activeDeactivateMgpReleases =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVE_DEACTIVATE_MGP_RELEASE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteMgpReleases =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_MGP_RELEASE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
