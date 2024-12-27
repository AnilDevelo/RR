import {
  ADD_MAINTENANCE,
  ADD_RESTRICT_GEO,
  ADD_SETTING_CONFIG,
  ADD_SETTING_FLAG_CONFIG,
  CHOOSE_PAYMENT_GATEWAY,
  DELETE_MAINTENANCE,
  DELETE_RESTRICT_GEO,
  GET_ALL_COUNTRIES,
  GET_ALL_STATES,
  GET_COUNTRIES_RESTRICT_GEO_DROPDOWN,
  GET_MAINTENANCE,
  GET_PAYMENT_GATEWAY,
  GET_RESTRICT_GEO,
  GET_SETTING_CONFIG,
  GET_SETTING_FLAG_CONFIG, UPDATE_MAXIMUM_ADD_CASH, UPDATE_MAXIMUM_WITHDRAWAL_CASH,
  UPDATE_MINIMUM_ADD_CASH, UPDATE_MINIMUM_WITHDRAWAL_CASH,
  UPDATE_RESTRICT_GEO,
  UPDATE_SIGN_UP_CASH,
  UPDATE_SIGN_UP_BONUS,
  GET_MAINTENANCE_HISTORY,
  GET_ACTIVE_MAINTENANCE,
  MONTHLY_DEPOSIT_CASH,
  DEFAULT_USER_MONTHLY_DEPOSIT_CASH,
  DEFAULT_USER_DAILY_DEPOSIT_LIMIT,
  GET_BONUS_EXPIRE_CONFIG,
  ADD_BONUS_EXPIRE_CONFIG,
  UPDATE_PLATFORM_COMMISSION_CASE,
  UPDATE_BONUS_EXPIRE_DAYS_CASE,
  UPDATE_GLOBLE_DEPOSIT_CASE,
  UPDATE_GLOBLE_BONUS_CASE,
  UPDATE_GLOBLE_WINNING_CASE,
  GET_GLOBLE_CONFIG,
  UPDATE_GLOBLE_GAME_CASE,
} from "../../route";

export const configList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_SETTING_CONFIG, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const createConfigList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(ADD_SETTING_CONFIG, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  export const updateSignUpCash = (payload) => async (dispatch, getState, api) => {
    return await api.post(UPDATE_SIGN_UP_CASH,payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateSignUpBonus = (payload) => async (dispatch, getState, api) => {
    return await api.post(UPDATE_SIGN_UP_BONUS,payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateMinimumAddCash = (payload) => async (dispatch, getState, api) => {
    return await api.post(UPDATE_MINIMUM_ADD_CASH,payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateMinimumWithdrawCash = (payload) => async (dispatch, getState, api) => {
    return await api.post(UPDATE_MINIMUM_WITHDRAWAL_CASH,payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateMaximumAddCash = (payload) => async (dispatch, getState, api) => {
  return await api.post(UPDATE_MAXIMUM_ADD_CASH,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const updateMaximumWithdrawCash = (payload) => async (dispatch, getState, api) => {
  return await api.post(UPDATE_MAXIMUM_WITHDRAWAL_CASH,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const monthlyDepositCash = (payload) => async (dispatch, getState, api) => {
  return await api.post(MONTHLY_DEPOSIT_CASH,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const defaultUserMonthlyDepositCash = (payload) => async (dispatch, getState, api) => {
  return await api.post(DEFAULT_USER_MONTHLY_DEPOSIT_CASH,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const defaultUserDailyDepositLimit = (payload) => async (dispatch, getState, api) => {
  return await api.post(DEFAULT_USER_DAILY_DEPOSIT_LIMIT,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const UpdatePlatformCommissionCase = (payload) => async (dispatch, getState, api) => {
  return await api.post(UPDATE_PLATFORM_COMMISSION_CASE,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

export const UpdateBonusExpireDaysCase = (payload) => async (dispatch, getState, api) => {
  return await api.post(UPDATE_BONUS_EXPIRE_DAYS_CASE,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};

//GLOBLE CONFIG
export const getGlobleConfigList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_GLOBLE_CONFIG, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const UpdateGameCaseCase = (payload) => async (dispatch, getState, api) => {
  return await api.post(UPDATE_GLOBLE_GAME_CASE,payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
//-----------------------------RestrictGeo[Start] -----------------------------------------------------------------------//
export const getAllCountriesRestrictGeo =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_COUNTRIES_RESTRICT_GEO_DROPDOWN, payload)
      .then((res) => {
        dispatch({
          type: "SET_RESTRICTED_GEO_FIELD",
          payload: { name: "country", data: res.data.data },
        });
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getCountriesRestrictGeo =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_ALL_COUNTRIES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getAllStateRestrictGeo =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_ALL_STATES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const createRestrictGeo =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_RESTRICT_GEO, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getRestrictGeoList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_RESTRICT_GEO, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteRestrictGeoList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_RESTRICT_GEO, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateRestrictGeo =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_RESTRICT_GEO, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//-----------------------------RestrictGeo [End]-----------------------------------------------------------------------//

export const createFlagConfig =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_SETTING_FLAG_CONFIG, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getFlagConfig = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_SETTING_FLAG_CONFIG, {})
    .then((res) => {
      if (res?.data?.success) {
        dispatch({
          type: "FLAG_CONFIG_LIST",
          payload: res?.data?.data?.reduce((acc, cur) => {
            return { ...cur };
          }, {}),
        });
      }
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

// -------------------------- Maintenance --------------------------------------------

export const createMaintenance =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_MAINTENANCE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getMaintenance = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_MAINTENANCE, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteMaintenance =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_MAINTENANCE, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  export const getMaintenanceHistory = (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_MAINTENANCE_HISTORY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
};
  
export const getActiveMaintenance = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_ACTIVE_MAINTENANCE, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
//---------------------------------Payment Gateway-------------------------------//

export const getPaymentGateway =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_PAYMENT_GATEWAY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const createPaymentGateway =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(CHOOSE_PAYMENT_GATEWAY, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

