import {
  ADD_POPULAR_GAME,
  ADD_UPCOMING_GAME,
  DELETE_UPCOMING_GAME,
  GET_POPULAR_GAME,
  GET_UPCOMING_GAME,
  SWAP_POSITION_UPCOMING_GAME,
  UPDATE_UPCOMING_GAME,
  LIVE_GAME,
  GET_LIVE_GAME,
} from "../../route";

export const getPopularGames = (payload) => async (dispatch, getState, api) => {
  return await api
    .post("mgpPopularGame/mgpGetPopularGames", payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

// export const getGameForPopularGamesList =
//   (payload) => async (dispatch, getState, api) => {
//     return await api
//       .post("mgpPopularGame/getGameForPopularGames", payload)
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   };

export const updatePopularGame =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put("mgpPopularGame", payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deletePopularGame =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete("mgpPopularGame", { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createPopularGames =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_POPULAR_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getPopularGamesDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_POPULAR_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createUpcomingGames =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_UPCOMING_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getUpcomingGamesDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_UPCOMING_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const swapPositionUpcomingGames =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(SWAP_POSITION_UPCOMING_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateUpcomingGamesDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_UPCOMING_GAME, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteUpcomingGamesDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_UPCOMING_GAME, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//----------------------default games -------------------//

export const swapPositionDefaultGames =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post("mgpPopularGame/swapPosition", payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

// _______________________________live game____________________________//
export const livegame = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(LIVE_GAME, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteLivegame = (payload) => async (dispatch, getState, api) => {
  return await api
    .delete("LiveGame", { data: payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const swapPositionLiveGame = (payload) => async (dispatch, getState, api) => {
  return await api
      .post('liveGame/swapPosition', payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const getLivegame = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_LIVE_GAME, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
  
export const getLiveGamesList = (payload) => async (dispatch, getState, api) => {
  return await api
      .post("liveGame/getLiveGame", payload)
    .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const addPopularGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("LiveGame", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteLiveGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete("LiveGame", {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getGameForPopularGamesList = (payload) => async (dispatch, getState, api) => {
  return await api
      .post("game/getActiveGameDropdown", payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};