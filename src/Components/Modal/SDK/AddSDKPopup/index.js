import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import PopComponent from "../../../../hoc/PopContent";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  createSDKVersionData,
  updateSDKVersionDetails,
} from "../../../../Redux/SDKManagement/action";
import CommonModal from "../../../../hoc/CommonModal";
import Link from "../../../../images/Link";
import FilledButton from "../../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import AddLinkIcon from "../../../../images/AddLinkIcon";
import moment from "moment";
import { jsonToFormData } from "../../../../utils";

const AddSDKPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [loader, setLoader] = React.useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [imageLoader, setImageLoader] = useState({
    ios: false,
    android: false,
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formData, setFormData] = useState({
    unitySdk: "",
    iosSdk: "",
    androidSdk: "",
    sdkVersion: "",
    unityEnvCompatibility: "",
    iosEnvCompatibility: "",
    androidEnvCompatibility: "",
    releaseDate: new Date(),
    editFile: {
      unitySdk: false,
      iosSdk: false,
      androidFileName: "",
      iosFileName: "",
    },
  });
  const [openCale,setOpenCale] = useState(false)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 645,
    bgcolor: "background.paper",
    borderRadius: 1,
    border: "0",
    boxShadow: 24,
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const addSDKVersionHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        releaseDate: moment(formData?.releaseDate).format("YYYY-MM-DD"),
        releaseNote: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      };
      delete payload.editFile;
      setLoader(true);
      dispatch(createSDKVersionData(jsonToFormData(payload))).then((res) => {
        if (res.data.success) {
          redirectApiHandler();
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenModalError("CommonPop", {
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

  const updateSDKVersionHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        releaseDate: moment(formData?.startDate).format("YYYY-MM-DD"),
        releaseNote: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        isUnitySdkUpdated: formData.editFile?.unitySdk,
        isIosSdkUpdated: formData.editFile?.unitySdk,
        sdkVersionId: modalValue?._id,
      };
      delete payload.editFile;
      if (!formData.editFile?.unitySdk) {
        delete payload.unitySdk;
      }
      if (!formData.editFile?.iosSdk) {
        delete payload.iosSdk;
      }
      setLoader(true);
      dispatch(updateSDKVersionDetails(jsonToFormData(payload))).then((res) => {
        if (res.data.statusCode === 200 && res.data.success) {
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenModalError("CommonPop", {
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

  const handleOpenModalError = (type, data) => {
    switch (type) {
      case "DeleteAvatarUser": {
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

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "unitySdk" || name === "iosSdk") {
      if (name === "unitySdk") {
        setImageLoader({ ...imageLoader, android: true });
        setTimeout(() => {
          setImageLoader({ ...imageLoader, android: false });
          setFormData({
            ...formData,
            [name]: e.target.files[0],
            editFile: {
              ...formData.editFile,
              [name]: true,
              androidFileName: e.target.files[0]?.name,
            },
          });
        }, 2000);
      } else {
        setImageLoader({ ...imageLoader, ios: true });

        setTimeout(() => {
          setImageLoader({ ...imageLoader, ios: false });
          setFormData({
            ...formData,
            [name]: e.target.files[0],
            editFile: {
              ...formData.editFile,
              [name]: true,
              iosFileName: e.target.files[0]?.name,
            },
          });
        }, 2000);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (modalValue) {
      if (Object.keys(modalValue)?.length > 0) {
        setFormData({
          ...formData,
          releaseDate: modalValue?.releaseDate,
          iosEnvCompatibility: modalValue?.iosEnvCompatibility,
          androidSdk: modalValue?.androidSdk,
          sdkVersion: modalValue?.sdkVersion,
          unityEnvCompatibility: modalValue?.unityEnvCompatibility,
          androidEnvCompatibility: modalValue?.androidEnvCompatibility,
        });
        const contentBlock = htmlToDraft(modalValue?.releaseNote);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
      }
    }
  }, []);

  const handleDatePicker = (newValue) => {
    setFormData({
      ...formData,
      releaseDate: newValue,
    });
  }

  return (
    <>
      <Box sx={style}>
        <div className={"Add-sdk-version-section add_admin_user_popup"}>
          {/*<h4>Add Your SDK</h4>*/}
          <div className={'add_admin_user_popup_title'}>
            <h2>{`Add New SDK`}</h2>
          </div>
          <div className={"form-section sdk-form-section"}>
            <form
              onSubmit={
                modalValue
                  ? (e) => updateSDKVersionHandler(e)
                  : (e) => addSDKVersionHandler(e)
              }
            >
              <div className={"Add-sdk-version-form-sec"}>
                <div className="form_group profile_main">
                  <div className="user_profile">
                    <label htmlFor="" className="profile_label">
                      {" "}
                      {formData?.editFile?.unitySdk || modalValue
                        ? "Edit Unity SDK"
                        : "Add Unity SDK"}
                    </label>
                    <div className="user_profile_pic" style={{ position: "relative" }}>
                      <span className="addnew">
                        <Link />
                        <input type="file" name="unitySdk" accept=".zip" onChange={(e) => handleChange(e)}/>
                      </span>
                      {imageLoader.android && (
                        <CircularProgress style={{ position: "absolute" }} />
                      )}
                    </div>
                    <a href={"#"} className={"sdk-file-name"}>
                      {formData?.editFile.androidFileName
                        ? formData?.editFile.androidFileName
                        : modalValue?.unitySdkKey?.split("/")[3]}
                    </a>
                    {!modalValue &&
                      simpleValidator.current.message(
                        "unitySdk",
                        formData?.unitySdk,
                        "required"
                      )}
                  </div>
                </div>
                <div className="form_group profile_main">
                  <div className="user_profile">
                    <label htmlFor="" className="profile_label">
                      {formData?.editFile?.iosSdk || modalValue
                        ? "Edit IOS SDK"
                        : " Add IOS SDK"}
                    </label>
                    <div
                      className="user_profile_pic"
                      style={{ position: "relative" }}
                    >
                      <span className="addnew">
                        <Link />
                        <input
                          type="file"
                          accept=".zip"
                          name={"iosSdk"}
                          onChange={(e) => handleChange(e)}
                        />
                      </span>
                      {imageLoader.ios && (
                        <CircularProgress style={{ position: "absolute" }} />
                      )}
                    </div>
                    <a href={"#"} className={"sdk-file-name"}>
                      {formData?.editFile?.iosFileName
                        ? formData?.editFile?.iosFileName
                        : modalValue?.iosSdkKey?.split("/")[3]}
                    </a>
                    {!modalValue &&
                      simpleValidator.current.message(
                        "IosSdk",
                        formData?.iosSdk,
                        "required"
                      )}
                  </div>
                </div>
              </div>

              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce valid"}>
                  <label>Android SDK Link</label>
                  <input
                    type={"text"}
                    className={"and-link-input"}
                    value={formData?.androidSdk}
                    placeholder={"Android SDK Link"}
                    name={"androidSdk"}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className={"link-img"}>
                    <AddLinkIcon />
                  </div>
                  {simpleValidator.current.message(
                    "Android SDK",
                    formData?.androidSdk,
                    "required"
                  )}
                </div>
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce valid"}>
                  <label>Android SDK Version</label>
                  <input
                    type={"text"}
                    placeholder={"SDK Version"}
                    value={formData.sdkVersion}
                    name={"sdkVersion"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "SDK Version",
                  formData?.sdkVersion,
                  "required"
                )}
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce valid"}>
                  <label>Unity Environment Compatibility</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Compatible Version"}
                    value={formData.unityEnvCompatibility}
                    name={"unityEnvCompatibility"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "Unity Env Compatibility",
                  formData?.unityEnvCompatibility,
                  "required"
                )}
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce valid"}>
                  <label>IOS Environment Compatibility</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Compatible Version"}
                    value={formData.iosEnvCompatibility}
                    name={"iosEnvCompatibility"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "Ios Env Compatibility",
                  formData?.iosEnvCompatibility,
                  "required"
                )}
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce valid"}>
                  <label>Android Environment Compatibility</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Compatible Version"}
                    value={formData.androidEnvCompatibility}
                    name={"androidEnvCompatibility"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "Android Environment Compatibility",
                  formData?.androidEnvCompatibility,
                  "required"
                )}
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce"}>
                  <label>Release Notes</label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                    toolbar={{
                      options: ["inline", "fontSize", "textAlign", "colorPicker", "history",],
                      inline: {inDropdown: false, options: ["bold", "italic"],},
                    }}
                  />
                </div>
                {/*{simpleValidator.current.message( "Release Note", formData?.editorState, "required" )}*/}
              </div>
              <div className={"Add-sdk-form-sec"}>
                <div className={"Add-sdk-input-sce-date"}>
                  <label className={"date-lable"}>Release Date</label>
                  <div className={'release_date'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                          name="start-date"
                          className={"date-picker-section"}
                          value={formData.releaseDate}
                          onChange={(newValue) => handleDatePicker(newValue)}
                          open={openCale}
                          onClose={()=> setOpenCale(false)}
                          inputFormat="MMM dd, yyyy"
                          minDate={new Date()}
                          renderInput={(params) => <TextField {...params} onClick={()=>setOpenCale(!openCale)} />}
                          inputProps={{ readOnly: true }}
                      />
                    </LocalizationProvider>
                  </div>
                  {/*{simpleValidator.current.message( "Release Date", formData?.releaseDate, "required" )}*/}
                </div>
              </div>
              <div className={"form-btn-sdk"}>
                {/*<FilledButton type={'submit'} value={'Upload SDK'} className={'loader_class_font'} loading={loader} />*/}
                <FilledButton
                  type={"submit"}
                  value={"Upload SDK"}
                  className={"submit_btn loader_css"}
                  loading={loader}
                />
              </div>
            </form>
          </div>
        </div>
      </Box>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
    </>
  );
};
export default AddSDKPopup;
