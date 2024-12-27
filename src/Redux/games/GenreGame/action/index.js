import {
    ACTIVE_DEACTIVATE_GENRE_LIST,
    ADD_GENRE_LIST,
    DELETE_GENRE_LIST,
    GET_GENRE_LIST,
    GET_GENRE_NAME, UPDATE_GENRE_LIST
} from "../../../route";

export const getGenreNames = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GENRE_NAME, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: "GET_GENRE_NAMES",
          payload: res.data.data.genres,
        });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getGenreList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GENRE_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const genreDeleteCategory =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_GENRE_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const genreActiveCategory =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVE_DEACTIVATE_GENRE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addGenreList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_GENRE_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const editGenreList = (payload) => async (dispatch, getState, api) => {
  return await api
    .put(UPDATE_GENRE_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
