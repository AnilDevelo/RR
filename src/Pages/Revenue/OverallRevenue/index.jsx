import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { revenueOverAll } from "../../../Redux/revenue/action";
import { currencyFormat } from "../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";

const OverallRevenue = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list:{}, totalDocs: 0, walletWiseBonus: {} });

    useEffect(() => {
        getOverAllRevenueDetails()
    }, [ ]);

    const getOverAllRevenueDetails = () => {
        setLoader(true);
        dispatch(revenueOverAll({})).then(res => {
            setLoader(false);
            if (res?.data?.data === null) {
                setRowData({ ...rowData, list: {} });
            } else {
                setRowData({ ...rowData, list: res.data.data?.revenueReportTotal, walletWiseBonus:res?.data?.data?.wallteWiseBonus });
            }

        });
    };

    return (
        <Box className={'overall_revenue'}>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'overall_revenue_outerBox'}>
                    <div className={'overall_revenue_box'}>
                        <h4>Total Amount</h4>
                        <p>{currencyFormat(rowData?.list?.totalEarningRevenue)}</p>
                    </div>
                    <div className={'devider'}> - </div>
                    <div className={'overall_revenue_box'}>
                        <h4>Total  Bonus</h4>
                        <p>{currencyFormat(rowData?.wallteWiseBonus?.totalCreditedAmount)}</p>
                    </div>
                    <div className={'devider'}> + </div>
                    <div className={'overall_revenue_box'}>
                        <h4>Withdrawal Processing Fees</h4>
                        <p>{currencyFormat(rowData?.list?.totalWithdrawProcessingFee)}</p>
                    </div>
                    <div className={'devider'}> = </div>
                    <div className={'overall_revenue_box'}>
                        <h4>Total Profit</h4>
                        <p>{currencyFormat(rowData?.list?.totalProfit)}</p>
                    </div>
                </div>
            </Paper>
            {/*<Paper sx={{ mb: 2 }} className="outer-box">*/}
            {/*    <div className={'overall_revenue_outerBox'}>*/}
            {/*        <div className={'overall_revenue_box'}>*/}
            {/*            <h4>Total Deposit Amount</h4>*/}
            {/*            <p>{rowData?.wallteWiseBonus?.totalCredetedDepositCash || 0}</p>*/}
            {/*        </div>*/}
            {/*        <div className={'overall_revenue_box'}>*/}
            {/*            <h4>Total Winning Amount</h4>*/}
            {/*            <p>{rowData?.wallteWiseBonus?.totalCrededitedWinCash || 0}</p>*/}
            {/*        </div>*/}
            {/*        <div className={'overall_revenue_box'}>*/}
            {/*            <h4>Total Bonus Amount</h4>*/}
            {/*            <p>{currencyFormat(rowData?.wallteWiseBonus?.totalCreadetedBonus)}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Paper>*/}

            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'overall_revenue_outerBox'}>
                    <div className={'overall_revenue_box'}>
                        <h4>Total Active Game</h4>
                        <p>{rowData?.list?.totalActiveGame || 0}</p>
                    </div>
                    <div className={'overall_revenue_box'}>
                        <h4>Total Active User</h4>
                        <p>{rowData?.list?.totalActiveUser || 0}</p>
                    </div>
                    <div className={'overall_revenue_box'}>
                        <h4>Total TDS Amount</h4>
                        <p>{currencyFormat(rowData?.list?.totalTDSAmount)}</p>
                    </div>
                    {/*<div className={'overall_revenue_box'}>*/}
                    {/*    <h4>Total Add Cash (Deposit)</h4>*/}
                    {/*    <p>{currencyFormat(rowData?.list?.totalAddDepositCash)}</p>*/}
                    {/*</div>*/}
                </div>
                {/*<div className={'overall_revenue_outerBox mt_1'}>*/}
                {/*    <div className={'overall_revenue_box'}>*/}
                {/*        <h4>Total  Winning Amount</h4>*/}
                {/*        <p>{currencyFormat(rowData?.list?.totalwininigAmount)}</p>*/}
                {/*    </div>*/}
                {/*    <div className={'overall_revenue_box'}>*/}
                {/*        <h4>Total TDS Amount</h4>*/}
                {/*        <p>{currencyFormat(rowData?.list?.totalTDSAmount)}</p>*/}
                {/*    </div>*/}
                {/*    /!*<div className={'overall_revenue_box'}>*!/*/}
                {/*    /!*    <h4>Total Net Credited Amount</h4>*!/*/}
                {/*    /!*    <p>{currencyFormat(rowData?.list?.totalNetCreditedAmount)}</p>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}
                {/*<div className={'overall_revenue_outerBox mt_1'}>*/}
                {/*    <div className={'overall_revenue_box'}>*/}
                {/*        <h4>Total Withdrawal Cash</h4>*/}
                {/*        <p>{currencyFormat(rowData?.list?.totalWithdrawalCash)}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Paper>
        </Box>
    );
};
export default OverallRevenue;