import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import FilledButton from "../../../FileButton";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import {
  createWebsiteAboutList,
  updateWebsiteAboutList,
} from "../../../../Redux/website/action";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import htmlToDraft from "html-to-draftjs";
import TextEditor from "Pages/Master/Document/TextEditor";
import { checkRchEmpty } from "utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};
const AddAboutPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        description: {
          message: "The description field is required.",
          rule: (val, params, validator) => {
            return !checkRchEmpty(val)
          },
          required: true,
        },
      },
    })
  );
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({
    description: "",
    title: "",
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
      };
      setLoader(true);
      dispatch(createWebsiteAboutList(payload)).then((res) => {
        if (res.data.success) {
          redirectApiHandler();
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenErrorModal("CommonPop", {
            header: "Error",
            body: res?.data?.message || res?.data?.msg,
          });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setFormData({
      ...formData,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };
  const handleOpenErrorModal = (type, data) => {
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
  useEffect(() => {
    if (modalValue?.isEdit) {
      const { row } = modalValue;
      setFormData({
        ...formData,
        title: row?.title,
        description: row?.description,
      });
      const contentBlock = htmlToDraft(row?.description);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, []);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        aboutId: modalValue?.row?._id,
      };
      setLoader(true);
      dispatch(updateWebsiteAboutList(payload)).then((res) => {
        if (res.data.success) {
          redirectApiHandler();
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenErrorModal("CommonPop", {
            header: "Error",
            body: res?.data?.message || res?.data?.msg,
          });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };
  const handleEditor = (props) => {
    setFormData({
      ...formData,
      description: props,
    });
  };

  return (
    <Box sx={style}>
      <div className={"add_admin_user_popup"}>
        <div className={"add_admin_user_popup_title"}>
          <h2> {modalValue?.isEdit ? "Update About" : " Add About"} </h2>
        </div>
        <div className={"add_game_details_sec add_admin_user_popup_content"}>
          <form
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"game_display_form winner_content_form "}>
              <div className={"game_flex"}>
                <div className="formData formData_field">
                  <label>
                    Title <span className={"validation-star"}>*</span>
                  </label>
                  <div className="emailWrap">
                    <input
                      type="text"
                      name="title"
                      placeholder={"Enter Title"}
                      value={formData?.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  {simpleValidator.current.message(
                    "title",
                    formData?.title,
                    "required"
                  )}
                </div>
                <div className={"Add-sdk-form-sec formData_field"}>
                  <div className={"Add-sdk-input-sce"}>
                    <label>
                      {" "}
                      Description <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"game_display_form"}>
                      <div className={"text-editor-details-section"}>
                        <TextEditor
                          handleChange={handleEditor}
                          value={formData?.description}
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                  {simpleValidator.current.message(
                    "description",
                    formData?.description,
                    "required|description"
                  )}
                </div>
                <div className={"d_flex_end mt_1"}>
                  <button
                    className={"btn_default"}
                    type={"reset"}
                    onClick={() => handleOpenModal()}
                  >
                    Cancel
                  </button>
                  <FilledButton
                    type={"submit"}
                    value={modalValue?.isEdit ? "Update" : "Save"}
                    className={"btn loader_css"}
                    loading={loader}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenErrorModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenErrorModal}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
    </Box>
  );
};
export default AddAboutPopup;
