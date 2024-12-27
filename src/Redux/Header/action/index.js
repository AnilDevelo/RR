import {
    ADD_MARK_AS_READ_ALL_NOTIFICATION,
    DELETE_NOTIFICATION,
    GET_NOTIFICATION,
    GET_UNREAD_NOTIFICATION_COUNT, SINGLE_MARK_AS_READ_NOTIFICATION
} from "../../route";

export const getUnreadNotificationCount =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_UNREAD_NOTIFICATION_COUNT, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const getNotifications =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_NOTIFICATION, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };


export const addMarkAllAsReadNotification =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_MARK_AS_READ_ALL_NOTIFICATION, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
//singleMarkAsReadNotification

export const singleMarkAsReadNotification =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(SINGLE_MARK_AS_READ_NOTIFICATION, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteAllNotification =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(DELETE_NOTIFICATION, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };