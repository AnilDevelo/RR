let init = {
  gameAll: {
    list: [],
    limit: 5,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
  },
  genreNamesList: [],
  gameDetails: {},
  gameBuildMPGRelease: [],
};
const gameReducer = (state = init, { type, payload }) => {
  switch (type) {
    case "GAME_LIST": {
      return {
        ...state,
        gameAll: {
          list: payload?.docs,
          totalDocs: payload?.totalDocs,
          totalPages: payload?.totalPages,
          limit: payload?.limit,
          page: payload?.page - 1,
        },
      };
    }
    case "GET_GENRE_NAMES": {
      return {
        ...state,
        genreNamesList: payload,
      };
    }
    case "SINGLE_GAME_DETAILS": {
      return {
        ...state,
        gameDetails: payload,
      };
    }
    case "GET_GAME_BUILD_MPG_RELEASES_LIST": {
      return {
        ...state,
        gameBuildMPGRelease: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
