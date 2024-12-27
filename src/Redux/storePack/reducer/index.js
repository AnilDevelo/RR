let init ={
    storeList:{
        storeListTable:[],
        limit:5,
        page:0,
        totalDocs:0,
        totalPages:0
    },
}
const storePackReducer = (state = init,{type,payload})=>{
    switch (type) {
        case 'GET_STORE_PACK_LIST' : {
            return {
                ...state,
                storeList:{
                    storeListTable: payload?.docs,
                    totalDocs:payload?.totalDocs,
                    totalPages:payload?.totalPages,
                    limit: payload?.limit,
                    page:payload?.page - 1
                }
            }
        }
        case 'ADD_STORE_PACK_LIST' : {
            return {
                ...state,
                storeList:{
                    ...state.storeList,
                    storeListTable: [payload , ...state.storeList.storeListTable],
                    totalDocs:Number(state.storeList?.totalDocs) + 1,
                }
            }
        }
        case 'UPDATE_STORE_PACK_LIST':{
            let temp = {...state}
            let index = temp.storeList.storeListTable.findIndex((item)=>item.id === payload._id)
            if(index > -1){
                temp.storeList.storeListTable[index] = payload
            }
            return temp
        }
        case 'DELETE_STORE_PACK':{
            let filters = state.storeList.storeListTable.filter(item =>item.id !== payload.storePackageId)
            return {
                ...state,
                storeList:{
                    ...state.storeList,
                    storeListTable: filters,
                    totalDocs:Number(state.storeList?.totalDocs) - 1,
                }
            }
        }

        default:{
            return state
        }
    }
}

export default storePackReducer