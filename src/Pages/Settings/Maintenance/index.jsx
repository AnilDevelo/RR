import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import {
  deleteMaintenance,
  getActiveMaintenance,
  getMaintenanceHistory,
} from "../../../Redux/settings/action";
import moment from "moment";
import { Switch } from "@mui/material";

const Maintenance = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [history, setHistory] = useState({list: [], totalDocs: 0})
  let Modal = PopComponent[modalDetails.modalName];
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
      case "AddMaintenancePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "DeleteCommonModal": {
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
      case "ActiveDeactivateMaintenance": {
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
      id: "Icon",
      label: " Icon",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <img src={row?.maintenanceImage || user} alt={""} />
          </TableCell>
        );
      },
    },
    {
      id: "title",
      label: "Title",
    },
    {
      id: "description",
      isDisbanding: true,
      label: "Description",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.description
              ? dotGenerator(
                  row?.description,
                  handleOpenModal,
                  "Lobby Type Description"
                )
              : ""}
          </TableCell>
        );
      },
    },
    {
      id: "reminderText",
      isDisbanding: true,
      label: "Reminder Text",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.reminderText
              ? dotGenerator(
                  row?.reminderText,
                  handleOpenModal,
                  "Reminder Text"
                )
              : ""}
          </TableCell>
        );
      },
    },
    {
      id: "startDate",
      isDisbanding: true,
      label: "Start Date & Time",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.startDate).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "endDate",
      isDisbanding: true,
      label: "End Date & Time",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.endDate).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: 'releaseBuild',
      label: 'Status',
      twoLineText: true,
      type: 'custom',
      render: (row) => {
          return <TableCell >{row?.isActive ? "Active" : "Completed"}</TableCell>
      }
  },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            type: 'custom',
            label: 'Action',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                  {!row?.isDeleted && <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddMaintenancePopup', { isEdit: true, row })}>Edit</span>
                    }
                    {!row?.isDeleted && <span className='edit_btn edit-btn-action prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteMaintenance({MaintenanceId : row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>}
                </TableCell>
            }
        })

    ];
    const columns_history = [
      {
        id: "Icon",
        label: " Icon",
        isDisbanding: true,
        type: "custom",
        render: (row, i) => {
          return (
            <TableCell className={"table_icon"}>
              <img src={row?.maintenanceImage || user} alt={""} />
            </TableCell>
          );
        },
      },
      {
        id: "title",
        label: "Title",
      },
      {
        id: "description",
        isDisbanding: true,
        label: "Description",
        twoLineText: true,
        type: "custom",
        render: (row) => {
          return (
            <TableCell>
              {row?.description
                ? dotGenerator(
                    row?.description,
                    handleOpenModal,
                    "Lobby Type Description"
                  )
                : ""}
            </TableCell>
          );
        },
      },
      {
        id: "reminderText",
        isDisbanding: true,
        label: "Reminder Text",
        twoLineText: true,
        type: "custom",
        render: (row) => {
          return (
            <TableCell>
              {row?.reminderText
                ? dotGenerator(
                    row?.reminderText,
                    handleOpenModal,
                    "Reminder Text"
                  )
                : ""}
            </TableCell>
          );
        },
      },
      {
        id: "startDate",
        isDisbanding: true,
        label: "Start Date & Time",
        twoLineText: true,
        type: "custom",
        render: (row) => {
          return (
            <TableCell>
              {moment(row?.startDate).format("MMM DD YYYY, hh:mm A")}
            </TableCell>
          );
        },
      },
      {
        id: "endDate",
        isDisbanding: true,
        label: "End Date & Time",
        twoLineText: true,
        type: "custom",
        render: (row) => {
          return (
            <TableCell>
              {moment(row?.endDate).format("MMM DD YYYY, hh:mm A")}
            </TableCell>
          );
        },
      },
      {
        id: 'releaseBuild',
        label: 'Status',
        twoLineText: true,
        type: 'custom',
        render: (row) => {
            return <TableCell >{row?.isActive ? "Active" : "Completed"}</TableCell>
        }
    },
      
      ];

    useEffect(() => {
        getActiveMaintenanceDetails();
        getMaintenanceHistoryDetails();

    }, [])
    useEffect(() => {
        getMaintenanceHistoryDetails();
    }, [history?.totalDocs])

    const getActiveMaintenanceDetails = () => {
        let payload = {
          start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
          limit: pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getActiveMaintenance(payload)).then(res => {
            setLoader(false)
           if(res.data.success){
               setRowData({
                   ...rowData,
                   list: Object?.keys(res?.data?.data || {})?.length > 0 ? [res.data.data] : [],
               })
           }
        });
    };
    const getMaintenanceHistoryDetails = () => {
        let payload = {
          start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
          limit: pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getMaintenanceHistory(payload)).then(res => {

            setLoader(false)
           if(res.data.success){
            setHistory({
                   ...history,
                   list: Object?.keys(res?.data?.data?.docs || {})?.length > 0 ? [res.data.data.docs] : [],
                   totalDocs: res?.data?.data?.totalDocs
               })
           }
        });
    };

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <h2> Create maintenance</h2>
                {
                    (hideActionFunc('master') && rowData?.list?.length <= 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddMaintenancePopup')}> + Create Maintenance</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <h2> Maintenance history</h2>
                <CustomTable
                    headCells={columns_history}
                    rowData={history?.list[0]}
                    totalDocs={history?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getActiveMaintenanceDetails} />
            </CommonModal>
        </Box>
    )
}
export default Maintenance