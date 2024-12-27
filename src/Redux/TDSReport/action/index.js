import {
    ADD_SANDBOX_E_FILE_TDS_RETURN,
    ADD_SANDBOX_PREPARE_TDS_RETURN,
    ADD_SANDBOX_TDS_FORM_16A,
    ADD_TDS_CHALLAN_DETAILS,
    ADD_TDS_CONFIG,
    ADD_TDS_FILLING,
    ADD_TDS_RESPONSIBLE_PERSON,
    CHECK_STATUS_SANDBOX_E_FILE_TDS_RETURN,
    CHECK_STATUS_SANDBOX_PREPARE_TDS_RETURN,
    DISTRIBUTION_UPLOAD_FORM_16A_PDF,
    DOWNLOAD_SANDBOX_TDS_FORM_16A,
    DOWNLOAD_SANDBOX_TDS_FORM_16A_STATUS,
    EXPORT_CHALAN_FILE,
    GET_ALL_TDS_FAQ_TYPE,
    GET_ALL_USER_WISE_TDS_REPORT,
    GET_DISTRIBUTION_UPLOAD_FORM_16A_PDF,
    GET_GAME_WISE_TDS_REPORT,
    GET_GAME_WISE_USER_TDS_REPORT,
    GET_PARTICULAR_USER_WISE_TDS_REPORT, GET_SANDBOX_E_FILE_TDS_RETURN, GET_SANDBOX_PREPARE_TDS_RETURN, GET_SANDBOX_TDS_FORM_16A, GET_TDS_CHALLAN, GET_TDS_CHALLAN_DETAILS, GET_TDS_CONFIG, GET_TDS_FAQS, GET_TDS_FILLING, GET_TDS_RESPONSIBLE_PERSON, UPDATE_TDS_CHALLAN_DETAILS, UPLOAD_SANDBOX_E_FILE_TDS_RETURN_CSI_FILE, UPLOAD_SANDBOX_E_FILE_TDS_RETURN_TXT_FILE, UPLOAD_SANDBOX_PREPARE_TDS_RETURN_EXCEL_FILE, VIEW_ALL_USER_WISE_TDS_REPORT
} from "../../route";

export const getGameWiseTdsReportList =
  (payload) => async (dispatch, getState, api) => {
    return await api
      .post(GET_GAME_WISE_TDS_REPORT, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

export const getGameWiseUserTDSReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_GAME_WISE_USER_TDS_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getParticularUserTDSReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_PARTICULAR_USER_WISE_TDS_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getTDSUserWiseReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_ALL_USER_WISE_TDS_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getTDSUserWiseViewGameReportList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(VIEW_ALL_USER_WISE_TDS_REPORT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };


export const AddTDSConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TDS_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getTDSConfig =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_CONFIG, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const addChallanTDSDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TDS_CHALLAN_DETAILS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getChallanTDSDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_CHALLAN_DETAILS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const updateChallanTDSDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_TDS_CHALLAN_DETAILS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getChallanExportFileDetails =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(EXPORT_CHALAN_FILE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    export const getTdsChallanList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_CHALLAN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getTDSFilling =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_FILLING, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getResponsiblePerson =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_RESPONSIBLE_PERSON, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const addTDSFilling =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TDS_FILLING, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const addResponsiblePerson =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_TDS_RESPONSIBLE_PERSON, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const addSandboxPrepareTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_SANDBOX_PREPARE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getSandboxPrepareTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_SANDBOX_PREPARE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const uploadSandboxPrepareTDSReturnExcelFile =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPLOAD_SANDBOX_PREPARE_TDS_RETURN_EXCEL_FILE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const checkStatusSandboxPrepareTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(CHECK_STATUS_SANDBOX_PREPARE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getSandboxEFileTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_SANDBOX_E_FILE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addSandboxEFileTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_SANDBOX_E_FILE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const uploadSandboxEFileTDSReturnTXTFile =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPLOAD_SANDBOX_E_FILE_TDS_RETURN_TXT_FILE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const checkStatusSandboxEFileTDSReturn =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(CHECK_STATUS_SANDBOX_E_FILE_TDS_RETURN, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };    

    export const uploadSandboxEFileTDSReturnCSIFile =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPLOAD_SANDBOX_E_FILE_TDS_RETURN_CSI_FILE, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const getSandboxTDSForm16A =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_SANDBOX_TDS_FORM_16A, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addSandboxTDSForm16A =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_SANDBOX_TDS_FORM_16A, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const downloadSandboxTDSForm16A =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DOWNLOAD_SANDBOX_TDS_FORM_16A, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const downloadSandboxTDSForm16AStatus =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DOWNLOAD_SANDBOX_TDS_FORM_16A_STATUS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

    export const DistributionUploadForm16APDF =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DISTRIBUTION_UPLOAD_FORM_16A_PDF, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getDistributionUploadForm16APDF =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_DISTRIBUTION_UPLOAD_FORM_16A_PDF, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

//TDSFAQs
    export const getTDSFAQs =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_TDS_FAQS, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

        //TDS
        export const getAllTDSFAQsType =
        (payload) => async (dispatch, getState, api) => {
            return await api
                .post(GET_ALL_TDS_FAQ_TYPE, payload)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err.response;
                });
        };