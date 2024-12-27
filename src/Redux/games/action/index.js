import { jsonToFormData } from "../../../utils";
import {
    ACTIVE_DEACTIVATE_GAME_LOBBY,
    ACTIVE_DEACTIVATE_GAME_STATUS,
    ACTIVE_DEACTIVATE_NUMBER_OF_PLAYER_LIST,
    ACTIVE_GAME_DROPDOWN,
    ADD_GAME_CONFIG_LIST,
    ADD_GAME_DUMMY_PLAYER_LIST,
    ADD_GAME_LIST,
    ADD_GAME_LOBBY,
    ADD_GAME_MODE_DESIGN_LIST_CONFIG,
    ADD_GAME_MODE_LIST, ADD_GAME_MODE_WISE_GAME_SERVER_LINK,
    ADD_GAME_MONTHLY_LEADERBOARD_CONFIG,
    ADD_GAME_MONTHLY_LEADERBOARD_MAX_BONUS_AMOUNT,
    ADD_GAME_MONTHLY_LEADERBOARD_RANK,
    ADD_GAME_MONTHLY_LEADERBOARD_RELEASE_DATE,
    ADD_GAME_PLAYING_TRACKING_LIST,
    ADD_GAME_RADIUS_LOCATION_LIST,
    ADD_GAME_RELEASE_LIST,
    ADD_HOW_TO_PLAY_LIST,
    ADD_IMAGE_SLIDER_HOW_TO_PLAY,
    ADD_IMAGE_SLIDER_MGP_HOW_TO_PLAY,
    ADD_MGP_HOW_TO_PLAY,
    ADD_NUMBER_OF_DECK_LIST,
    ADD_NUMBER_OF_PLAYER_LIST, ADD_TOURNAMENT_LOBBY,
    ARCHIVED_GAME_STATUS,
    DELETE_GAME_BUILD_LIST,
    DELETE_GAME_LOBBY,
    DELETE_GAME_MODE_LIST, DELETE_GAME_MONTHLY_LEADERBOARD_RANK,
    DELETE_HOW_TO_PLAY_LIST,
    DELETE_IMAGE_SLIDER_HOW_TO_PLAY,
    DELETE_IMAGE_SLIDER_MGP_HOW_TO_PLAY,
    DELETE_MGP_HOW_TO_PLAY,
    DELETE_NUMBER_OF_PLAYER_LIST,
    GET_ALL_GAME_NAME,
    GET_GAME_BUILD_LIST,
    GET_GAME_CONFIG_LIST,
    GET_GAME_DUMMY_PLAYER_LIST,
    GET_GAME_HISTORY,
    GET_GAME_LEADERBOARD_RANK,
    GET_GAME_LIST,
    GET_GAME_LOBBY,
    GET_GAME_MODE_DESIGN_LIST_CONFIG,
    GET_GAME_MODE_LIST, GET_GAME_MODE_WISE_GAME_SERVER_LINK,
    GET_GAME_MONTHLY_LEADERBOARD_RANK,
    GET_GAME_OVERVIEW_DETAIL,
    GET_GAME_PLAYING_TRACKING_LIST,
    GET_GAME_RADIUS_LOCATION_LIST,
    GET_GAME_RELEASE_LIST,
    GET_GAME_SETUP_STATUS,
    GET_HOW_TO_PLAY_LIST,
    GET_NUMBER_OF_DECK_LIST,
    GET_NUMBER_OF_PLAYER_LIST, GET_PLAYER_RECORD_LIST, GET_TOURNAMENT_LOBBY,
    GET_UNIQUE_MGP_RELEASE,
    REFUND_GAME_HISTORY,
    SINGLE_GAME_DETAILS_LIST,
    SWAP_POSITION_GAME_MODE_LIST,
    SWAP_POSITION_NUMBER_OF_PLAYER_LIST,
    UPDATE_GAME_BUILD_LIST,
    UPDATE_GAME_LIST,
    UPDATE_GAME_LOBBY,
    UPDATE_GAME_MODE_LIST, UPDATE_GAME_MODE_WISE_GAME_SERVER_LINK, UPDATE_GAME_MONTHLY_LEADERBOARD_RANK,
    UPDATE_GAME_RELEASE_LIST,
    UPDATE_GAME_SETUP_INFO,
    UPDATE_GAME_STATUS_LIST,
    UPDATE_NUMBER_OF_PLAYER_LIST,
    UPLOAD_GAME_BUILD,
    VIEW_PLAYER_RECORD_LIST
} from "../../route";

