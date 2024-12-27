const initialState = {
  userList: {
    limit: 5,
    page: 0,
    list: [],
    totalDocs: 0,
  },
  userProfile: {},
  gameStatistics: [],
  userOverView: {},
  noteList: {
    limit: 5,
    page: 0,
    list: [],
    totalDocs: 0,
  },
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "USER_DATA_DETAILS": {
      const getAllState = payload?.getAllState;
      getAllState.unshift("All States");
      return {
        ...state,
        userList: {
          limit: payload.limit,
          page: payload.page,
          totalDocs: payload?.totalDocs,
          list: payload.docs,
          stateOptions: getAllState || []
        },
      };
    }
    case "USER_BLOCK_DETAILS": {
      let temp = [...state.userList.list];
      let index = temp.findIndex((item) => item.id === payload.id);
      if (index > -1) {
        temp[index].isBlock = payload.isBlock;
      }
      return {
        ...state,
        userList: {
          ...state.userList,
          list: temp,
        },
      };
    }
    case "USER_PROFILE_DETAILS": {
      return {
        ...state,
        userProfile: payload,
      };
    }
    case "USER_UPDATE_PROFILE": {
      return {
        ...state,
        userProfile: payload,
      };
    }
    case "USER_DETAILS_GAME_STATICS": {
      return {
        ...state,
        gameStatistics: Object.keys(payload)?.length ? [payload] : [],
      };
    }
    case "USER_DETAILS_OVERVIEW": {
      let keys = Object.keys(payload);
      let analyticsData = {};
      keys?.map((name) => {
        let mergedData = payload[name].reduce((acc, cur) => {
          let dataKeys = Object.keys(cur);
          let temp = {};
          temp = dataKeys.reduce((pre, next) => {
            return Object.keys(acc).length > 0
              ? { ...pre, [next]: [cur[next], ...acc[next]] }
              : { ...pre, [next]: [cur[next]] };
          }, {});
          return { ...acc, ...temp };
        }, {});
        analyticsData = { ...analyticsData, [name]: { ...mergedData } };
      });
      return { ...state, userOverView: { ...analyticsData } };
    }
    case "GET_NOTE_DATA_LIST": {
      return {
        ...state,
        noteList: {
          ...state.noteList,
          list: payload.docs,
          totalDocs: payload.totalDocs,
        },
      };
    }
    case "UPDATE_NOTE_DATA": {
      let temp = { ...state };
      let index = temp.noteList.list.findIndex(
        (item) => item.id === payload.id
      );
      if (index > -1) {
        temp.noteList.list[index] = payload;
      }
      return temp;
    }
    case "UPDATE_DEPOSITS_CASH": {

      let user = {
        ...state.userProfile,
        ...payload.userData,
        // cash:payload?.userData?.cash,
        totalCash: payload.totalCash,
      };
      return {
        ...state,
        userProfile: user,
      };
    }
    case "UPDATE_COINS": {
      let user = {
        ...state.userProfile,
        ...payload.userData,
        coins: payload.coins,
        totalCash: payload.totalCash,
      };
      return {
        ...state,
        userProfile: user,
      };
    }
    case "UPDATE_WIN_CASH": {
      let user = {
        ...state.userProfile,
        ...payload.userData,
        winCash: payload?.userData.winCash,
        totalCash: payload.totalCash,
      };
      return {
        ...state,
        userProfile: user,
      };
    }
    default:
      return state;
  }
}
