let init = {
  getAllAvatar: {
    list: [],
    limit: 5,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
  },
};
const avatarReducer = (state = init, { type, payload }) => {
  switch (type) {
    case "GET_ALL_AVATAR": {
      return {
        ...state,
        getAllAvatar: {
          list: payload?.docs,
          totalDocs: payload?.totalDocs,
          totalPages: payload?.totalPages,
          limit: payload?.limit,
          page: payload?.page - 1,
        },
      };
    }
    case "ADD_AVATAR_DATA": {
      if (state?.getAllAvatar.list.length > 0) {
        return {
          ...state,
          getAllAvatar: {
            ...state?.getAllAvatar,
            list: [payload, ...state.getAllAvatar.list],
            totalDocs: state.getAllAvatar?.totalDocs + 1,
          },
        };
      } else {
        return {
          ...state,
          getAllAvatar: {
            ...state?.getAllAvatar,
            list: [payload],
            totalDocs: state.getAllAvatar?.totalDocs + 1,
          },
        };
      }
    }
    case "UPDATE_AVATAR_DATA": {
      let temp = { ...state };
      let index = temp.getAllAvatar.list.findIndex(
        (item) => item.id === payload.id
      );
      if (index > -1) {
        temp.getAllAvatar.list[index] = payload;
      }
      return temp;
    }

    default: {
      return state;
    }
  }
};

export default avatarReducer;
