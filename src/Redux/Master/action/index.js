import { jsonToFormData } from "../../../utils";
import {
    ACTIVATE_DEACTIVATE_UPI_TRANSACTION,
    ACTIVE_DEACTIVATE_PROMOTION_ADS,
    ADD_BANK_LIST,
    ADD_BOT_LIST,
    ADD_GAME_MODE_DESIGN_LIST,
    ADD_LEVEL,
    ADD_LOBBY_TYPE,
    ADD_MGP_ONLINE_PLAYER,
    ADD_NOTIFICATION_LIST,
    ADD_NOTIFICATION_TYPE,
    ADD_PROMOTION_ADS,
    ADD_PROMOTION_ADS_CONFIG,
    ADD_SPLASH_SCREEN_LIST,
    ADD_TAGLINE_SPLASH_SCREEN_LIST,
    ADD_UPI_LIST,
    ADD_UPI_TRANSACTION,
    ADD_WITHDRAWAL_PROCESSING_FEES,
    DELETE_BANK_LIST,
    DELETE_BOT_LIST,
    DELETE_GAME_MODE_DESIGN_LIST,
    DELETE_IMAGE_SLIDER_SPLASH_SCREEN_LIST,
    DELETE_LEVEL,
    DELETE_LOBBY_TYPE,
    DELETE_NOTIFICATION_LIST,
    DELETE_PROMOTION_ADS,
    DELETE_UPI_LIST,
    DELETE_USER_TRANSACTION_QR,
    DELETE_WITHDRAWAL_PROCESSING_FEES,
    DELETE_WITHDRAWAL_PROCESSING_FEES_REPORT,
    GET_BANK_LIST,
    GET_BOT_LIST,
    GET_GAME_MODE_DESIGN_LIST,
    GET_LEVEL,
    GET_LOBBY_TYPE,
    GET_MGP_ONLINE_PLAYER,
    GET_NOTIFICATION_LIST,
    GET_NOTIFICATION_OFFER_DROPDOWN,
    GET_NOTIFICATION_TYPE,
    GET_NOTIFICATION_USER_TYPE_DROPDOWN,
    GET_PROMOTION_ADS,
    GET_PROMOTION_ADS_CONFIG,
    GET_SPLASH_SCREEN_LIST,
    GET_UPI_LIST,
    GET_UPI_TRANSACTION,
    GET_USER_DEPOSIT_REQUEST,
    GET_WITHDRAWAL_PROCESSING_FEES,
    GET_WITHDRAW_MANUALLY_REQUEST,
    UPDATE_BANK_LIST,
    UPDATE_BOT_LIST,
    UPDATE_GAME_MODE_DESIGN_LIST,
    UPDATE_LEVEL,
    UPDATE_LOBBY_TYPE,
    UPDATE_NOTIFICATION_LIST,
    UPDATE_PROMOTION_ADS,
    UPDATE_UPI_LIST,
    UPDATE_WITHDRAWAL_PROCESSING_FEES,
    UPLOAD_IMAGE_SLIDER_SPLASH_SCREEN_LIST,
    APPROVE_REJECT_USER_DEPOSIT_REQUEST,
    GET_PAYMENT_GATEWAY_SETTINGS,
    ADD_PAYMENT_GATEWAY_SETTINGS,
    UPDATE_PAYMENT_GATEWAY_SETTINGS,
    ADD_SPLASH_SCREEN_IMAGE,
    DELETE_SPLASH_SCREEN_IMAGE,
    EDIT_SPLASH_SCREEN_IMAGE,
    GET_SPLASH_SCREEN_IMAGES,
    DELETE_NOTIFICATION_TYPE,
} from "../../route";

//--------------------------------------------------------- Internal Ads Module Api [Start]--------------------------------------------//

export const createInternalAdsConfig =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_PROMOTION_ADS_CONFIG, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getInternalAdsConfig =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_PROMOTION_ADS_CONFIG, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getInternalAdsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_PROMOTION_ADS, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const createInternalAdsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_PROMOTION_ADS, jsonToFormData(payload))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateInternalAdsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_PROMOTION_ADS, jsonToFormData(payload))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteInternalAdsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_PROMOTION_ADS, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const activeDeactivateInternalAdsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVE_DEACTIVATE_PROMOTION_ADS, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//--------------------------------------------------------- Internal Ads Module Api [End]-----------------------------------------------------//

export const getLobbyLabelList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_LOBBY_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addLobbyLabelList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_LOBBY_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateLobbyLabelList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_LOBBY_TYPE, jsonToFormData(payload))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteLobbyLabelList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_LOBBY_TYPE, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//--------------------------------[Start] Bank and UPI -------------------------------------------

