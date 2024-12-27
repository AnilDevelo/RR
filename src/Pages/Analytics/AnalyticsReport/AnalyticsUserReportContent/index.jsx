import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import moment from "moment";
import Chart from 'react-apexcharts';
import { BootstrapTooltip } from "utils";
import info from "../../../../assets/images/info.svg";

const AnalyticsUserReportContent = ({filterData, setFilterData}) => {
    const analyticsReducer = useSelector(state => state?.analyticsReducer?.userReport)
    const [filterChart, setFilterChart] = useState({
        dailyActiveUserReport: {
            total: true,
            ios: true,
            android: true
        },
        dailyNewUserReport: {
            total: true,
            ios: true,
            android: true
        },
        monthalyActiveUserReport: {
            total: true,
            ios: true,
            android: true
        },
        totalUserReport: {
            total: true,
            loss: true,
            win: true
        },
        payingUserReport:{
            deposit:true,
            entryFee:true,
            winAmount:true,
            withdraw:true
        },
        retentionData:{
            D0:true,
            D1:true,
            D7:true,
            D30:true
        }
    });
    let dailyActiveUserReport = {
            series: [{
                name: "Total",
                data: filterChart.dailyActiveUserReport.total ? analyticsReducer?.dailyActiveUserReport?.Total?.length > 0 ? analyticsReducer?.dailyActiveUserReport?.Total : [] : [],
                color: "#008ffb"
            }, {
                name: "IOS",
                data: filterChart.dailyActiveUserReport.ios ? analyticsReducer?.dailyActiveUserReport?.IOS?.length > 0 ? analyticsReducer?.dailyActiveUserReport?.IOS : [] : [],
                color: "rgb(0, 227, 150)"
            }, {
                name: "Android",
                data: filterChart.dailyActiveUserReport.android ? analyticsReducer?.dailyActiveUserReport?.Android?.length > 0 ? analyticsReducer?.dailyActiveUserReport?.Android : [] : [],
                color: "rgb(254, 176, 25)"
            }],

        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        xaxis: {
            labels: {
                rotate: -45,
                rotateAlways: true, // Add this property to force rotation for all labels
                trim: false, // Prevent trimming of long labels
                formatter: function (val) {
                    return val; // Return the original label text
                },
            },
            categories: analyticsReducer?.dailyActiveUserReport?.date,
            tickPlacement: 'on',
            title: {
                text: (filterData?.startDate && filterData?.endDate) ? `${moment(filterData.startDate).format('LL')} - ${filterData?.endDate ? moment(filterData?.endDate).format('LL') : moment(new Date()).format('LL')}` : '',
                style: {
                    fontWeight: 600,
                    fontSize: '14px',
                    color: "rgb(55, 61, 63)",
                },
                offsetY: -2,
                className:'title_daily_report'
            },
        },
        yaxis: {
            tickAmount:5,
        },

    };

    const monthlyActiveUserReport = {
        series: [
            {
                name: "Total",
                data: filterChart.monthalyActiveUserReport.total ? analyticsReducer?.monthalyActiveUserReport?.Total?.length > 0 ? analyticsReducer?.monthalyActiveUserReport?.Total : [] : [],
                color: "#008ffb"
            },
            {
                name: "IOS",
                data: filterChart.monthalyActiveUserReport.ios ? analyticsReducer?.monthalyActiveUserReport?.IOS?.length > 0 ? analyticsReducer?.monthalyActiveUserReport?.IOS : [] : [],
                color: "rgb(0, 227, 150)"
            },
            {
                name: "Android",
                data: filterChart.monthalyActiveUserReport.android ? analyticsReducer?.monthalyActiveUserReport?.Android?.length > 0 ? analyticsReducer?.monthalyActiveUserReport?.Android : [] : [],
                color: "rgb(254, 176, 25)"
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        xaxis: {
            labels: {
                rotate: -45,
                rotateAlways: true, // Add this property to force rotation for all labels
                trim: false, // Prevent trimming of long labels
                formatter: function (val) {
                    return val; // Return the original label text
                },
            },
            categories: analyticsReducer?.monthalyActiveUserReport?.date,
            tickPlacement: 'on',
            title: {
                text: (filterData?.startDate && filterData?.endDate) ? `${moment(filterData.startDate).format('LL')} - ${filterData?.endDate ? moment(filterData?.endDate).format('LL') : moment(new Date()).format('LL')}` : '',
                style: {
                    fontWeight: 600,
                    fontSize: '14px',
                    color: "rgb(55, 61, 63)",
                },
                offsetY: -2,
                className:'title_daily_report'
            },
        },
        yaxis: {
            tickAmount:5,
        },

    };
    const dailyNewUserReport = {
        series: [
            {
                name: "Total",
                data: filterChart.dailyNewUserReport.total ? analyticsReducer?.dailyNewUserReport?.Total?.length > 0 ? analyticsReducer?.dailyNewUserReport?.Total : [] : [],
                color: "#008ffb"
            },
            {
                name: "IOS",
                data: filterChart.dailyNewUserReport.ios ? analyticsReducer?.dailyNewUserReport?.IOS?.length > 0 ? analyticsReducer?.dailyNewUserReport?.IOS : [] : [],
                color: "rgb(0, 227, 150)"
            },
            {
                name: "Android",
                data: filterChart.dailyNewUserReport.android ? analyticsReducer?.dailyNewUserReport?.Android?.length > 0 ? analyticsReducer?.dailyNewUserReport?.Android : [] : [],
                color: "rgb(254, 176, 25)"
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        xaxis: {
            labels: {
                rotate: -45,
                rotateAlways: true, // Add this property to force rotation for all labels
                trim: false, // Prevent trimming of long labels
                formatter: function (val) {
                    return val; // Return the original label text
                },
            },
            categories: analyticsReducer?.dailyNewUserReport?.date,
            tickPlacement: 'on',
            title: {
                text: (filterData?.startDate && filterData?.endDate) ? `${moment(filterData.startDate).format('LL')} - ${filterData?.endDate ? moment(filterData?.endDate).format('LL') : moment(new Date()).format('LL')}` : '',
                style: {
                    fontWeight: 600,
                    fontSize: '14px',
                    color: "rgb(55, 61, 63)",
                },
                offsetY: -2,
                className:'title_daily_report'
            },
        },
        yaxis: {
            tickAmount:5,
        },

    };
    const totalUserReport = {
        series: [
            {
                name: "Total",
                data: filterChart.totalUserReport.total ? analyticsReducer?.totalUserReport?.Total?.length > 0 ? analyticsReducer?.totalUserReport?.Total : [] : [],
                color: "#008ffb",
                fontFamily: "Inter",
            },
            {
                name: "Loss",
                data: filterChart.totalUserReport.loss ? analyticsReducer?.totalUserReport?.Loss?.length > 0 ? analyticsReducer?.totalUserReport?.Loss : [] : [],
                color: "rgb(0, 227, 150)",
                fontFamily: "Inter",
            },
            {
                name: "Win",
                data: filterChart.totalUserReport.win ? analyticsReducer?.totalUserReport?.Win?.length > 0 ? analyticsReducer?.totalUserReport?.Win : [] : [],
                color: "rgb(254, 176, 25)",
                fontFamily: "Inter",
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        xaxis: {
            labels: {
                rotate: -45
              },
            categories: analyticsReducer?.totalUserReport?.date,
            tickPlacement: 'on',
            title: {
                text: (filterData?.startDate && filterData?.endDate) ? `${moment(filterData.startDate).format('LL')} - ${filterData?.endDate ? moment(filterData?.endDate).format('LL') : moment(new Date()).format('LL')}` : '',
                style: {
                    fontWeight: 600,
                    fontSize: '14px',
                    color: "rgb(55, 61, 63)",
                },
                offsetY: -2,
                className:'title_daily_report'
            },
        },
        yaxis: {
            tickAmount:5,
            labels: {
                formatter: function (value) {
                    return   "₹" + value.toFixed(2);
                }
            },
        },

    };
    const payingUserReport = {
        series: [
            {
                name: "Entry Amount",
                data: filterChart.payingUserReport.entryFee ? analyticsReducer?.payingUserReport?.EntryFee?.length > 0 ? analyticsReducer?.payingUserReport?.EntryFee : [] : [],
                color: "#008ffb"
            },
            {
                name: "Deposit Amount",
                data: filterChart.payingUserReport.deposit ? analyticsReducer?.payingUserReport?.Deposit?.length > 0 ? analyticsReducer?.payingUserReport?.Deposit : [] : [],
                color: "rgb(0, 227, 150)"
            },
            {
                name: "Win Amount",
                data: filterChart.payingUserReport.winAmount ? analyticsReducer?.payingUserReport?.WinAmount?.length > 0 ? analyticsReducer?.payingUserReport?.WinAmount : [] : [],
                color: "rgb(254, 176, 25)"
            },
            {
                name: "Withdraw Amount",
                data: filterChart.payingUserReport.withdraw ? analyticsReducer?.payingUserReport?.Withdrawals?.length > 0 ? analyticsReducer?.payingUserReport?.Withdrawals : [] : [],
                color: "rgb(255, 69, 96)"
            }
        ],

        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        xaxis: {
            labels: {
                rotate: -45
              },
            categories: analyticsReducer?.payingUserReport?.date,
            tickPlacement: 'on',
            title: {
                text: (filterData?.startDate && filterData?.endDate) ? `${moment(filterData.startDate).format('LL')} - ${filterData?.endDate ? moment(filterData?.endDate).format('LL') : moment(new Date()).format('LL')}` : '',
                style: {
                    fontWeight: 600,
                    fontSize: '14px',
                    color: "rgb(55, 61, 63)",
                },
                offsetY: -2,
                className:'title_daily_report'
            },
        },
        yaxis: {
            tickAmount:5,
            labels: {
                formatter: function (value) {
                    return   "₹" + value.toFixed(2);
                }
            },
        },

    };


    return(
        <>
            <div className={'report_analytics_details'}>
                <div className={'report_analytics'}>
                    <div className={'left_side_analytics'}>
                        <div className={"chart-title-data"}>
                            <p>Total Daily Active Users : {analyticsReducer?.totalKey?.TotalDailyActiveUserReport}</p>
                        </div>
                        <div className={'chart-details-content'}>
                        <div className={'game_tab_details_box'}>
                                <h2>Daily Active Users Report</h2>
                                <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                    <p>Daily Active User (DAU) is a metric that measures the number of unique users who engage with app within a 24-hour period.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                        </div>
                        <div className="chart_details">
                            <Chart
                                options={dailyActiveUserReport}
                                series={dailyActiveUserReport?.series}
                                type="bar"
                                height='300'
                            />
                        </div>
                    </div>
                    <div className={'right_side_analytics'}>
                        <div className={"chart-title-data"}>
                            <p>Total Monthly Active User : {analyticsReducer?.totalKey?.TotalMonthalyActiveUserReport}</p>
                        </div>
                        <div className={'chart-details-content'}>
                            <div className={'game_tab_details_box'}>
                                <h2>Monthly Active User Report</h2>
                                <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                    <p>Monthly Active Users (MAU) is a metric that measures the number of unique users who engage with app within a 30-day period.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                        </div>
                        <div className="chart_details">
                            <Chart
                                options={monthlyActiveUserReport}
                                series={monthlyActiveUserReport?.series}
                                type="line"
                                height='300'
                            />
                        </div>
                    </div>
                </div>
                <div className={'report_analytics'}>
                    <div className={'left_side_analytics'}>
                        <div className={"chart-title-data"}>
                            <p>Total Daily New Users : {analyticsReducer?.totalKey?.TotalDailyNewUserReport}</p>
                        </div>
                        <div className={'chart-details-content'}>

                            <div className={'game_tab_details_box'}>
                                <h2>Daily New Users Report</h2>
                                <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                    <p>Daily New Users (DNU) are the number of unique users who engage with app for the first time in a 24-hour period.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                        </div>
                        <div className="chart_details">
                            <Chart
                                options={dailyNewUserReport}
                                series={dailyNewUserReport?.series}
                                type="bar"
                                height='300'
                            />

                        </div>
                    </div>
                    {/* <div className={'right_side_analytics'}>
                        <div className={"chart-title-data"}>
                            <p>Total Users Report : {analyticsReducer?.totalKey?.TotalUserReport}</p>
                        </div>
                        <div className={'chart-details-content'}>
                            <h2>Total Users Report</h2>
                        </div>

                        <div className="chart_details">
                            <Chart
                                options={totalUserReport}
                                series={totalUserReport?.series}
                                type="bar"
                                height='300'
                            />
                        </div>
                    </div> */}
                </div>
                {/* <div className={'report_analytics'}>
                    <div className={'left_side_analytics'}>
                        <div className={"chart-title-data"}>
                            <p>Total Paying Users : {analyticsReducer?.totalKey?.TotalPayingUserReport}</p>
                        </div>
                        <div className={'chart-details-content'}>
                            <h2>Paying Users Report</h2>
                        </div>
                        <div className="chart_details">
                            <Chart
                                options={payingUserReport}
                                series={payingUserReport?.series}
                                type="bar"
                                height='300'
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
export default AnalyticsUserReportContent