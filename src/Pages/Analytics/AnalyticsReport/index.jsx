import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { analyticsUserReport } from "../../../Redux/AnalyticsReport/action";
import Loader from "../../../images/Loader";
import AnalyticsFilter from "../AnalyticFilter";
import AnalyticsUserReportContent from "./AnalyticsUserReportContent";
import TableLoader from "hoc/CommonTable/TableLoader";

const AnalyticsChartView = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    gameId: "",
    gameName: "All Game",
  });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        analyticsUserReportHandler(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData?.startDate && filterData?.endDate || filterData?.statusValue === 'All Days' ) {
        analyticsUserReportHandler(filterData.startDate, filterData.endDate)
    }
}, [filterData.startDate, filterData.endDate, filterData?.statusValue])

  const analyticsUserReportHandler = (startDate, endDate) => {
    let payload = {
      startDate: startDate,
      endDate: endDate,
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
          if (res.data.statusCode === 200) {
            setLoader(false);
            if (res.data?.data?.filePath) {
              window.open(res?.data?.data?.filePath,"_blank");
              setFilterData({
                ...filterData,
                csvDownload: false,
                exportFile: false,
              });
            }
          } else {
            setLoader(false);
          }
        })
        .catch((e) => {
          setLoader(false);
        });
    }
  };

  return (
    <div className={loader ? "table_loader_details" : ""}>
      {loader ? <TableLoader /> : ""}
      <AnalyticsFilter filterData={filterData} setFilterData={setFilterData} isDailyReport={true}/>
      <AnalyticsUserReportContent
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </div>
  );
};
export default AnalyticsChartView;
