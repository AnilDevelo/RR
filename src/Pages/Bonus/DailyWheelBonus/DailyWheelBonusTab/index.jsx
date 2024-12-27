import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
  ActionFunction,
  currencyFormat,
  dotGenerator,
  hideActionFunc,
} from "../../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {
  getDailyWheelBonusList,
  getDailyWheelBonusType,
  getDayDailyWheelBonus,
} from "../../../../Redux/Bonus/action";

const DailyWheelBonusTab = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [bonusType, setBonusType] = useState({});

  const [bonusDays, setBonusDays] = useState({
    isDaysAvailable: "",
    message: "",
  });

  useEffect(() => {
    dispatch(getDailyWheelBonusType({})).then((res) => {
      setBonusType(res.data.data);
    });
  }, []);

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddDailyWheelBonusPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ViewRejectedComment": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddDailyWheelBonusConfig": {
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

  let columnsData = [
    {
      id: "day",
      label: "Day Name",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.day === 1
              ? `Day ${row?.day} - Sunday`
              : row?.day === 2
              ? `Day ${row?.day} - Monday`
              : row?.day === 3
              ? `Day ${row?.day} - Tuesday`
              : row?.day === 4
              ? `Day ${row?.day} - Wednesday`
              : row?.day === 5
              ? `Day ${row?.day} - Thursday`
              : row?.day === 6
              ? `Day ${row?.day} - Friday`
              : row?.day === 7 && `Day ${row?.day} - Saturday`}
          </TableCell>
        );
      },
    },
    {
      id: "spinTitle",
      label: "Title",
      // type: "custom",
      // render: (row) => {
      //   return<TableCell style={{textTransform:"capitalize"}}>{row?.spinTitle}</TableCell>
      // }
    },
    {
      id: "spinDescription",
      label: "Description",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.spinDescription && dotGenerator(
              row?.spinDescription,
              handleOpenModal,
              "Daily Wheel Bonus Description"
            )}
          </TableCell>
        );
      },
    },
    {
      id: "bonusCashUpto",
      isDisbanding: true,
      label: `Division`,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {(bonusType?.dailyWheelBonusTypeCounter === 6
              ? row?.bonusType?.slice(0, 6)
              : row?.bonusType
            )?.map((item, index) => {
              return (
                <li>
                  <span className={"division_size"}>Division {index + 1}</span>{" "}
                  -{" "}
                  <span>
                    {item?.bonusType === "Bonus Cash" ||
                    item?.bonusType === "Deposit Cash" ||
                    item?.bonusType === "Winning Cash" ? (
                      <span>
                      {`${item?.bonusType} : `} {currencyFormat(+item?.value)}
                        , Deduct TDS : {item?.isDeductTds ? "Yes" : "No"}
                      </span>
                    ) : (
                      <span>
                        {`${item?.bonusType}  ${item?.value ? ":" : ""} `}
                        {item?.value ? +item?.value : ""}
                        {item?.bonusType === "Referral Boosters" ? "X" : ""}
                        {item?.bonusType === "Referral Boosters" &&
                          `${
                            item?.expireAt
                              ? `, Expires after ${item?.expireAt} hours.`
                              : ""
                          }`}
                        {item?.bonusType === "Add Cash Offer" ? "%" : ""}
                        {item?.bonusType === "Add Cash Offer" &&
                          `${
                            item?.minAmount
                              ? `, Min Amount : ₹${item?.minAmount}`
                              : ""
                          }, Reward Counter : ${item?.rewardCounter}${
                            item?.expireAt
                              ? `, Expires after ${item?.expireAt} hours.`
                              : ""
                          }`}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </TableCell>
        );
      },
    },
    ActionFunction("bonus", {
      id: "Action",
      label: "Action",
      type: "custom",
      isDisbanding: true,
      render: (row) => {
        return (
          <TableCell>
            <span
              className="edit_btn edit-btn-action"
              onClick={() =>
                handleOpenModal("AddDailyWheelBonusPop", { isEdit: true, row })
              }
            >
              Edit
            </span>
          </TableCell>
        );
      },
    }),
  ];

  useEffect(() => {
    getDayDailyWheelBonusList();
  }, []);

  const getDayDailyWheelBonusList = () => {
    dispatch(getDayDailyWheelBonus()).then((res) => {
      setBonusDays({
        ...bonusDays,
        isDaysAvailable: res.data.data?.isDaysAvalible,
        message: res?.data?.message,
      });
    });
  };

  useEffect(() => {
    getDailyWheelBonusListDetails();
  }, [pagination.rowsPerPage, pagination.page]);

  const getDailyWheelBonusListDetails = () => {
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getDailyWheelBonusList(payload)).then((res) => {
      if (res.data.success) {
        setLoader(false);
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
      }
    });
  };

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}

      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("bonus") && bonusDays?.isDaysAvailable && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={
                bonusDays?.isDaysAvailable
                  ? (e) => handleOpenModal("AddDailyWheelBonusPop")
                  : (e) =>
                      handleOpenModal("CommonPop", {
                        header: "Error",
                        body: bonusDays?.message,
                      })
              }
            >
              {" "}
              + Add Daily Spin Bonus
            </button>
          </div>
        )}

        <CustomTable
          headCells={columnsData}
          rowData={rowData?.list}
          totalDocs={rowData?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          loading={loader}
        />
      </Paper>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={getDailyWheelBonusListDetails}
          getDayDailyWheelBonusList={getDayDailyWheelBonusList}
        />
      </CommonModal>
    </Box>
  );
};
export default DailyWheelBonusTab;
