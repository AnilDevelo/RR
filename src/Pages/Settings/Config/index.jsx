import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { configList} from "../../../Redux/settings/action";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import { ActionFunction, addPrefixFormat} from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import GlobleConfig from "./GlobleConfig";

const Config = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [config, setConfigList] = useState({
    list: [],
  });

  useEffect(() => {
    configListData();
  }, []);

  const configListData = () => {
    setLoader(true);
    dispatch(configList()).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setConfigList({
          ...config,
          list:
            Object.keys(res.data.data?.CONFIG)?.length > 0
              ? [res.data.data?.CONFIG]?.reduce((acc, cur) => {
                  acc = Object.keys(cur)?.reduce((prev, next) => {
                    return [
                      ...prev,
                      {
                        name: next?.replaceAll("_", " ")?.toLowerCase(),
                        amount: Number(cur[next]),
                      },
                    ];
                  }, []);
                  return acc;
                }, [])
              : [],
        });
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

      case "UpdateSettingConfig": {
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
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Config Type",
      type: "custom",
      render: (row, i) => {
        const capitalizedFirstName = row?.name ? row.name.charAt(0).toUpperCase() + row.name.slice(1) : "";
        return <TableCell className={"config_text"}>{capitalizedFirstName}</TableCell>;
      },
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      label: "Config",
      type: "custom",
      render: (row, i) => {
        const preValue = row?.name === "platform commission" ? "%" : "₹";
        return <TableCell>{row?.name === "platform commission" ? `${row?.amount}%` :row?.name === "bonus expire days" ? `${row?.amount} Day`: addPrefixFormat(row?.amount, preValue)}</TableCell>;
      },
    },    
    ActionFunction("user", {
      id: "Action",
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {
              <span
                className="edit_btn edit-btn-action"
                onClick={() =>
                  handleOpenModal("UpdateSettingConfig", {
                    name: row?.name,
                    amount: row?.amount,
                  })
                }
              >
                Edit
              </span>
            }
          </TableCell>
        );
      },
    }),
  ];
  return (
    <>
    <Paper sx={{ mb: 2 }} className="outer-box">
      {/* {loader ? <Loader /> : ""} */}
      <CustomTable
        headCells={columns}
        rowData={config?.list}
        isWinnerTitle={true}
        loading={loader}
      />

      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={configListData}
        />
      </CommonModal>
    </Paper>
      <GlobleConfig />
      </>
  );
};

export default Config;
