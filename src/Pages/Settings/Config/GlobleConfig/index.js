import { Box, Paper, TableCell } from "@mui/material";
import { getGlobleConfigList } from "Redux/settings/action";
import CommonModal from "hoc/CommonModal";
import CustomTable from "hoc/CommonTable";
import PopComponent from "hoc/PopContent";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionFunction, hideActionFunc } from "utils";

const GlobleConfig = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [config, setConfigList] = useState({
    list: [],
  });  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails?.modalName];

  useEffect(() => {
    GetGlobleconfigListData();
  }, []);

  const columns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      isDisbanding: true,
      label: "Global Config Type",
      type: "custom",
      render: (row, i) => {
        const capitalizedFirstName = row?.name
          ? row.name.charAt(0).toUpperCase() + row.name.slice(1)
          : "";
        return (
          <TableCell className={"config_text"}>
            {capitalizedFirstName}
          </TableCell>
        );
      },
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      isDisbanding: true,
      label: "Config",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{`${row?.amount}%`}</TableCell>;
      },
    },
    // ActionFunction("settings", {
    //   id: "Action",
    //   disablePadding: false,
    //   label: "Action",
    //   isDisbanding: true,
    //   type: "custom",
    //   render: (row) => {
    //     return (
    //       <TableCell className={"role_field_id"}>
    //         <span
    //           className="edit_btn edit-btn-action"
    //           onClick={(e) => handleOpenModal("UpdateGlobleConfig", row)}
    //         >
    //           Edit
    //         </span>
    //       </TableCell>
    //     );
    //   },
    // }),
  ];
  const GetGlobleconfigListData = () => {
    setLoader(true);
    dispatch(getGlobleConfigList()).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setConfigList({
          ...config,
          list: Object.keys(res.data.data?.CONFIG)?.length > 0 ? [res.data.data?.CONFIG]?.reduce((acc, cur) => {
          acc = Object.keys(cur)?.reduce((prev, next) => { return [...prev, { name: next?.replaceAll("_", " ")?.toLowerCase(), amount: Number(cur[next]), },]; }, []);
          return acc;}, []): [],});
      }
    });
  };
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
      case "UpdateGlobleConfig": {
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

  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex_between"}>
          <h2>Global Config</h2>
          {hideActionFunc("settings") && config?.list?.length === 3 && (
            <button
              className={"btn"}
              onClick={() => handleOpenModal("UpdateGlobleConfig",config?.list)}
            >
              Edit Global Config
            </button>
          )}
        </div>
       
        <CustomTable
          headCells={columns}
          rowData={config?.list}
          isWinnerTitle={true}
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
          redirectApiHandler={GetGlobleconfigListData}
        />
      </CommonModal>
    </Box>
  );
};

export default GlobleConfig;
