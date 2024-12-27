//getStorePackages


export const getStorePackListing = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("getStorePackages", payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"GET_STORE_PACK_LIST",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//storePackage
export const updateStorePackDetails = (payload) => async (dispatch, getState, api) => {
    return await api
        .put("storePackage", payload)
        .then((res) => {
            if(res.status === 200){
                dispatch({
                    type:"UPDATE_STORE_PACK_LIST",
                    payload:res.data.data
                })
            }
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};
//deleteStorePack
export const deleteStorePack = (payload) => async (dispatch, getState, api) => {
    return await api
        .delete("storePackage", {data:payload})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};

//createStorePack
export const createStorePack = (payload) => async (dispatch, getState, api) => {
    return await api
        .post("storePackage", payload)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
};