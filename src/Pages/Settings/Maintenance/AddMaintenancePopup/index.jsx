import { Box } from "@mui/material";
import { jsonToFormData, profileImages } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { createMaintenance } from "../../../../Redux/settings/action";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 744,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const AddMaintenancePopup = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        releaseNumber: {
          message: "Release number is not valid",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(
              val,
              /^(\d+\.)?(\d+\.)?(\*|\d+)$/
            );
          },
          required: true,
        },
      },
    })
  );
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [timeGrater, setTimeGrater] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [formData, setFormData] = useState({
    title: "",
    maintenanceImage: "",
    description: "",
    startDate: null,
    endDate: null,
    reminderText: "",
    isImageUpdated: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timeGrater) {
      simpleValidator.current.fields.pleaseAddValidEndTime = true;
    }
    if (simpleValidator.current.allValid() && !timeGrater) {
      let payload = {
        ...formData,
        startDate: moment(formData?.startDate).format(),
        endDate: moment(formData?.endDate).format(),
      };
      setLoader(true);
      dispatch(createMaintenance(jsonToFormData(payload))).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!timeGrater) {
      simpleValidator.current.fields.pleaseAddValidEndTime = true;
    }
    if (simpleValidator.current.allValid() && !timeGrater) {
      let payload = {
        ...formData,
        startDate: moment(formData?.startDate).format(),
        endDate: moment(formData?.endDate).format(),
      };
      if (!payload?.isImageUpdated) {
        delete payload?.maintenanceImage;
      }
      setLoader(true);
      dispatch(createMaintenance(jsonToFormData(payload))).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
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

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type?.includes("image/") &&
      file.type !== "image/gif" &&
      file.type !== "image/svg+xml"
    ) {
      if (file.size <= 5 * 1024 * 1024) {
        // Check if file size is less than or equal to 5 MB
        setFormData({
          ...formData,
          maintenanceImage: file,
          isImageUpdated: true,
        });
      } else {
        handleOpenErrorModal("CommonPop", {
          header: "Error",
          body: "Please select an image file smaller than 5 MB.",
        });
      }
    } else {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Please add only .jpg, .jpeg, .png files.",
      });
    }

};

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const handleDatePicker = (newValue, type) => {
    if (type === "startDate") {
      setFormData({ ...formData, [type]: newValue, endDate: null });
    } else {
      let sDate = new Date(formData?.startDate);
      let eDate = new Date(newValue);
      if (sDate.getTime() < eDate.getTime()) {
        setTimeGrater(false);
        setFormData({ ...formData, [type]: newValue });
      } else {
        if (sDate.getTime() > eDate.getTime()) {
          setTimeGrater(true);
          setFormData({ ...formData, endDate: newValue });
        } else {
          // setTimeGrater(true);
          // setFormData({ ...formData, [type]: newValue });
          setTimeGrater(true);
          setFormData({ ...formData, endDate: newValue });
        }
      }
    }
  };

  useEffect(() => {
    if (modalValue?.isEdit) {
      setFormData({
        ...formData,
        title: modalValue?.row?.title,
        description: modalValue?.row?.description,
        maintenanceImage: modalValue?.row?.maintenanceImage,
        startDate: modalValue?.row?.startDate,
        endDate: modalValue?.row?.endDate,
      });
    }
  }, [modalValue]);

  return (
    <Box sx={style}>
      <div
        className={
          "add_admin_user_popup modal_main_popup maintenance_module_section lobby_section_details"
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit ? "Update Maintenance" : "Add New Maintenance"}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content mt_15"}>
          <form
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"level_popup_form_field "}>
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.maintenanceImage, user)}
                    {!formData?.maintenanceImage && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input
                          type="file"
                          name="labelIcon"
                          id=""
                          onChange={(e) => handleIconChange(e)}
                        />
                      </span>
                    )}
                  </div>
                  <label htmlFor="" className="profile_label">
                    Maintenance Icon{" "}
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                {simpleValidator.current.message(
                  "maintenanceIcon",
                  formData?.maintenanceImage,
                  "required"
                )}
                {formData?.maintenanceImage && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, maintenanceImage: "" })
                    }
                  >
                    <CloseSharpIcon />
                  </div>
                )}
              </div>
              <div className={"level_popup_form_field_left"}>
                <div className={"user_kyc_section"}>
                  <div className={"user_kyc_section_filed"}>
                    <label>
                      Title <span className={"validation-star"}>*</span>
                    </label>
                    <div
                      className={
                        "user_kyc_section_input_filed lobby-type-description"
                      }
                    >
                      <input
                        type={"text"}
                        placeholder={"Enter Title"}
                        maxLength={20}
                        value={formData?.title}
                        name={"title"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.title?.length}/20</span>
                    </div>
                    {simpleValidator.current.message(
                      "title",
                      formData?.title,
                      "required|min:2"
                    )}
                  </div>
                </div>
                <div className={"user_kyc_section"}>
                  <div className={"user_kyc_section_filed"}>
                    <label>
                      Description <span className={"validation-star"}>*</span>
                    </label>
                    <div
                      className={
                        "user_kyc_section_input_filed lobby-type-description"
                      }
                    >
                      <input
                        type={"text"}
                        value={formData?.description}
                        placeholder={"Enter Description"}
                        maxLength={100}
                        name={"description"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.description?.length}/100</span>
                    </div>
                    {simpleValidator.current.message(
                      "description",
                      formData?.description,
                      "required"
                    )}
                  </div>
                </div>
                <div className={"user_kyc_section"}>
                  <div className={"user_kyc_section_filed"}>
                    <label>
                      Reminder Text <span className={"validation-star"}>*</span>
                    </label>
                    <div
                      className={
                        "user_kyc_section_input_filed lobby-type-description"
                      }
                    >
                      <input
                        type={"text"}
                        value={formData?.reminderText}
                        placeholder={"Enter Reminder Text"}
                        maxLength={100}
                        name={"reminderText"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.reminderText?.length}/100</span>
                    </div>
                    {simpleValidator.current.message(
                      "reminderText",
                      formData?.reminderText,
                      "required| min: 2"
                    )}
                  </div>
                </div>
                <div className={"date-picker_coupon"}>
                  <div className={"start-date-picker"}>
                    <label>
                      Start Date <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"date_picker_value"}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          name="start-date"
                          renderInput={(props) => <TextField {...props} />}
                          className={"datePicker_details"}
                          value={formData?.startDate}
                          minDate={new Date()}
                          minDateTime={new Date()}
                          onChange={(newValue) =>
                            handleDatePicker(newValue, "startDate")
                          }
                          inputProps={{ readOnly: true ,placeholder: "Select Start Date" }}
                        />
                      </LocalizationProvider>
                    </div>
                    {simpleValidator.current.message(
                      "startDate",
                      formData?.startDate,
                      "required"
                    )}
                  </div>
                  <div className={"end-date-picker"}>
                    <label>
                      End Date <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"date_picker_value"}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          name="endDate"
                          renderInput={(props) => <TextField {...props} />}
                          className={"datePicker_details"}
                          value={formData?.endDate}
                          minDate={
                            formData?.startDate
                              ? formData?.startDate
                              : new Date()
                          }
                          onChange={(newValue) =>
                            handleDatePicker(newValue, "endDate")
                          }
                          inputProps={{ readOnly: true,placeholder: "Select End Date"  }}
                        />
                      </LocalizationProvider>
                    </div>
                    {simpleValidator.current.message(
                      "endDate",
                      formData?.endDate,
                      "required"
                    )}
                    {formData?.endDate && timeGrater && (
                      <span className={"srv-validation-message"}>
                        Please add valid end time
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={"formData_btn"}>
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
export default AddMaintenancePopup;
