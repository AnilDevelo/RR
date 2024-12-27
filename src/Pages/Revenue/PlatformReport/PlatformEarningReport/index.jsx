import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {revenueOverAll} from "../../../../Redux/revenue/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {BootstrapTooltip, currencyFormat} from "../../../../utils";
import AnalyticsFilter from "../../../Analytics/AnalyticFilter";
import moment from "moment";
import TableLoader from "../../../../hoc/CommonTable/TableLoader";
import info from '../../../../assets/images/info.svg'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const PlatformEarningReport = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({});
    const [filterData, setFilterData] = useState({
        monthFilter: null,
        statusValue: "All Days",
    });

    // useEffect(() => {
    //     getOverAllRevenueDetails()
    // }, [filterData?.monthFilter]);

    useEffect(() => {
        if(filterData?.statusValue === 'All Days' || filterData?.monthFilter){
            getOverAllRevenueDetails()
        }
    }, [filterData?.monthFilter, filterData?.statusValue, filterData?.monthFilter]);

    const getOverAllRevenueDetails = () => {
        setLoader(true);
        let payload = {
            year: moment(filterData?.monthFilter).format('YYYY'),
            month:moment(filterData?.monthFilter).format('M')
        }
        dispatch(revenueOverAll(filterData?.statusValue === 'All Days' ? {} : payload)).then(res => {
            setLoader(false);
            if (res?.data?.data === null) {
                setRowData({});
            } else {
                setRowData(res.data.data);
            }
        });
    };
    return (
        <Box className={'overall_revenue'}>
            <Paper sx={{ mb: 2 }} className="outer-box game-rules-section   ">
                {loader && <TableLoader/>}
                <div className={'earning_report d_flex'}>
                 <div className={'overall_revenue_outerBox profit_box_platform w_100'}>
                     <div className={'overall_revenue_box'}>
                         <div className={'overall_revenue_box_img'}>
                             <BootstrapTooltip   title={<div className={'tooltip_details_revenue'}>
                                 <p>Total Credited - Total Debited = Total Profit</p>
                             </div>}>
                                 <img src={info} alt={''} />
                             </BootstrapTooltip>
                         </div>
                         <h4>Total Profit: </h4>
                         <p className={ rowData?.totalProfit?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalProfit)}</p>
                     </div>
                 </div>
                <div className={'w_100'}>
                    <AnalyticsFilter filterData={filterData} setFilterData={setFilterData}
                                     addPropsFilter={{isPlatformReport:true,userPayment: rowData?.list?.length <= 0 }}
                                     plateFormOption = {['All Days','Custom']}
                    />
                </div>
             </div>

                <div className={'profit_box_platform_section mt_2'}>
                    <div className={'overall_revenue_outerBox profit_box_platform profit_box_platform_main  w_100 '}>
                        <div className={'overall_revenue_box overall_amount mt_2'}>
                            <h4>Total Platform Credited Amount : </h4>
                            <p className={ rowData?.totalCredited?.totalCreditedInMgpWallet?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalCredited?.totalCreditedInMgpWallet)}</p>
                        </div>
                    </div>
                    <div className={'overall_revenue_outerBox mt_2'}>
                        <div className={'overall_revenue_box'}>
                            <div className={'overall_revenue_box_img'}>
                                <BootstrapTooltip   title={<div className={'tooltip_details_revenue'}>
                                    <p>Sum of the amount of MGP platform commission transaction records.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                            <h4>Total Amount (MGP Commission)</h4>
                            <p className={ rowData?.totalCredited?.totalEarningRevenue?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalCredited?.totalEarningRevenue)}</p>
                        </div>
                        <div className={'devider'}> + </div>
                        <div className={'overall_revenue_box'}>
                            <div className={'overall_revenue_box_img'}>
                                <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                    <p>Sum of the amount of processing and processed withdrawal fee transaction records.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                            <h4>Withdrawal Processing Fee</h4>
                            <p>{currencyFormat(rowData?.totalCredited?.totalWithdrawProcessingFee)}</p>
                        </div>
                        <div className={'devider'}> + </div>
                        <div className={'overall_revenue_box'}>
                            <div className={'overall_revenue_box_img'}>
                                <BootstrapTooltip   title={<div className={'tooltip_details_revenue'}>
                                    <p>Sum of successfully deposited amount on the wallet transaction record.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                            <h4>Add Cash</h4>
                            <p className={ rowData?.totalCredited?.totalAddDepositCash?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat( rowData?.totalCredited?.totalAddDepositCash)}</p>
                        </div>

                    </div>
                </div>

                <div className={'profit_box_platform_section mt_2'}>
                <div className={'overall_revenue_outerBox profit_box_platform profit_box_platform_main w_100 '}>
                    <div className={'overall_revenue_box overall_amount mt_2'}>
                        <h4>Total Platform Debited Amount : </h4>
                        <p className={ rowData?.totalDebited?.totalDebitedInMgpWallet?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalDebited?.totalDebitedInMgpWallet)}</p>
                    </div>
                </div>
                <div className={'overall_revenue_outerBox mt_2'}>
                    <div className={'overall_revenue_box'}>
                        <div className={'overall_revenue_box_img'}>
                            <BootstrapTooltip   title={<div className={'tooltip_details_revenue'}>
                                <p>Sum of the amount of processed withdrawal fee transaction records.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <h4>Withdrawal</h4>
                        <p className={ rowData?.totalDebited?.totalWithdrawalCash?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalDebited?.totalWithdrawalCash)}</p>
                    </div>
                    <div className={'devider'}> + </div>
                    <div className={'overall_revenue_box'}>
                        <div className={'overall_revenue_box_img'}>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Sum of the amount of Sign Up, Daily Bonus, Refer & Earn (Regular), Refer & Earn Leaderboard, Game Leaderboard, Offer, Admin Given transaction records.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <h4>Total  Bonus</h4>
                        <p className={ rowData?.totalDebited?.totalGivenBonus?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalDebited?.totalGivenBonus)}</p>
                    </div>
                    {/*<div className={'devider'}> = </div>*/}
                    {/*<div className={'overall_revenue_box'}>*/}
                    {/*    <h4>Total Platform Debited</h4>*/}
                    {/*    <p className={ rowData?.totalDebited?.totalDebitedInMgpWallet?.toString()?.includes('-') ? "amount loss_color" : 'amount'}>{currencyFormat(rowData?.totalDebited?.totalDebitedInMgpWallet)}</p>*/}
                    {/*</div>*/}
                </div>
                </div>
            </Paper>
        </Box>
    );
}
export default PlatformEarningReport