//CompanyLogo

import {
    ADD_COMPANY_LOGO,
    ADD_LOBBY_TYPE, DELETE_COMPANY_LOGO,
    DELETE_LOBBY_TYPE,
    GET_COMPANY_LOGO,
    GET_LOBBY_TYPE, UPDATE_COMPANY_LOGO,
    UPDATE_LOBBY_TYPE
} from "../../route";
import {jsonToFormData} from "../../../utils";

export const getCompanyLogo =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(GET_COMPANY_LOGO, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const addCompanyLogoList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .post(ADD_COMPANY_LOGO, payload)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
export const updateCompanyLogoList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .put(UPDATE_COMPANY_LOGO, jsonToFormData(payload))
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };

export const deleteCompanyLogoList =
    (payload) => async (dispatch, getState, api) => {
        return await api
            .delete(DELETE_COMPANY_LOGO, { data: payload })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };