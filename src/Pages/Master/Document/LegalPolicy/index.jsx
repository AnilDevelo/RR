import React, { useCallback, useEffect, useRef, useState } from "react";
import PopComponent from "../../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import CommonModal from "../../../../hoc/CommonModal";
import {
  createLegalPolicy,
  getLegalPolicy,
} from "../../../../Redux/Documentation/action";
import { hideActionFunc } from "../../../../utils";
import TextEditor from "../TextEditor";
import TableLoader from "hoc/CommonTable/TableLoader";
import SimpleReactValidator from "simple-react-validator";

const LegalPolicy = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({});
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getLegalPolicyHandler();
  }, []);

  const getLegalPolicyHandler = () => {
    setLoader(true);
    dispatch(getLegalPolicy({})).then((res) => {
      setRowData(res?.data?.data);
      setLoader(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        description: formData?.description,
        title: formData?.title,
      };
      dispatch(createLegalPolicy(payload)).then((res) => {
        if (res.data.success) {
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
          });
          getLegalPolicyHandler();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res.data.msg,
          });
        }
      });
    }else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const checkRchEmpty = (html = formData?.description) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    let isImage = div?.getElementsByTagName?.("img")?.length > 0;
    if (isImage) {
      return false;
    }
    return (
      div.innerText.replaceAll("\n", "").trim() === "" ||
      div.innerText.replaceAll("\n", "").trim() === "undefined"
    );
  };

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "UpdateLegalPolicyPop":
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

  useEffect(() => {
    if (Object.keys(rowData || {})?.length > 0) {
      setFormData({
        ...formData,
        title: rowData?.title,
        description: rowData?.description,
      });
    }
  }, [rowData]);

  const handleEditor = (props) => {
    setFormData({
      ...formData,
      title: rowData?.title,
      description: props,
    });
  };

  return (
    <>
      <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
        {loader && <TableLoader />}
        <div className={"formData policy_form"}>
          <label className={"fontFamily"}>
            Title <span className={"validation-star"}>*</span>
          </label>
          <div className={"policy_title"}>
            <input
              type={"text"}
              name={"title"}
              placeholder={"Enter Title"}
              className={"fontFamily"}
              value={formData?.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>
          {simpleValidator.current.message("title", formData?.title, 'required|min:2')}
        </div>
        <div className={"text-editor-details-section"}>
          <label className={"fontFamily"}>Description</label>
          <div className={"mt_margin"}>
            <TextEditor
              handleChange={handleEditor}
              value={formData?.description}
              classNameProps={"policy_details"}
            />
          </div>
        </div>
        {hideActionFunc("master") && (
          <div className={"game-play-rules"}>
          {
            checkRchEmpty() ?
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Save Legal Policy</button>
              :
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Update Legal Policy</button>
          }
          </div>
        )}
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
          redirectApiHandler={getLegalPolicyHandler}
        />
      </CommonModal>
    </>
  );
};


export default LegalPolicy;
