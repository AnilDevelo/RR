import React, { useCallback, useEffect, useRef, useState } from "react";
import PopComponent from "../../../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import { createDeleteUserPolicy } from "../../../../../Redux/Documentation/action";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import { hideActionFunc } from "../../../../../utils";
import CommonModal from "../../../../../hoc/CommonModal";
import TextEditor from "../../TextEditor";
import SimpleReactValidator from "simple-react-validator";

const DeleteUserRules = ({ rowData, getDeleteUserPolicyData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object?.keys(rowData || {})?.length > 0) {
      setFormData({
        ...formData,
        title: rowData?.title,
        description: rowData?.description,
      });
    }
  }, [rowData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        description: formData?.description,
        title: formData?.title,
      };
      dispatch(createDeleteUserPolicy(payload)).then((res) => {
        if (res.data.success) {
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
          });
          getDeleteUserPolicyData();
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
      case "UpdateUserDeleteAccountPolicy": {
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

  const handleEditor = (props) => {
    setFormData({
      ...formData,
      description: props,
    });
  };

  return (
    <>
      <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
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
            />
          </div>
        </div>
        {hideActionFunc("master") && (
          <div className={"game-play-rules"}>
          {
            checkRchEmpty() ?
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Save User Delete Policy</button>
              :
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Update User Delete Policy</button>
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
          redirectApiHandler={getDeleteUserPolicyData}
        />
      </CommonModal>
    </>
  );
};
export default DeleteUserRules;
