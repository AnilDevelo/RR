//GET_SDK_VERSION_LIST
let init = {
    sdkVersion:{
        sdkVersionList:[],
        limit:5,
        page:0,
        totalDocs:0,
        totalPages:0
    },
}
export const SDKManagementReducer = (state=init,{type,payload}) =>{
    switch (type) {
        case 'GET_SDK_VERSION_LIST': {
            return {
                ...state,
                sdkVersion: {
                    sdkVersionList: payload?.docs,
                    totalDocs: payload?.totalDocs,
                    totalPages: payload?.totalPages,
                    limit: payload?.limit,
                    page: payload?.page - 1
                }
            }
        }
        case 'UPDATE_SDK_VERSION_LIST':{
            let temp = {...state}
            let index = temp?.sdkVersion.sdkVersionList.findIndex(item=>item.id === payload.id)
            if(index > -1){
                temp.sdkVersion.sdkVersionList[index] = payload
            }
            return temp
        }
        default: {
            return state
        }
    }
}