export const getGameList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GAME_LIST, payload)
    .then((res) => {
      if (res.status === 200 && typeof res?.data?.data?.filePath !== "string") {
        dispatch({
          type: "GAME_LIST",
          payload: res?.data.data,
        });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const addGame = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_GAME_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateGame = (payload) => async (dispatch, getState, api) => {
  return await api
    .put(UPDATE_GAME_LIST, jsonToFormData(payload))
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateGameStatus =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(UPDATE_GAME_STATUS_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateGameStatusActiveDeactivated =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVE_DEACTIVATE_GAME_STATUS, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const archivedGameStatus =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ARCHIVED_GAME_STATUS, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getSingleGameDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(SINGLE_GAME_DETAILS_LIST, payload)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: "SINGLE_GAME_DETAILS",
            payload: res.data.data,
          });
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createGameLobby =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_GAME_LOBBY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateGameLobby =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_GAME_LOBBY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getGameLobbyList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_LOBBY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteGameLobbyList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_GAME_LOBBY, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const ActivateDeactivateLobbyList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVE_DEACTIVATE_GAME_LOBBY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getGameOverViewDetails =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_OVERVIEW_DETAIL, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateGameInfo = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(UPDATE_GAME_SETUP_INFO, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getOptimizeStatus =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_SETUP_STATUS, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getAllGameList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_ALL_GAME_NAME, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getGameServerLinkModeWise = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_GAME_MODE_WISE_GAME_SERVER_LINK, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const addGameServerLinkModeWise = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_GAME_MODE_WISE_GAME_SERVER_LINK, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateGameServerLinkModeWise = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_GAME_MODE_WISE_GAME_SERVER_LINK, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteGameServerLinkModeWise = (payload) => async (dispatch, getState, api) => {
  return await api
      .delete(ADD_GAME_MODE_WISE_GAME_SERVER_LINK, {data:payload})
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
///------------------------------------GameBuild ------------------------------------------
export const uploadGameBuild = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(UPLOAD_GAME_BUILD, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const getGameBuildsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_BUILD_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteGameBuildsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_GAME_BUILD_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateGameBuild = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_GAME_BUILD_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getUniqueMgpReleases =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_UNIQUE_MGP_RELEASE, payload)
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: "GET_GAME_BUILD_MPG_RELEASES_LIST",
            payload: res.data?.data,
          });
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//---------------------------------------------Game Release------------------------------------------------------

export const getGameReleaseList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_RELEASE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createGameReleaseList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_GAME_RELEASE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateGameReleaseList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_GAME_RELEASE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//======================= Game MOde=================
export const createGameModeList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_GAME_MODE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getGameModeList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GAME_MODE_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateGameModeList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_GAME_MODE_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteGameModeList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_GAME_MODE_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const uploadSliderImagePlay =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_IMAGE_SLIDER_HOW_TO_PLAY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteSliderImagePlay =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_IMAGE_SLIDER_HOW_TO_PLAY, {data: payload})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addHowToPlay = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_HOW_TO_PLAY_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getHowToPlay = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_HOW_TO_PLAY_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const deleteHowToPlay = (payload) => async (dispatch, getState, api) => {
  return await api
    .delete(DELETE_HOW_TO_PLAY_LIST, { data: payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
///--------------------------------Number of Decks -------------------------------------]
export const createGameNumberOfDeck =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_NUMBER_OF_DECK_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getGameNumberOfDeck =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NUMBER_OF_DECK_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

///--------------------------------Number of Players -------------------------------------]
export const createGameNumberOfPlayers =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_NUMBER_OF_PLAYER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateGameNumberOfPlayers =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_NUMBER_OF_PLAYER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteGameNumberOfPlayers =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_NUMBER_OF_PLAYER_LIST, {data:payload})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getGameNumberOfPlayer =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NUMBER_OF_PLAYER_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const activeDeactivateGameNumberOfPlayers =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ACTIVE_DEACTIVATE_NUMBER_OF_PLAYER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const swapPositionNumberOfPlayerGames = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(SWAP_POSITION_NUMBER_OF_PLAYER_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const swapPositionGameModes = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(SWAP_POSITION_GAME_MODE_LIST, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
///-------------------------------- game Config -------------------------------------]
export const gameConfigList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GAME_CONFIG_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const createGameConfigList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_GAME_CONFIG_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
///-------------------------------- game Mode design Config -------------------------------------]
export const gameModeDesignConfigList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_GAME_MODE_DESIGN_LIST_CONFIG, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const createGameModeDesignConfigList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_MODE_DESIGN_LIST_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
///-------------------------------- game Radius Location  -------------------------------------]

export const createGameRadiusLocation =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_RADIUS_LOCATION_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getGameRadiusLocation =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GAME_RADIUS_LOCATION_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

///-------------------------------- game Dummy Player  -------------------------------------]

export const createGameDummyPlayer =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_DUMMY_PLAYER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getGameDummyPlayer =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GAME_DUMMY_PLAYER_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//--------------------------------- MGP How to play ------------------------------------------------------------
export const uploadMGPSliderImagePlay =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_IMAGE_SLIDER_MGP_HOW_TO_PLAY, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteMGPSliderImagePlay =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_IMAGE_SLIDER_MGP_HOW_TO_PLAY, {data: payload})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addMGPHowToPlay = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_MGP_HOW_TO_PLAY, payload?.isVideoLink ? payload : jsonToFormData(payload) )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteMGPHowToPlay = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_MGP_HOW_TO_PLAY, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


//------------------------------------------- playing Tracking --------------------------------
export const createGamePlayingTracking =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_PLAYING_TRACKING_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getGamePlayingTracking =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GAME_PLAYING_TRACKING_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getActiveGameDropdown =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ACTIVE_GAME_DROPDOWN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//----------------------------- Game Leaderboard ---------------------------------
export const getGameLeaderboardRankGameConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GAME_MONTHLY_LEADERBOARD_RANK, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addGameMonthlyLeaderboardBonusAmountList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_MONTHLY_LEADERBOARD_MAX_BONUS_AMOUNT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addGameMonthlyLeaderboardBonusReleaseDate =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_MONTHLY_LEADERBOARD_RELEASE_DATE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addGameLeaderboardRank =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_MONTHLY_LEADERBOARD_RANK, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const updateGameLeaderboardRank =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_GAME_MONTHLY_LEADERBOARD_RANK, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteGameLeaderboardRank =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_GAME_MONTHLY_LEADERBOARD_RANK, { data: payload })
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
    
  export const deleteGameTournament =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(ADD_TOURNAMENT_LOBBY, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
  };
    
  export const addGameMonthlyLeaderboardConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_GAME_MONTHLY_LEADERBOARD_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
  };
    
  // ------------------ Game History -------------
export const getGameHistoryList = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(GET_GAME_HISTORY, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const refundGameHistory = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(REFUND_GAME_HISTORY, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

//----------------------- Player record ----------------------
export const getPlayerRecordList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_PLAYER_RECORD_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const viewPlayerRecordList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(VIEW_PLAYER_RECORD_LIST, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };