import React from "react";
import SearchFilter from "./SearchFilter";
import ExportDropDown from "./ExportDropDown";
import DayWiseDropDown from "./DayWiseDropDown";
import CustomDateFilter from "./CustomDateFilter";
import GameStatusDropDown from "./GameStatusDropDown";
import GameQuarterDropDown from "./GameQuarterDropDown";
import ExportDropdown from "../../Pages/Users/AllUserList/ExportDropdown";
import MultipleSelectDropdown from "./MultipleSelectDropdown";
import StateFilterDropdown from "./StateFilterDropdown";
import DealsDropDown from "./DealsDropDown";
import MonthWiseDropDown from "./MonthWiseDropDown";

const MainCommonFilter = ({
  filterData,
  setFilterData,
  searchApiHandler,
  pagination,
  setPagination,
  statusOption,
  plateFormOption,
  addPropsFilter,
  gameTagOption,
  isSearchTooltip,
  handleOpenModal,
  totalDocs,
  userSearchApiHandler,
  Dealsoption,
  EnableDeals
}) => {
  const commonOptions = [
    "All Days",
    "Today",
    "Last 7 Days",
    "Last 14 Days",
    "Last 30 Days",
    "Custom",
  ];
  return (
    <div className={"filter_details_tab_section"}>
      <div className={"filter_inner_tab_info"}>
        {
          // !addPropsFilter?.userPayment &&
          <div className={"filter_export_date_dropdown"}>
            {!addPropsFilter?.isAvatar && (
              <>
                {/*{( addPropsFilter?.isAllUser || addPropsFilter?.isWithdrawal) ?*/}
                {/*    <>*/}
                {/*        <ExportDropdown option={['Export File', 'CSV File', 'Excel File']} name={'exportFileName'} userProps={userProps} handleOpenModal={handleOpenModal} totalUser={addPropsFilter} />*/}
                {/*        {addPropsFilter?.isAllUser && <GameStatusDropDown option={addPropsFilter?.userStateOption} name={'state'} filterData={filterData} setFilterData={setFilterData} />}*/}
                {/*    </>*/}
                {/*    :*/}
                {/*    (!addPropsFilter?.isGameHistory && !addPropsFilter?.isPlayerRecord && !addPropsFilter?.isGamePlayed && !addPropsFilter?.revenueGame && !addPropsFilter?.isTDSChallan && !addPropsFilter?.isReferAndEarn && !addPropsFilter?.userPayment && !addPropsFilter?.withdrawManually ) && <ExportDropDown option={['Export File', 'CSV File', 'Excel File']} name={'exportFileName'} filterData={filterData} setFilterData={setFilterData} />}*/}
                {/*//&& !addPropsFilter?.userPayment*/}
                {!addPropsFilter?.isGameHistory &&
                  !addPropsFilter?.isPlayerRecord &&
                  !addPropsFilter?.userPayment &&
                  !addPropsFilter?.isGamePlayed &&
                  !addPropsFilter?.revenueGame &&
                  !addPropsFilter?.isTDSChallan &&
                  !addPropsFilter?.isReferAndEarn &&
                  !addPropsFilter?.withdrawManually && (
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
                        }}
                        handleOpenModal={handleOpenModal}
                      />
                    </>
                  )}
                {addPropsFilter?.isAllUser && (
                  <StateFilterDropdown
                    option={addPropsFilter?.userStateOption}
                    name={"state"}
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />
                )}
                {addPropsFilter?.isGameList && (
                  <>
                    {(!addPropsFilter?.isPending ||
                      addPropsFilter?.isKYCList ||
                      addPropsFilter?.withdrawManually ||
                      addPropsFilter?.isGameModeOption) && (
                      <GameStatusDropDown
                        option={statusOption}
                        name={"statusField"}
                        filterData={filterData}
                        setFilterData={setFilterData}
                      />

                      )}
                    {EnableDeals && filterData?.statusField == "Deals" && <DealsDropDown Dealsoption={Dealsoption} setFilterData={setFilterData} name={"subMode"} filterData={filterData}/>}
                    {!addPropsFilter?.isGamePlayed &&
                      !addPropsFilter?.isKYCList &&
                      !addPropsFilter?.withdrawManually &&
                      !addPropsFilter?.isTDSDistributions && (
                        <GameStatusDropDown
                          option={plateFormOption}
                          name={"platformName"}
                          filterData={filterData}
                          setFilterData={setFilterData}
                        />
                      )}
                    {addPropsFilter?.gameTag &&
                      !!addPropsFilter?.helpAndSupport && (
                        <GameStatusDropDown
                          option={gameTagOption}
                          name={"gameTag"}
                          filterData={filterData}
                          setFilterData={setFilterData}
                        />
                      )}
                  </>
                )}
                {addPropsFilter?.isGameHistory && (
                  <MultipleSelectDropdown
                    name={"multi"}
                    options={["Entry Fees", "Win", "Loss", "Refund Entry Fees"]}
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />
                )}
                {!addPropsFilter?.isFilterMonth && !addPropsFilter?.isGamePlayed &&
                  !addPropsFilter?.isReferAndEarn &&
                  !addPropsFilter?.withdrawManually &&
                  !addPropsFilter?.isTDSDistributions && (
                    <DayWiseDropDown
                      option={
                        addPropsFilter?.isTDSChallan
                          ? [...commonOptions, "Previous Month"]
                          : addPropsFilter?.isPlayerRecord
                          ? [...commonOptions]
                          : addPropsFilter?.inActiveUsers
                          ? [
                              "Today",
                              "Last 3 Days",
                              "Last 7 Days",
                              "Last 14 Days",
                              "Last 30 Days",
                              "Custom",
                            ]
                          : [...commonOptions]
                      }
                      name={"statusValue"}
                      filterData={filterData}
                      setFilterData={setFilterData}
                    />
                  )}
                
                {/* Month Wise Dropdown */}
                {addPropsFilter?.isFilterMonth && !addPropsFilter?.isUserGameHistory && !addPropsFilter?.isGamePlayed && !addPropsFilter?.isReferAndEarn && !addPropsFilter?.withdrawManually && !addPropsFilter?.isTDSDistributions && (
                  <MonthWiseDropDown
                                            option={["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Custom"]}
                                            name="statusValue"
                                            filterData={filterData}
                                            setFilterData={setFilterData}
                                            prevDateFilter={addPropsFilter?.prevDateFilter}
                                            setDateFilter={addPropsFilter?.setDateFilter}
                                        />
                                    )}

                {addPropsFilter?.isReferAndEarn && (
                  <GameStatusDropDown
                    option={[
                      "All Category Type",
                      "Refer & Earn Basic",
                      "Refer & Earn Target Base",
                      "Add Cash",
                      "Add Cash by Referral"
                    ]}
                    name={"categoryType"}
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />
                )}
                {filterData?.statusValue === "Custom" && (
                  <CustomDateFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    addPropsFilter={addPropsFilter?.isTDSChallan}
                  />
                )}
              </>
            )}
            {/*{*/}
            {/*    addPropsFilter?.isTDSReport && (<GameQuarterDropDown option={['All Quarter', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4', 'Financial Year']} name={'gameQuarter'} filterData={filterData} setFilterData={setFilterData} />)*/}
            {/*}*/}
            {!addPropsFilter?.isGameHistory &&
              !addPropsFilter?.isGamePlayed &&
              !addPropsFilter?.revenueGame &&
              !addPropsFilter?.isTDSReport &&
              !addPropsFilter?.isReferAndEarn &&
              !addPropsFilter?.tdsUser &&
              !addPropsFilter?.isTransactions &&
              !addPropsFilter?.helpAndSupport &&
              !addPropsFilter?.isTDSChallan && (
                <SearchFilter
                  filterData={filterData}
                  setFilterData={setFilterData}
                  searchApiHandler={searchApiHandler}
                  pagination={pagination}
                  setPagination={setPagination}
                  isSearchTooltip={isSearchTooltip}
                  userSearchApiHandler={userSearchApiHandler}
                />
              )}
          </div>
        }
      </div>
    </div>
  );
};
export default MainCommonFilter;
