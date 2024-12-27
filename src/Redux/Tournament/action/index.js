import { ADD_REFUNDRULES_RULES, ADD_TERMSANDCONDITIONS_RULES, ADD_TIMEBONUSRULES_RULES, ADD_TIMEBONUS_RULES, ADD_TOURNAMENT_LEADERBOARD_RULES, ADD_TOURNAMENT_LOBBY, ADD_TOURNAMENT_RULES, CREATE_TOURNAMENT_NOTIFICATION_LIST, CREATE_TOURNAMENT_REGISTRATION, DELETE_TOURNAMENT, DELETE_TOURNAMENT_LIST, DELETE_TOURNAMENT_NOTIFICATION_LIST, GET_LEADERBOARD_TOURNAMENT_LIST, GET_REFUNDRULES_RULES, GET_TERMSANDCONDITIONS_RULES, GET_TIMEBONUSRULES_RULES, GET_TIMEBONUS_RULES, GET_TOURNAMENT_DETAILS_LIST, GET_TOURNAMENT_DETAILS_OF_NOTIFICATIONS, GET_TOURNAMENT_GAMELIST, GET_TOURNAMENT_LEADERBOARD_RULES, GET_TOURNAMENT_LIST, GET_TOURNAMENT_LOBBY, GET_TOURNAMENT_NOTIFICATION_LIST, GET_TOURNAMENT_RULES, UPDATE_TOURNAMENT, UPDATE_TOURNAMENT_NOTIFICATION_LIST, UPDATE_TOURNAMENT_REGISTRATION } from "Redux/route";

export const getTournamentGamelist =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TOURNAMENT_GAMELIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const createTournamentLobby =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TOURNAMENT_LOBBY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    export const updateTournamentLobby =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(ADD_TOURNAMENT_LOBBY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getGameTournamentLobby =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TOURNAMENT_LOBBY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
  
// Tournament Documents Tab
    
export const createTournamentRules =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_TOURNAMENT_RULES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
export const getTournamentRules =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_TOURNAMENT_RULES, {})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
export const createTermsandconditions =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_TERMSANDCONDITIONS_RULES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
export const getTermsandconditions =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_TERMSANDCONDITIONS_RULES, {})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
    export const createRefundRules =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_REFUNDRULES_RULES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
export const getRefundRules =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_REFUNDRULES_RULES, {})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    };
  
    export const createTimeBonusRules =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(ADD_TIMEBONUS_RULES, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      };
    
  export const getTimeBonusRules =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(GET_TIMEBONUS_RULES, {})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const createTournamentLeaderboardRules =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(ADD_TOURNAMENT_LEADERBOARD_RULES, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      };
    
  export const getTournamentLeaderboardRules =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(GET_TOURNAMENT_LEADERBOARD_RULES, {})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

export const UpdateTournament =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .put(UPDATE_TOURNAMENT, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      };
 export const deleteTournament =
      (payload) => async (dispatch, getState, api) => {
        return await api
          .delete(DELETE_TOURNAMENT, { data: payload })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
 export const createTurnamentRegistration =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(CREATE_TOURNAMENT_REGISTRATION, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      };
 export const getTournamentList =
      (payload) => async (dispatch, getState, api) => {
        return await api
          .post(GET_TOURNAMENT_LIST, payload)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
 export const updateTurnamentRegistration =
      (payload) => async (dispatch, getState, api) => {
        return await api
          .put(UPDATE_TOURNAMENT_REGISTRATION, payload)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
 };   

 export const deleteTournamentList =
 (payload) => async (dispatch, getState, api) => {
   return await api
     .delete(DELETE_TOURNAMENT_LIST, { data: payload })
     .then((res) => {
       return res;
     })
     .catch((err) => {
       return err.response;
     });
 };

 export const getTournamentDetails =
 (payload) => async (dispatch, getState, api) => {
   return await api
     .post(GET_TOURNAMENT_DETAILS_LIST, payload)
     .then((res) => {
       return res;
     })
     .catch((err) => {
       return err.response;
     });
 };

//----------------------------------- TOURNAMENT NOTIFICATIONS --------------------------------//

export const createTournamentNotificationList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(CREATE_TOURNAMENT_NOTIFICATION_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  export const getTournamentDetailsOfNotifications =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TOURNAMENT_DETAILS_OF_NOTIFICATIONS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getTournamentNotificationList =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .post(GET_TOURNAMENT_NOTIFICATION_LIST, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    export const deleteTournamentNotificationList =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .delete(DELETE_TOURNAMENT_NOTIFICATION_LIST, { data: payload })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const updateTournamnetNotificationList =
    (payload) => async (dispatch, getState, api) => {
      return await api
        .put(UPDATE_TOURNAMENT_NOTIFICATION_LIST, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };    

    export const getLeaderboardTournamentList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_LEADERBOARD_TOURNAMENT_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };