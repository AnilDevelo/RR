const init = {
  agentData: {},
};
export const authReducer = (state = init, { type, payload }) => {
  switch (type) {
    // case 'GET_LOGIN_DETAILS':{
    //    return {
    //        ...state,
    //        agentData: cookies.get('agentData')
    //    }
    // }
    default: {
      return state;
    }
  }
};
