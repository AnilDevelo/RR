import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import { getMonthlyGstNewHistory } from "../../../../Redux/revenue/action";
import TableCell from "@material-ui/core/TableCell";
import { currencyFormat } from "../../../../utils";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import AnalyticsFilter from "../../../Analytics/AnalyticFilter";
import moment from "moment";

const NewMonthlyGSTHistory = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    monthFilter: moment(`${moment().format("YYYY")}-${moment().format("M") - 1}-01`),
  });

  useEffect(() => {
    getMonthlyNewGstHistoryData();
  }, [filterData.exportFile, filterData.csvDownload, filterData?.monthFilter,pagination.rowsPerPage, pagination.page,]);

  const getMonthlyNewGstHistoryData = () => {
    setLoader(true);
      let payload = {
      limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
      start:  pagination?.startRange ? (+pagination?.startRange -1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      year: moment(filterData?.monthFilter).format("YYYY"),
      month: moment(filterData?.monthFilter).format("M"),
    };
    dispatch(getMonthlyGstNewHistory(payload))
        .then((res) => {
        setLoader(false);
        if (res.data.success) {
          if (res?.data?.data?.filePath) {
            setFilterData({
              ...filterData,
              csvDownload: false,
              exportFile: false,
            });
            window.open(res?.data?.data?.filePath,"_blank");
          } else {
            setRowData({
              ...rowData,
              list: res.data.data.docs,
              totalDocs: res.data.data.totalDocs,
            });
          }
        }
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "DeleteCommonModal": {
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
      case "AddGSTConfig": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ExportFilePopup": {
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

  const columns = [
    {
      label: "Sr. No.",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            {+pagination?.rowsPerPage * +pagination?.page + (i + 1)}
          </TableCell>
        );
      },
    },
    {
      label: "Month",
      sortable: false,
      isDisbanding: true,
      type: "custom",
        render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            {moment(
              moment(`${moment(row?.year).format("YYYY")}-${row?.month}-01`)
            ).format("MMMM ")}
          </TableCell>
        );
      },
    },
    {
      label: "Year",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return <TableCell className={"table_icon"}>{row?.year}</TableCell>;
      },
    },
    {
      id: "",
      numeric: true,
      disablePadding: false,
      label: "Total GST",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>{currencyFormat(row?.totalGSTAmount)}</TableCell>
        );
      },
    },
    {
      label: "Total Percentage",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            {row?.totalGstPercentage}%
          </TableCell>
        );
      },
    },
  ];

  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box platform_section">
        <AnalyticsFilter
          filterData={filterData}
          setFilterData={setFilterData}
          addPropsFilter={{
            isPlatform: true,
            isRevenue: true,
            userPayment: rowData?.list?.length <= 0,
          }}
          handleOpenModal={handleOpenModal}
          totalDocs={rowData?.totalDocs}
          setPagination={setPagination}
          pagination={pagination}
        />
        <CustomTable
          headCells={columns}
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
          redirectApiHandler={getMonthlyNewGstHistoryData}
        />
      </CommonModal>
    </Box>
  );
};
export default NewMonthlyGSTHistory;
