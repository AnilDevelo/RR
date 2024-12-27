import {jsonToFormData} from "../../../utils";
import {
    ADD_CUSTOMER_CARE, ADD_FAQ_QUESTIONS, ADD_FAQ_TITLE, ADD_FAQ_TYPE,
    ADD_HELP_AND_SUPPORT_MESSAGE,
    ADD_HELP_DESK_HEADER,
    ADD_HELP_TICKET_TYPE,
    ADD_SUPPORT_EMAIL,
    ADD_TICKET_TYPE_CONFIG,
    ADD_TICKET_VIDEO,
    ADD_WHATS_APP_SUPPORT,
    DELETE_CUSTOMER_CARE, DELETE_FAQ_QUESTIONS, DELETE_FAQ_TYPE,
    DELETE_HELP_DESK_IMAGE,
    DELETE_HELP_TICKET_TYPE,
    DELETE_IMAGE_SLIDER_TICKET_VIDEO,
    DELETE_SUPPORT_EMAIL, GET_ALL_FAQ_TYPE,
    GET_CUSTOMER_CARE, GET_FAQ_QUESTIONS, GET_FAQ_TITLE, GET_FAQ_TYPE,
    GET_HELP_AND_SUPPORT_LIST,
    GET_HELP_AND_SUPPORT_TYPE_DROPDOWN,
    GET_HELP_TICKET_TYPE,
    GET_SUPPORT_EMAIL,
    GET_TICKET_TYPE_CONFIG,
    GET_TICKET_VIDEO,
    GET_WHATS_APP_SUPPORT,
    MARK_AS_READ,
    UPDATE_CUSTOMER_CARE, UPDATE_FAQ_QUESTIONS, UPDATE_FAQ_TYPE,
    UPDATE_HELP_DESK_HEADER,
    UPDATE_HELP_TICKET_TYPE,
    UPDATE_TICKET_VIDEO,
    UPLOAD_IMAGE_SLIDER_TICKET_VIDEO
} from "../../route";

export const markAsRead = (payload) => async (dispatch, getState, api) => {
  return await api
      .post(MARK_AS_READ, payload)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
};
export const getHelpTicketType =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_HELP_TICKET_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const createHelpTicketType =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_HELP_TICKET_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const updateHelpTicketType =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_HELP_TICKET_TYPE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
export const deleteHelpTicketType =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_HELP_TICKET_TYPE, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

//
export const getHelpAndSupportList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_HELP_AND_SUPPORT_LIST, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addHelpAndSupportMessage =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_HELP_AND_SUPPORT_MESSAGE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getHelpAndSupportEmail =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_SUPPORT_EMAIL, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addHelpAndSupportEmail =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(ADD_SUPPORT_EMAIL, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const deleteHelpAndSupportEmail =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_SUPPORT_EMAIL, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
//----------------------------------------- CustomerCare ----------------------------------------------------
export const getCustomerCare = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(GET_CUSTOMER_CARE, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addCustomerCare = (payload) => async (dispatch, getState, api) => {
  return await api
    .post(ADD_CUSTOMER_CARE, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteCustomerCare =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .delete(DELETE_CUSTOMER_CARE, { data: payload })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const updateCustomerCare =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .put(UPDATE_CUSTOMER_CARE, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const addWhatsAppSupportDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_WHATS_APP_SUPPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getWhatsAppSupportDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_WHATS_APP_SUPPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addTicketsVideoDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TICKET_VIDEO, jsonToFormData(payload))
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const uploadImageTicketImage =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(UPLOAD_IMAGE_SLIDER_TICKET_VIDEO, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getTicketsVideoDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TICKET_VIDEO, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteImageTicketsDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_IMAGE_SLIDER_TICKET_VIDEO, {data:payload})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
  };
    
  export const deleteHelpDeskImage = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_HELP_DESK_IMAGE, { data: payload })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
  };
  export const getTicketTypeConfig =
  (payload) => async (dispatch, getState, api) => {
      return await api
          .post(GET_TICKET_TYPE_CONFIG, payload)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              return err.response;
          });
  };
  export const addTicketTypeConfig =
  (payload) => async (dispatch, getState, api) => {
      return await api
          .post(ADD_TICKET_TYPE_CONFIG, payload)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              return err.response;
          });
  };
  export const createHelpDeskHeader = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_HELP_DESK_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const UpdateTicketsVideoDetails =
(payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_TICKET_VIDEO, jsonToFormData(payload))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
  };
  export const updateHelpDeskHeader = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_HELP_DESK_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//--------------------------------- FAQ TYPE ------------------------------------------------------
export const getHelpFAQType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_FAQ_TYPE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const createHelpFAQType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_FAQ_TYPE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const updateHelpFAQType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_FAQ_TYPE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteHelpFAQType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_FAQ_TYPE, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//--------------------------------- FAQ List ------------------------------------------------------
export const getAllFAQType =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_ALL_FAQ_TYPE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const getHelpFAQQuestionList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_FAQ_QUESTIONS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const createHelpFAQQuestionList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_FAQ_QUESTIONS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const updateHelpFAQQuestionList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_FAQ_QUESTIONS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const deleteHelpFAQQuestionList=
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_FAQ_QUESTIONS, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const createHelpFAQTitle =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_FAQ_TITLE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getFAQTitle =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_FAQ_TITLE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getHelpAndSupportTypeDropdown =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_HELP_AND_SUPPORT_TYPE_DROPDOWN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
