let init = {
  agentRoles: {
    list: [],
    limit: 5,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
  },
  agentsSetting: {
    list: [],
    limit: 5,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
  },
  gameRules: {},
  fairRules: {},
  restrictedGeo: {
    list: [],
    limit: 5,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
    country: [],
    state: [],
  },
  flagList:{}
};

const settingReducer = (state = init, { type, payload }) => {
  switch (type) {
    case "GET_AGENTS_DATA": {
      return {
        ...state,
        agentsSetting: {
          list: payload?.docs,
          totalDocs: payload?.totalDocs,
          totalPages: payload?.totalPages,
          limit: payload?.limit,
          page: payload?.page - 1,
        },
      };
    }
    case "GET_AGENT_ROLE": {
      return {
        ...state,
        agentRoles: {
          list: payload?.docs.map((agent) => {
            return {
              id: agent?._id,
              agentRole: agent?.agentRole,
              ...agent?.agentPermission,
            };
          }),
          totalDocs: payload?.totalDocs,
          totalPages: payload?.totalPages,
          limit: payload?.limit,
          page: payload?.page - 1,
        },
      };
    }
    case "GET_GAME_RULES_DATA": {
      return {
        ...state,
        gameRules: payload,
      };
    }
    case "GET_FAIR_PLAY_POLICY_DATA": {
      return {
        ...state,
        fairRules: payload,
      };
    }
    case "GET_RESTRICTED_GEO": {
      return {
        ...state,
        restrictedGeo: {
          ...state.restrictedGeo,
          list: payload?.docs.map((rest) => {
            return { ...rest, action: rest._id };
          }),
          totalDocs: payload?.totalDocs,
          totalPages: payload?.totalPages,
          limit: payload?.limit,
          page: payload?.page - 1,
        },
      };
    }
    case "SET_RESTRICTED_GEO_FIELD": {
      return {
        ...state,
        restrictedGeo: {
          ...state.restrictedGeo,
          [payload.name]: [...payload.data.countryNames],
        },
      };
    }
    case "FLAG_CONFIG_LIST":{
      return {
        ...state,
        flagList: payload
      }
    }
    default: {
      return state;
    }
  }
};

export default settingReducer;
