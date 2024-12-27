import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import moment from "moment";
import {analyticsAppInstallUserReport, analyticsAppUninstallUserReport} from "../../../Redux/AnalyticsReport/action";
import Loader from "../../../images/Loader";
import Paper from "@material-ui/core/Paper";
import AnalyticsFilter from "../AnalyticFilter";
import TableLoader from "hoc/CommonTable/TableLoader";
import { BootstrapTooltip } from "utils";
import info from "../../../assets/images/info.svg";

const AnalyticsApplicationInstallReport = () => {
    const dispatch = useDispatch();
    const [installCount, setInstallCount] = useState(0)
    const [uninstallCount, setUninstallCount] = useState(0)
    const [loader, setLoader] = useState(false);
    const [filterData, setFilterData] = useState({
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        statusValue: "Today",
        exportFile: false,
        csvDownload: false,
        exportFileName: 'Export File',
        gameId:'',
        gameName:'All Game',
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            analyticsUserinstallHandler(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            analyticsUserinstallHandler(filterData.startDate, filterData.endDate);
        }
    }, [filterData.startDate, filterData.endDate, filterData?.statusValue]);

    const analyticsUserinstallHandler = (startDate, endDate) => {
        let payload = {
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            publisherId: filterData?.publisherId === 0 ? null : filterData?.publisherId,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });

            setLoader(true)
            dispatch(analyticsAppInstallUserReport(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    setInstallCount( res?.data?.data)
                }
            }).catch(e => {
                setLoader(false)
            })
            dispatch(analyticsAppUninstallUserReport(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    setUninstallCount( res?.data?.data)
                }
            }).catch(e => {
                setLoader(false)
            })

    }
    return(
        <>
            {loader ? <TableLoader /> : ""}

            <Paper sx={{ mb: 2 }} className="outer-box">

                <div className={'game_tab_overView'}>
                    <div className={'game_tab_overView_title d_flex_between'}>
                        <h2 className={'fontFamily'}>Application Install & Uninstall</h2>
                        <AnalyticsFilter filterData={filterData} setFilterData={setFilterData} addPropsFilter={{ isAnalytics: true }} />
                    </div>
                    <div className={'game_tab_overView_content'}>
                        <div className={'game_tab_details'}>

<div className={'game_tab_details_box'}>
    <h3>Daily Install Users Report</h3>
    <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
        <p>Daily Install Users (DIU) is a metric that measures the number of unique users who install an app on a given day.</p>
    </div>}>
        <img src={info} alt={''} />
    </BootstrapTooltip>
</div>
<p>{installCount || 0}</p>
                        </div>
                        <div className={'game_tab_details'}>
                            <div className={'game_tab_details_box'}>
                                <h3>Daily Uninstall Users Report</h3>
                                <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                    <p>Daily Uninstall Users (DUU) is a metric that measures the number of unique users who uninstall an app on a given day.</p>
                                </div>}>
                                    <img src={info} alt={''} />
                                </BootstrapTooltip>
                            </div>
                            <p>{uninstallCount || 0}</p>
                        </div>
                        <div/>
                        <div/>
                    </div>
                </div>
            </Paper>
        </>
    )
}
export default AnalyticsApplicationInstallReport;