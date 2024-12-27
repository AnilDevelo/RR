import React, { useEffect, useState } from "react";
import ExportDropDown from "../../../Components/MainCommonFilter/ExportDropDown";
import DayWiseDropDown from "../../../Components/MainCommonFilter/DayWiseDropDown";
import CustomDateFilter from "../../../Components/MainCommonFilter/CustomDateFilter";
import { useDispatch } from "react-redux";
import GameStatusDropDown from "../../../Components/MainCommonFilter/GameStatusDropDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ExportDropdown from "../../Users/AllUserList/ExportDropdown";

const AnalyticsFilter = ({
  filterData,
  setFilterData,
  statusOption,
  addPropsFilter,
  plateFormOption,
  totalDocs,
  setPagination,
  pagination,
  handleOpenModal,
  isDailyReport,
  isGSTHistory
}) => {
  const [openCale, setOpenCale] = useState(false);
  return (
    <div className={"filter_details_tab_section analytics_filter mr_2"}>
      <div className={"filter_inner_tab_info"}>
        <div className={"filter_export_date_dropdown"}>
          {(addPropsFilter?.isPlatform || addPropsFilter?.isRevenue) && (
            <>
              {!addPropsFilter?.userPayment &&
                !addPropsFilter?.isPlatformReport &&
                !addPropsFilter?.isDepositWithdrawalReport && (
                  <>
                    <ExportDropdown
                      option={["Export File", "CSV File", "Excel File"]}
                      name={"exportFileName"}
                      exportProps={{
                        filterData: filterData,
                        setFilterData: setFilterData,
                        pagination: pagination,
                        setPagination: setPagination,
                        totalDocs: totalDocs,
                        isDailyReport: isDailyReport,
                    }}
                     isGSTHistory={isGSTHistory}
                      handleOpenModal={handleOpenModal}
                    />
                    {addPropsFilter?.isAllUser && (
                      <GameStatusDropDown
                        option={addPropsFilter?.userStateOption}
                        name={"state"}
                        filterData={filterData}
                        setFilterData={setFilterData}
                      />
                    )}
                  </>
                )}
              {/* Game Status Dropdown */}
              {/*// <ExportDropDown option={['Export File', 'CSV File', 'Excel File']} name={'exportFileName'} filterData={filterData} setFilterData={setFilterData}/>}*/}
              {!addPropsFilter?.isRevenue &&
                !addPropsFilter?.isDepositWithdrawalReport &&
                !isDailyReport && (
                  <GameStatusDropDown
                    option={statusOption}
                    name={"statusField"}
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />
                )}
            </>
          )}
          {!addPropsFilter?.isRevenue && !addPropsFilter?.isPlatformReport && (
            <>
              {/* Day Wise Dropdown */}
              <DayWiseDropDown
                option={
                  isDailyReport
                    ? [
                        "Today",
                        "Last 7 Days",
                        "Last 14 Days",
                        "Last 30 Days",
                        "Custom",
                      ]
                    : [
                        "All Days",
                        "Today",
                        "Last 7 Days",
                        "Last 14 Days",
                        "Last 30 Days",
                        "Custom",
                      ]
                }
                name={"statusValue"}
                filterData={filterData}
                setFilterData={setFilterData}
              />
              {filterData?.statusValue !== "All Days" &&
                filterData?.statusValue !== "Today" && (
                  <CustomDateFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />
                )}
            </>
          )}
          {addPropsFilter?.isRevenue && (
            <div className={"custom_date_filter platform_report_filter"}>
              <div className={"start-date-picker"}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    maxDate={new Date()}
                    value={filterData?.monthFilter}
                    onChange={(date) => {
                      setOpenCale(false);
                      setFilterData({
                        ...filterData,
                        monthFilter: date,
                      });
                    }}
                    open={openCale}
                    onClose={() => setOpenCale(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={({ inputProps, ...restParams }) => (
                      <TextField
                        {...restParams}
                        helperText={null}
                        onClick={() => setOpenCale(!openCale)}
                        inputProps={{
                          ...inputProps,
                          placeholder: "Select Month and Year",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}

          {addPropsFilter?.isPlatformReport && (
            <div className={"custom_date_filter platform_report_filter"}>
              <GameStatusDropDown
                option={plateFormOption}
                name={"statusValue"}
                filterData={filterData}
                setFilterData={setFilterData}
                isPlatform={true}
              />
              {filterData?.statusValue === "Custom" && (
                <div className={"start-date-picker"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={["year", "month"]}
                      maxDate={new Date()}
                      value={filterData?.monthFilter}
                      onChange={(date) => {
                        setOpenCale(false);
                        setFilterData({
                          ...filterData,
                          monthFilter: date,
                        });
                      }}
                      inputFormat="MMMM yyyy"
                      open={openCale}
                      onClose={() => setOpenCale(false)}
                      inputProps={{ readOnly: true }}
                      renderInput={({ inputProps, ...restParams }) => (
                        <TextField
                          {...restParams}
                          helperText={null}
                          onClick={() => setOpenCale(!openCale)}
                          inputProps={{
                            ...inputProps,
                            placeholder: "Select Month and Year",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AnalyticsFilter;
