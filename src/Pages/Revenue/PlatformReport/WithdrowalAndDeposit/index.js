import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  revenueOverAll,
  getMGPWalletsHistory,
  getMgpWalletWithdrawalAndDeposit,
} from "../../../../Redux/revenue/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import AnalyticsFilter from "../../../Analytics/AnalyticFilter";
import { currencyFormat } from "../../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";

const DepositAndWithdrawalReport = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({});
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    statusField: "All Transaction Type",
  });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getDepositAndWithdrawalReport(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData?.startDate && filterData?.endDate || filterData?.statusValue === 'All Days') {
        getDepositAndWithdrawalReport(filterData.startDate, filterData.endDate)
    }
}, [filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusField, filterData?.statusValue ]);

  const getDepositAndWithdrawalReport = (startDate, endDate) => {
    let payload = {
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(getMgpWalletWithdrawalAndDeposit(payload)).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setRowData(res.data.data);
      }
    });
  };
  useEffect(() => {
    if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
        getDepositAndWithdrawalReport(filterData.startDate, filterData.endDate)
    }
}, [filterData.startDate, filterData.endDate]);
  return (
    <Box className={"overall_revenue"}>
      {loader ? <TableLoader /> : ""}
      <Paper sx={{ mb: 2 }} className="outer-box">
      <AnalyticsFilter
          filterData={filterData}
          setFilterData={setFilterData}
          addPropsFilter={{ isPlatform: true, isDepositWithdrawalReport: true }}
        />
        <div className={"overall_revenue_outerBox"}>
          <div className={"overall_revenue_box"}>
            <h4>Deposit</h4>
            <p
              className={
                rowData?.mgpWalletTotalDeposit?.toString()?.includes("-")
                  ? "amount loss_color"
                  : "amount"
              }
            >
              {currencyFormat(rowData?.mgpWalletTotalDeposit)}
            </p>
          </div>
          <div className={"overall_revenue_box"}>
            <h4>Withdrawal</h4>
            <p
              className={
                rowData?.mgpWalletTotalWithdrawal?.toString()?.includes("-")
                  ?.toString()
                  ?.includes("-")
                  ? "amount loss_color"
                  : "amount"
              }
            >
              {currencyFormat(rowData?.mgpWalletTotalWithdrawal)}
            </p>
          </div>
        </div>
      </Paper>
    </Box>
  );
};
export default DepositAndWithdrawalReport;
