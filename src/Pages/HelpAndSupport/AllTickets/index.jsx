import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import ReorderIcon from "@mui/icons-material/Reorder";
import TableCell from "@mui/material/TableCell";
import DoneIcon from "@mui/icons-material/Done";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Loader from "../../../images/Loader";
import CustomTable from "../../../hoc/CommonTable";
import ChatDrawer from "../ChatDrawer";
import {
  getHelpAndSupportList,
  getHelpAndSupportTypeDropdown,
} from "../../../Redux/HelpAndSupport/action";
import moment from "moment";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import { ActionFunction } from "../../../utils";
import PopComponent from "hoc/PopContent";
import CommonModal from "hoc/CommonModal";

const AllTicketsList = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [state, setState] = React.useState({ right: false });
  const [loader, setLoader] = useState(false);
  const [ticketType, setTicketType] = useState([]);
  const [helpAndSupportData, setHelpAndSupportData] = useState({
    id: "",
    messages: [],
    userReceiverDetails: {},
    row: {},
  });
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    statusField: "All Type",
    exportFileName: "Export File",
    platformName: "All Status",
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '', endRange: '' });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);
  
  const toggleDrawer =
    (anchor, open, id, messages, userDetails, row) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setHelpAndSupportData({
        ...helpAndSupportData,
        id: id,
        messages: messages,
        userReceiverDetails: userDetails,
        row,
      });
      setState({ ...state, [anchor]: open });
    };

    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
  const columns = [
    {
      id: "id",
      label: "Ticket Id",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{`#${row?.numericId}`}</TableCell>;
      },
    },
    {
      id: "",
      label: "User Full Name",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.userId?.fullName}</TableCell>;
      },
    },
    {
      id: "",
      label: "User Name",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.userId?.nickName}</TableCell>;
      },
    },
    {
      id: "",
      label: "Ticket Type",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.ticketTypeId?.ticketType}</TableCell>;
      },
    },
    {
      id: "ticketTitle",
      label: "Ticket Title",
    },
    {
      id: "createdAt",
      label: "Created Date & Time",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.createdAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "updatedAt",
      label: "Last Modified",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.updatedAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    ActionFunction("helpAndSupport", {
      id: "action",
      label: "Status",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            {row?.status !== "Open" ? (
              <span className="edit_btn d_flex align_items_center edit-btn-action document_record_status_resolved" style={{cursor:"auto"}}>
                {" "}
                <DoneIcon /> Resolved
              </span>
            ) : (
              <span
                  className="edit_btn edit-btn-action edit_btn d_flex align_items_center document_record_status"
                onClick={toggleDrawer(
                  "right",
                  true,
                  row?._id,
                  row?.messages,
                  row?.userId,
                  row
                )}
              >
                {" "}
                <ReorderIcon /> Open
              </span>
            )}
          </TableCell>
        );
      },
    }),
  ];

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
      getHelpAndSupportListHandler(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    }
    else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
      getHelpAndSupportListHandler(filterData.startDate, filterData.endDate);
    }
  }, [pagination.rowsPerPage, pagination.page, filterData?.endDate,filterData?.startDate, filterData?.statusValue, filterData?.statusField, filterData.exportFile, filterData.csvDownload,filterData.platformName]);


  const getHelpAndSupportListHandler = (startDate, endDate) => {
    let payload = {
      limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
      start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      ticketTypeId:
        filterData?.statusField === "All Type"
          ? ""
          : ticketType?.filter(
              (item) => item?.ticketType === filterData?.statusField
            )?.[0]?._id,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      status:
        filterData?.platformName !== "All Status"
          ? filterData?.platformName
          : "",
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(getHelpAndSupportList(payload)).then((res) => {
      setLoader(false);
      if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
        setPagination({
            ...pagination,
            startRange:'',
            endRange: '',
            rowsPerPage: 10,
            page:0
        })
        setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: false,
            exportFileName: 'Export File'
        })
    }
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
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
      }
    });
  };
  useEffect(() => {
    dispatch(getHelpAndSupportTypeDropdown({})).then((res) => {
      setTicketType(res.data.data);
      let test = ticketType?.reduce((acc, cur) => {
        return [...acc, cur];
      }, []);
    });
  }, []);

  const handleOpenModal = (type, data) => {
    switch (type) {
        case 'CommonPop': {
            setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
            break;
        }
        case 'ExportFilePopup' : {
            setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
            break;
        }
        default: {
            setModalDetails({ ...modalDetails, modalIsOpen: false });
        }
    }
  };
  
  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
  }, [filterData?.statusValue,filterData?.statusField,filterData?.platformName])
  
  return (
    <Box className={"documentation_main_section"}>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"documentation_section"}>
          <div className={"documentation_how_to_start"}>
            <div
              className={
                "how_to_start_title d_flex justify_content_between align_items_center"
              }
            >
              <h2>All Tickets</h2>
              <MainCommonFilter
                filterData={filterData}
                setFilterData={setFilterData}
                addPropsFilter={{ helpAndSupport: true, isGameList: true, userPayment: rowData?.list?.length <= 0, }}
                statusOption={[
                  "All Type",
                  ...ticketType?.map((item) => item?.ticketType),
                ]}
                plateFormOption={["All Status", "Open", "Resolved"]}
                handleOpenModal={handleOpenModal}
                totalDocs={rowData?.totalDocs}
                setPagination={setPagination}
              />
            </div>
            <div className={"help_support_table_ticket"}>
              <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
              />
            </div>
          </div>
        </div>
      </Paper>
      <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
            </CommonModal>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <box className={"help_support_drawer"}>
          <ChatDrawer
            helpAndSupportData={helpAndSupportData}
            getHelpAndSupportListHandler={getHelpAndSupportListHandler}
            pagination={pagination}
            toggleDrawer={toggleDrawer("right", false)}
          />
        </box>
      </Drawer>
    </Box>
  );
};
export default AllTicketsList;
