import React, {useEffect, useState} from "react";
import DeleteUserRules from "./DeleteUserRules";
import DeleteTermCondition from "./DeleteTermCondition";
import {getDeleteUserPolicyList} from "../../../../Redux/Documentation/action";
import {useDispatch} from "react-redux";
import Loader from "../../../../images/Loader";
import TableLoader from "hoc/CommonTable/TableLoader";

const DeleteUserPolicy = () => {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState({});
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        getDeleteAccountPolicyData();
    }, []);

    const getDeleteAccountPolicyData = () => {
        setLoader(true);
        dispatch(getDeleteUserPolicyList({})).then(res => {
            setLoader(false);
            //Object?.keys(res?.data.data || {})?.length > 0 ? [res?.data.data] : []
            setRowData(res?.data.data)
        });
    };

    return(
        <>
            {loader ? <TableLoader /> : ""}
            <DeleteTermCondition rowData={rowData} getDeleteTermConditionData={getDeleteAccountPolicyData}/>
            <DeleteUserRules rowData={rowData} getDeleteUserPolicyData={getDeleteAccountPolicyData}/>
        </>
    )
}
export default DeleteUserPolicy