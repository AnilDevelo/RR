import {
    ACTIVE_DEACTIVATE_WEBSITE_GAME_LIST,
    ADD_WEBSITE_ABOUT_LIST, ADD_WEBSITE_FOOTER_TITLE,
    ADD_WEBSITE_GAME_LIST,
    ADD_WEBSITE_HEADER, ADD_WEBSITE_SOCIAL_MEDIA,
    ADD_WEBSITE_WINNER_LIST, ADD_WEBSITE_WINNER_TITLE, DELETE_WEBSITE_ABOUT_LIST, DELETE_WEBSITE_FOOTER_TITLE,
    DELETE_WEBSITE_GAME_LIST,
    DELETE_WEBSITE_HEADER, DELETE_WEBSITE_SOCIAL_MEDIA,
    DELETE_WEBSITE_WINNER_LIST, DELETE_WEBSITE_WINNER_TITLE,
    GET_WEBSITE_ABOUT_LIST, GET_WEBSITE_DOWNLOAD_NUMBER, GET_WEBSITE_FOOTER_TITLE,
    GET_WEBSITE_GAME_LIST,
    GET_WEBSITE_HEADER, GET_WEBSITE_SOCIAL_MEDIA,
    GET_WEBSITE_WINNER_LIST, GET_WEBSITE_WINNER_TITLE,
    SWAP_POSITION_WEBSITE_HEADER,
    UPDATE_WEBSITE_ABOUT_LIST, UPDATE_WEBSITE_FOOTER_TITLE,
    UPDATE_WEBSITE_GAME_LIST,
    UPDATE_WEBSITE_HEADER, UPDATE_WEBSITE_SOCIAL_MEDIA,
    UPDATE_WEBSITE_WINNER_LIST, WEBSITE_GAME_DELETE_SCREENSHOTS, WEBSITE_GAME_UPDATE_SCREENSHOTS
} from "../../route";

export const createWebsiteHeader = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getWebsiteHeaders = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateWebsiteHeader = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteWebsiteHeaderList = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_HEADER, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getWebsiteGamesList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

    export const swapPositionHeaderSlider = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(SWAP_POSITION_WEBSITE_HEADER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const addTopWebsiteGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteTopWebsiteGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_GAME_LIST, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateTopWebsiteGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const activeDeactiveTopWebsiteGame = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ACTIVE_DEACTIVATE_WEBSITE_GAME_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createWinnerList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_WINNER_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getWinnerList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_WINNER_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteWinnerList = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_WINNER_LIST, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateWinnerList = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_WINNER_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createWebsiteAboutList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_ABOUT_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getWebsiteAboutList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_ABOUT_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateWebsiteAboutList = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_ABOUT_LIST, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteWebsiteAboutList = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_ABOUT_LIST, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createWebsiteSocialMedia = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_SOCIAL_MEDIA, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getWebsiteSocialMedia = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_SOCIAL_MEDIA, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const deleteWebSiteSocialMedia = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_SOCIAL_MEDIA, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateWebSiteSocialMedia = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_SOCIAL_MEDIA, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//getDownloadList


export const getDownloadWebsiteNumberList = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_DOWNLOAD_NUMBER, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const webSiteWinnerTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_WINNER_TITLE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const getWebSiteWinnerTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_WINNER_TITLE, {})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteWebSiteWinnerTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_WINNER_TITLE, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const createWebSiteFooterTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(ADD_WEBSITE_FOOTER_TITLE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const getWebSiteFooterTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .post(GET_WEBSITE_FOOTER_TITLE, {})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateWebSiteFooterTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(UPDATE_WEBSITE_FOOTER_TITLE, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};


export const deleteWebSiteFooterTitle = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(DELETE_WEBSITE_FOOTER_TITLE, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const updateScreenshots = (payload) => async (dispatch, getState, api) => {
    return await api
        .put(WEBSITE_GAME_UPDATE_SCREENSHOTS, payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

export const deleteScreenshots = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete(WEBSITE_GAME_DELETE_SCREENSHOTS, {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};