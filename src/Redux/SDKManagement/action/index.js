//getSdkVersion
export const getSdkVersionDetails = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("getSdkVersion", payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:'GET_SDK_VERSION_LIST',
                    payload : res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//createSDKVersion
export const createSDKVersionData = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("sdk", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
export const updateSDKVersionDetails = (payload) => async (dispatch, getState, api) => {
    return await api
        .put("sdk", payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:'UPDATE_SDK_VERSION_LIST',
                    payload : res?.data?.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//deleteStorePack
export const deleteSDKVersionDetails = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete("sdk", {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