export const getWithdrawalUPI =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_UPI_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const addWithdrawalUPI =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_UPI_LIST, jsonToFormData(payload))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateWithdrawalUPI =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_UPI_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteUPIList = (payload) => async (dispatch, getState, api) => {
  return await api
    .delete(DELETE_UPI_LIST, { data: payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const getBankList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_BANK_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const addBankList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_BANK_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateBank = (payload) => async (dispatch, getState, api) => {
  return await api
    .put(UPDATE_BANK_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteBankList = (payload) => async (dispatch, getState, api) => {
  return await api
    .delete(DELETE_BANK_LIST, { data: payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

//--------------------------------[End] Bank and UPI -------------------------------------------

export const addGameModeDesignList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_GAME_MODE_DESIGN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const geGameModeDesign =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_MODE_DESIGN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateGameModeDesignList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_GAME_MODE_DESIGN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteGameModeDesignList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_GAME_MODE_DESIGN_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//--------------------------------------- Splash Screen -----------------------------------
export const createSplashScreen =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(
        ADD_SPLASH_SCREEN_LIST,
        payload?.isVideoLink ? payload : jsonToFormData(payload)
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const createTagLineSplashScreen =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_TAGLINE_SPLASH_SCREEN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getSplashScreenList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_SPLASH_SCREEN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const uploadImageSplashScreen =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(UPLOAD_IMAGE_SLIDER_SPLASH_SCREEN_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteImageSplashScreen =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_IMAGE_SLIDER_SPLASH_SCREEN_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  //splash screen
  export const getAllSplashScreenImages = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_SPLASH_SCREEN_IMAGES, payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"GET_ALL_FOOTERS",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
  export const addSplashScreenImage = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_SPLASH_SCREEN_IMAGE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteSplashScreenImage = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_SPLASH_SCREEN_IMAGE, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const editSplashScreenImage = (payload) => async (dispatch, getState, api) => {
    return await api
    .put(EDIT_SPLASH_SCREEN_IMAGE, payload)
    .then((res) => {
        if(res.status === 200){
            dispatch({
                type:"UPDATE_FOOTER_AVATAR_DATA",
                payload:res.data.data
            })
        }
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};
//----------------------------------------- Bot --------------------------------------------------------
export const addBotList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_BOT_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getBotList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_BOT_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateBotList = (payload) => async (dispatch, getState, api) => {
  return await api
    .put(UPDATE_BOT_LIST, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteBotList = (payload) => async (dispatch, getState, api) => {
  return await api
    .delete(DELETE_BOT_LIST, { data: payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
//-------------------------------------------- MGP Online Player -------------------------------------------

export const createMGPOnlinePlayer =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_MGP_ONLINE_PLAYER, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getMGPOnlinePlayer =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_MGP_ONLINE_PLAYER, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

// --------------------------------- Notification -----------------------------------------

export const createNotificationList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_NOTIFICATION_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getNotificationList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NOTIFICATION_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateNotificationList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_NOTIFICATION_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteNotificationList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_NOTIFICATION_LIST, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

// --------------------------------- Notification User Type -----------------------------------------

export const createNotificationUserTypeList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_NOTIFICATION_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getNotificationUserTypeList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NOTIFICATION_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getNotificationUserTypeDropdownList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NOTIFICATION_USER_TYPE_DROPDOWN, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getOfferDropDownList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_NOTIFICATION_OFFER_DROPDOWN, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//---------------------------------------------- Withdrawal Processing Fees -----------------------------------------

export const createWithdrawalProcessingFees =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_WITHDRAWAL_PROCESSING_FEES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getWithdrawalProcessingFees =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_WITHDRAWAL_PROCESSING_FEES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateWithdrawalProcessingFees =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(UPDATE_WITHDRAWAL_PROCESSING_FEES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteWithdrawalProcessingFees =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_WITHDRAWAL_PROCESSING_FEES, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getWithdrawalProcessingFeesReport =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_WITHDRAWAL_PROCESSING_FEES_REPORT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//--------------------------------------------------------- Level Module Api [Start]--------------------------------------------//

export const getLevelsList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_LEVEL, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const addLevelsList = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_LEVEL, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateLevelsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_LEVEL, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteLevelsList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_LEVEL, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//--------------------------------------------------------- Level Module Api [End]--------------------------------------------//

//--------------------------------------------------------withdrawal module---------------------------------------------------//
export const ApproveRejectUserDepositRequest =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(APPROVE_REJECT_USER_DEPOSIT_REQUEST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getUPITransaction =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_UPI_TRANSACTION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteUserDepositRequest =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(DELETE_USER_TRANSACTION_QR, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getUserDepositRequest =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_USER_DEPOSIT_REQUEST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const getWithdrawalManuallyRequest =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_WITHDRAW_MANUALLY_REQUEST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const activeDeactivateUPITransaction =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ACTIVATE_DEACTIVATE_UPI_TRANSACTION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const addUPITransaction =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_UPI_TRANSACTION, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };


//------------------------------------------- Payment Gateway Settings ----------------------------------------------
export const getPaymentGatewaySettings =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_PAYMENT_GATEWAY_SETTINGS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addPaymentGatewaySettings =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_PAYMENT_GATEWAY_SETTINGS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const UpdatePaymentGatewaySettings =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_PAYMENT_GATEWAY_SETTINGS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
  };
    
  //------------------------------------------ NOTIFICATION TYPE -----------------------------------------------//


export const deleteNotificationType = (payload) => async (dispatch, getState, api) => {
  return await api
      .delete(DELETE_NOTIFICATION_TYPE, { data: payload })
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};