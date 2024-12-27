import {combineReducers} from "redux";
import userReducer from "../user/reducer";
import gameReducer from "../games/reducer";
import errorReducer from "../errorReducer/reducer";
import adminUserReducer from "../AdminUser/reducer";
import avatarReducer from "../Avatar/reducer";
import settingReducer from "../settings/reducer";
import {SDKManagementReducer} from "../SDKManagement/reducer";
import {authReducer} from "../auth/reducer";
import analyticsReducer from "../AnalyticsReport/reducer";
import footerReducer from "Redux/Design/reducer";

export default combineReducers({
    authReducer,
    userReducer,
    gameReducer,
    errorReducer,
    adminUserReducer,
    avatarReducer,
    settingReducer,
    SDKManagementReducer,
    analyticsReducer,
    footerReducer,
})