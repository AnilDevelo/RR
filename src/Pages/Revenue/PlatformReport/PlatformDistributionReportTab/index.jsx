import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { currencyFormat } from "../../../../utils";
import { getMGPWalletsHistoryReport } from "../../../../Redux/revenue/action";
import { useDispatch } from "react-redux";
import AnalyticsFilter from "../../../Analytics/AnalyticFilter";
import moment from "moment";
import TableLoader from "hoc/CommonTable/TableLoader";
import DailyBonusTransactionHistory from "Components/Modal/RevenueModal/DailyBonusTransactionHistory";
import SignUpTransactionHistory from "Components/Modal/RevenueModal/SignUpTransactionHistory";
import ReferAndEarnRegularTransactionHistory from "Components/Modal/RevenueModal/ReferAndEarnRegularTransactionHistory";
import GameLeaderBoardTransactionHistory from "Components/Modal/RevenueModal/GameLeaderBoardTransactionHistory";
import AdminGivenTransactionHistory from "Components/Modal/RevenueModal/AdminGivenTransactionHistory";
import CommonModal from "hoc/CommonModal";
import PopComponent from "hoc/PopContent";
import GstTransactionHistory from "Components/Modal/RevenueModal/GstTransactionHistory";

const PlatformDistributionReportTab = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState({
    monthFilter: null,
    statusValue: "All Days",
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];

  const [distTab, setDistTab] = useState(0);
  const [rowData, setRowData] = useState({
    dailyBonus: {},
    signUp: {},
    referAndEarn: {},
    monthlyReferAndEarn: {},
    monthlyLeaderboard: {},
    offer: {},
    adminGiven: {},
    gst:{},
    totalBonus: 0,
  });

  useEffect(() => {
    if (filterData?.statusValue === "All Days" || filterData?.monthFilter) {
      getMGPWalletsHistoryReportDetails();
    }
  }, [
    filterData?.monthFilter,
    filterData?.statusValue,
    filterData?.monthFilter,
  ]);

  const handleErrorOpenModal = (type, data) => {
    switch (type) {
      case "DailyBonusTransactionHistory": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "SignUpTransactionHistory": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ReferAndEarnRegularTransactionHistory": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "GameLeaderBoardTransactionHistory": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AdminGivenTransactionHistory": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  //Refer & Earn (Regular)
  const getMGPWalletsHistoryReportDetails = () => {
    setLoader(true);
    let payload = {
      year: moment(filterData?.monthFilter).format("YYYY"),
      month: moment(filterData?.monthFilter).format("M"),
    };
    dispatch(
      getMGPWalletsHistoryReport(
        filterData?.statusValue === "All Days" ? {} : payload
      )
    ).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setRowData({
          ...rowData,
          dailyBonus: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Daily Bonus" ? cur : acc; }, {}),
          signUp: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Sign Up" ? cur : acc; }, {}),
          referAndEarn: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Refer & Earn (Regular)" ? cur : acc;}, {}),
          monthlyReferAndEarn: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Total Monthly Refer & Earn Leaderboard" ? cur : acc;},{}),
          monthlyLeaderboard: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => {return cur?.transactionType === "Total Monthly Game Leaderboard" ? cur : acc;},{}),
          offer: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Offer" ? cur : acc; }, {}),
          adminGiven: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "Admin Given" ? cur : acc; }, {}),
          gst: res?.data?.data?.mgpWalletReport?.reduce((acc, cur) => { return cur?.transactionType === "GST Bonus" ? cur : acc; }, {}),
          totalBonus: res?.data?.data?.totalBonus,
        });
      }
    });
  };

  return (
    <>
      <Paper
        sx={{ mb: 2 }}
        className="outer-box totalMGPWallets d_flex align_items_center justify_content_between"
      >
        <div className={"d_flex"}>
          <h3>Total Bonus: </h3>{" "}
          <p className={rowData?.totalBonus?.toString()?.includes("-") ? "amount loss_color" : "amount" } >{currencyFormat(rowData?.totalBonus)}</p>
        </div>
        <AnalyticsFilter
          filterData={filterData}
          setFilterData={setFilterData}
          addPropsFilter={{ isPlatformReport: true, userPayment: rowData?.list?.length <= 0, }}
          plateFormOption={["All Days", "Custom"]}
        />
      </Paper>
      {distTab == 0 ? (
        <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
          <div className={"platform-distribution-box border_bottom_platform game-rules-section"}
          >
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>Daily Bonus</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(1);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit Wallet</p>
                    <p>
                      {currencyFormat(rowData?.dailyBonus?.DepositCash || 0)}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning Wallet</p>
                    <p>{currencyFormat(rowData?.dailyBonus?.WinCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus Wallet</p>
                    <p>{currencyFormat(rowData?.dailyBonus?.Bonus || 0)}</p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Daily Bonus</p>
                  <p
                    className={
                      rowData?.dailyBonus?.Total?.toString()?.includes("-")
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.dailyBonus?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>Sign Up</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(2);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit</p>
                    <p>{currencyFormat(rowData?.signUp?.DepositCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning</p>
                    <p>{currencyFormat(rowData?.signUp?.WinCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus</p>
                    <p>{currencyFormat(rowData?.signUp?.Bonus || 0)}</p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Sign Up</p>
                  <p
                    className={
                      rowData?.signUp?.Total?.toString()?.includes("-")
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.signUp?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>Refer & Earn (Regular)</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(3);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit Wallet</p>
                    <p>
                      {currencyFormat(rowData?.referAndEarn?.DepositCash || 0)}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning Wallet</p>
                    <p>{currencyFormat(rowData?.referAndEarn?.WinCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus Wallet</p>
                    <p>{currencyFormat(rowData?.referAndEarn?.Bonus || 0)}</p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Refer & Earn</p>
                  <p
                    className={
                      rowData?.referAndEarn?.Total?.toString()?.includes("-")
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.referAndEarn?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={"platform-distribution-box border_bottom_platform mt_margin_platform"}   
          >
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>Game Leaderboard</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(4);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit</p>
                    <p>
                      {currencyFormat(
                        rowData?.monthlyLeaderboard?.DepositCash || 0
                      )}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning</p>
                    <p>
                      {currencyFormat(
                        rowData?.monthlyLeaderboard?.WinCash || 0
                      )}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus</p>
                    <p>
                      {currencyFormat(rowData?.monthlyLeaderboard?.Bonus || 0)}
                    </p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Game Leaderboard</p>
                  <p
                    className={
                      rowData?.monthlyLeaderboard?.Total?.toString()?.includes(
                        "-"
                      )
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.monthlyLeaderboard?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>Admin Given</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(5);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit Wallet</p>
                    <p>
                      {currencyFormat(rowData?.adminGiven?.DepositCash || 0)}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning Wallet</p>
                    <p>{currencyFormat(rowData?.adminGiven?.WinCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus Wallet</p>
                    <p>{currencyFormat(rowData?.adminGiven?.Bonus || 0)}</p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Admin Given</p>
                  <p
                    className={
                      rowData?.adminGiven?.Total?.toString()?.includes("-")
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.adminGiven?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className={"box"}>
              <div className="justify_space d_flex">
                <h2>GST</h2>
                <h6
                  className={"link_transaction_history"}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    setDistTab(6);
                  }}
                >
                  Transaction History
                </h6>
              </div>
              <div className={"inner_box"}>
                <div className={"inner_box_outer"}>
                  <div className={"innerBox_text"}>
                    <p>Deposit Wallet</p>
                    <p>
                      {currencyFormat(rowData?.gst?.DepositCash || 0)}
                    </p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Winning Wallet</p>
                    <p>{currencyFormat(rowData?.gst?.WinCash || 0)}</p>
                  </div>
                  <div className={"innerBox_text"}>
                    <p>Bonus Wallet</p>
                    <p>{currencyFormat(rowData?.gst?.Bonus || 0)}</p>
                  </div>
                </div>
                <div className={"innerBox_text total_box_count"}>
                  <p className={"title"}>Total Admin Given</p>
                  <p
                    className={
                      rowData?.gst?.Total?.toString()?.includes("-")
                        ? "amount loss_color"
                        : "amount"
                    }
                  >
                    {currencyFormat(rowData?.gst?.Total || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      ): distTab == 1 ? (<DailyBonusTransactionHistory setDistTab={setDistTab} />
      ): distTab == 2 ? (<SignUpTransactionHistory setDistTab={setDistTab} />
      ): distTab == 3 ? (<ReferAndEarnRegularTransactionHistory setDistTab={setDistTab} />
      ): distTab == 4 ? (<GameLeaderBoardTransactionHistory setDistTab={setDistTab} />
      ): distTab == 5 ? (<AdminGivenTransactionHistory setDistTab={setDistTab} />
      ): distTab == 6 ? (<GstTransactionHistory setDistTab={setDistTab} />
      ): ("")}
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleErrorOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleErrorOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
    </>
  );
};
export default PlatformDistributionReportTab;
