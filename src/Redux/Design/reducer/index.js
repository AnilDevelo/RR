let init ={
    getAllAvatar:{
        list:[],
        limit:5,
        page:0,
        totalDocs:0,
        totalPages:0
    },
}
const footerReducer = (state = init, { type, payload }) => {
    switch (type) {
        case 'GET_ALL_FOOTERS' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case "UPDATE_FOOTER_AVATAR_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }

        case "UPDATE_HOME_SCREEN_FOOTER_ICON_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }
        case 'GET_ALL_REFER_ICONS' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case "UPDATE_REFER_AND_EARN_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }

        case 'GET_ALL_PAYMENT_SETTINGS' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }

        case "UPDATE_PAYMNET_SETTINGS_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }
        case 'GET_ALL_KYC_SCREEN_ICON' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }

        case "UPDATE_KYC_SCREEN_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }

        case 'GET_ALL_WALLET_ICONS' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case "UPDATE_WALLET_SCREEN_ICON_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }
        case 'GET_ALL_WALLET_IMAGE' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case "UPDATE_WALLET_SCREEN_IMAGE_DATA":{
            let temp = {...state}
            let index = temp.getAllAvatar.list.findIndex(item=>item.id === payload.id);
            if(index > -1){
                temp.getAllAvatar.list[index] = payload
            }
            return temp
        }
        case 'GET_HOME_SCREEN_FOOTER_LOGO' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case 'GET_KYC_SCREEN_IMAGE' :{
            return {
                ...state,
                getAllAvatar:{
                    list: payload,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        default:{
            return state
        }
    }
}

export default footerReducer