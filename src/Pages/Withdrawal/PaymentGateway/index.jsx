import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import DepositPaymentGateway from "./DepositPaymentGateway";
import WithdrawalPaymentGateway from "./WithdrawalPaymentGateway";
import {getPaymentGatewaySettings} from "../../../Redux/Master/action";
import {useDispatch} from "react-redux";

const PaymentGateway = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    useEffect(() => {
        getPaymentGatewayDetails();
    }, [])
    const getPaymentGatewayDetails = () => {
        setLoader(true);
        dispatch(getPaymentGatewaySettings({})).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: Object?.keys(res?.data?.data || {}).length > 0 ? [res?.data?.data] : [],
            })
        });
    };

    return (
        <>
            <div className={'monthly-refer-earn-details-table'}>
                <DepositPaymentGateway getPaymentGatewayDetails={getPaymentGatewayDetails} rowData={rowData} loader={loader}/>
                <WithdrawalPaymentGateway getPaymentGatewayDetails={getPaymentGatewayDetails} rowData={rowData}/>
            </div>
        </>
    );
}
export default PaymentGateway