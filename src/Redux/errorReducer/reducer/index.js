let init ={
    data: {},
    open: false
};

const errorReducer = (state = init,{type,payload})=>{
    switch (type) {
        case 'UPDATE_ERROR_MODAL' :{
            return {
                ...state,
                ...payload
            }
        }
        default:{
            return state
        }
    }
};

export default errorReducer