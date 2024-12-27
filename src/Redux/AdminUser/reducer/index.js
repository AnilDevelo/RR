let init = {
  permissionsKey: [],
  adminUserRoleNames: [],
};
const adminUserReducer = (state = init, { type, payload }) => {
  switch (type) {
    case "GET_PERMISSION_KEY": {
      return {
        ...state,
        permissionsKey: payload,
      };
    }
    case "GET_ADMIN_USER_ROLE": {
      return {
        ...state,
        adminUserRoleNames: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default adminUserReducer;
