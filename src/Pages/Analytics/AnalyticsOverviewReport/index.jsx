import React, { useEffect, useState } from "react";
import AnalyticsFilter from "../AnalyticFilter";
import Paper from "@material-ui/core/Paper";
import Loader from "../../../images/Loader";
import moment from "moment";
import { useDispatch } from "react-redux";
import { analyticsUserReport } from "../../../Redux/AnalyticsReport/action";
import TableLoader from "hoc/CommonTable/TableLoader";
import { BootstrapTooltip } from "utils";
import info from "../../../assets/images/info.svg";

const AnalyticsOverviewReport = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState({});
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState({
    startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Last 7 Days",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    gameId: "",
    gameName: "All Game",
  });

  useEffect(() => {
    analyticsUserReportHandler();
  }, [filterData]);

  const analyticsUserReportHandler = () => {
    let payload = {
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      // gameId: filterData?.gameId === 0 ? null : filterData?.gameId,
      publisherId:
        filterData?.publisherId === 0 ? null : filterData?.publisherId,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
    };

    if (filterData?.endDate !== null) {
      setLoader(true);
      dispatch(analyticsUserReport(payload))
        .then((res) => {
          if (res.data.success) {
            setLoader(false);
            setRowData({
              TotalDailyActiveUserReport:
                res?.data?.data?.TotalDailyActiveUserReport,
              TotalDailyNewUserReport: res?.data?.data?.TotalDailyNewUserReport,
              TotalMonthalyActiveUserReport:
                res?.data?.data?.TotalMonthalyActiveUserReport,
              TotalPayingUserReport: res?.data?.data?.TotalPayingUserReport,
              TotalUserReport: res?.data?.data?.TotalUserReport,
            });
          }
        })
        .catch((e) => {
          setLoader(false);
        });
    }
  };
  return (
    <>
      <Paper sx={{ mb: 2 }} className="outer-box">
        {loader ? <TableLoader /> : ""}
        <div className={"game_tab_overView"}>
          <div className={"game_tab_overView_title d_flex_between"}>
            <h2 className={"fontFamily"}>Analytics Overview</h2>
            {/* <AnalyticsFilter filterData={filterData} setFilterData={setFilterData} /> */}
          </div>
          <div className={"game_tab_overView_content"}>
            <div className={"game_tab_details"}>
              <div className={"game_tab_details_box"}>
                <h3>Daily Active Users (DAU)</h3>
                <BootstrapTooltip
                  title={
                    <div className={"tooltip_details_revenue"}>
                      <p>
                        Daily Active User (DAU) is a metric that measures the
                        number of unique users who engage with app within a
                        24-hour period.
                      </p>
                    </div>
                  }
                >
                  <img src={info} alt={""} />
                </BootstrapTooltip>
              </div>
              <p>{rowData?.TotalDailyActiveUserReport || 0}</p>
            </div>
            <div className={"game_tab_details"}>
              <div className={"game_tab_details_box"}>
                <h3>Monthly Active Users (MAU)</h3>
                <BootstrapTooltip
                  title={
                    <div className={"tooltip_details_revenue"}>
                      <p>
                        Monthly Active Users (MAU) is a metric that measures the
                        number of unique users who engage with app within a
                        30-day period.
                      </p>
                    </div>
                  }
                >
                  <img src={info} alt={""} />
                </BootstrapTooltip>
              </div>

              <p>{rowData?.TotalMonthalyActiveUserReport || 0}</p>
            </div>
            <div className={"game_tab_details"}>
              <div className={"game_tab_details_box"}>
                <h3>Daily New Users (DNU)</h3>
                <BootstrapTooltip
                  title={
                    <div className={"tooltip_details_revenue"}>
                      <p>
                        Daily New Users (DNU) are the number of unique users who
                        engage with app for the first time in a 24-hour period.
                      </p>
                    </div>
                  }
                >
                  <img src={info} alt={""} />
                </BootstrapTooltip>
              </div>
              <p>{rowData?.TotalDailyNewUserReport || 0}</p>
            </div>
            {/* <div className={'game_tab_details'}>
                            <h3>Total Users Report</h3>
                            <p>{rowData?.TotalUserReport || 0}</p>
                        </div>
                        <div className={'game_tab_details'}>
                            <h3>Paying Users Report</h3>
                            <p>{rowData?.TotalPayingUserReport || 0}</p>
                        </div> */}
          </div>
        </div>
      </Paper>
    </>
  );
};
export default AnalyticsOverviewReport;
