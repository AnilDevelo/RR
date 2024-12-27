import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import SimpleReactValidator from "simple-react-validator";
import "react-quill/dist/quill.snow.css";
import { useCallback } from "react";
import PopComponent from "hoc/PopContent";
import TableLoader from "hoc/CommonTable/TableLoader";
import { hideActionFunc } from "utils";
import CommonModal from "hoc/CommonModal";
import TextEditor from "Pages/Master/Document/TextEditor";
import { createTermsandconditions, getTermsandconditions } from "Redux/Tournament/action";

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getTermsandconditionsData();
  }, [dispatch]);

  const getTermsandconditionsData = () => {
    setLoader(true);
    dispatch(getTermsandconditions({})).then((res) => {
      setRowData(res?.data?.data);
      setLoader(false);
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        description: formData?.description,
        title: formData?.title,
      };
      dispatch(createTermsandconditions(payload)).then((res) => {
        if (res.data.statusCode === 200) {
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
          });
          getTermsandconditionsData();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res.data.msg,
          });
        }
      });
    } else {
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
      // title: rowData?.title,
      description: props,
    });
  };

  return (
    <>
      {loader ? <TableLoader /> : ""}
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
            {simpleValidator.current.message("title", formData?.title, 'required|min:2')}
          </div>
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
        {hideActionFunc("tournament") && (
          <div className={"game-play-rules"}>
          {
            checkRchEmpty() ?
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Save Terms And Conditions</button>
              :
            <button className={'btn mt_2'} type={"submit"} onClick={(e) => handleSubmit(e)}>Update Terms And Conditions</button>
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
          redirectApiHandler={getTermsandconditionsData}
        />
      </CommonModal>
    </>
  );
};
export default TermsAndConditions;
