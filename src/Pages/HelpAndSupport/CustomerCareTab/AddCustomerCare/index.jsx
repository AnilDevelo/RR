import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import {
  addCustomerCare,
  updateCustomerCare,
} from "../../../../Redux/HelpAndSupport/action";
import { useDispatch } from "react-redux";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const AddCustomerCare = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const [loader, setLoader] = useState(false);
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [formData, setFormData] = useState({
    phoneNumber: "",
    isAllDay: false,
    startTime: null,
    endTime: null,
  });
  const [isDatePickerDisabled, setDatePickerDisabled] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        startTime: moment(formData?.startTime).format("hh:mm A"),
        endTime: moment(formData?.endTime).format("hh:mm A"),
      };
      dispatch(addCustomerCare(payload)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", {
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

  useEffect(() => {
    if (modalValue?.isEdit) {
      setFormData({
        ...formData,
        phoneNumber: modalValue?.row?.phoneNumber,
        isAllDay: modalValue?.row?.isAllDay,
        startTime: moment(modalValue?.row?.startTime, "HH:mm A")?._d,
        endTime: moment(modalValue?.row?.endTime, "HH:mm A")?._d,
      });
    }
  }, [modalValue]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        startTime: moment(formData?.startTime).format("hh:mm A"),
        endTime: moment(formData?.endTime).format("hh:mm A"),
        customerCareId: modalValue?.row?._id,
      };
      dispatch(updateCustomerCare(payload)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", {
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

  const handleDateChange = (date) => {
    if (!formData?.isAllDay) {
      if ("12:00 AM" !== moment(date).format("hh:mm A")) {
        setFormData({ ...formData, endTime: date });
      } else {
        handleOpenErrorModal("CommonPop", {
          header: "Error",
          body: "You can not select this time.",
        });
      }
    } else {
      setFormData({ ...formData, endTime: date });
    }
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

  
  return (
    <Box sx={style}>
      <div
        className={"add_admin_user_popup modal_main_popup customer_care_detail"}
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? " Update Customer Care Detail"
              : " Add Customer Care Detail"}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"user_kyc_section"}>
              <div className={"user_kyc_section_filed"}>
                <label>
                  Customer Care Number{" "}
                  <span className={"validation-star"}>*</span>
                </label>
                <div className={"user_kyc_section_input_filed"}>
                <input
                  type={"number"}
                  name={"phoneNumber"}
                  value={formData?.phoneNumber}
                  placeholder={"Enter Customer Care Number"}
                  onWheel={(event) => event.currentTarget.blur()}
                  onChange={(e) => {
                    const inputPhoneNumber = e.target.value;
                    // Check if the input value exceeds 10 characters
                    if (inputPhoneNumber.length <= 20) {
                      // Update the state only if the input is within the limit
                      setFormData({ ...formData, phoneNumber: inputPhoneNumber });
                    }
                  }}
                />
                </div>
                {simpleValidator.current.message(
                  "Customer care Number",
                  formData.phoneNumber,
                  "required"
                )}
              </div>

              <div className={"common_checkbox_details"}>
                <div className={"game_mode_btn"}>
                  <div className={"game_mode_btn_option yes_radio_btn"}>
                    <input
                      type={"radio"}
                      name={"isAllDay"}
                      checked={formData?.isAllDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isAllDay: true,
                          startTime: null,
                          endTime: null,
                        })
                      }
                    />
                    <label>All day Availability</label>
                  </div>
                  <div className={"game_mode_btn_option no_radio_btn"}>
                    <input
                      type={"radio"}
                      name={"isAllDay"}
                      checked={!formData?.isAllDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isAllDay: false,
                          startTime: null,
                          endTime: null,
                        })
                      }
                    />
                    <label>Monday - Saturday</label>
                  </div>
                </div>
              </div>

              <div className={"date-picker-details-section"}>
                <label className={"date-label"}>
                  Availability Time Duration{" "}
                </label>
                <div className={"care-datePicker"}>
                  <div className={"user_kyc_section_filed start-time-date"}>
                    <label>
                      Start Time <span className={"validation-star"}>*</span>
                    </label>
                    <DatePicker
                      selected={formData?.startTime}
                      className="form_control"
                      showTimeSelect
                      showTimeSelectOnly
                      onChange={(date) =>
                        setFormData({ ...formData, startTime: date, endTime:null })
                      }
                      timeCaption="Start At"
                      dateFormat="h:mm aa"
                      timeIntervals={1}
                      placeholderText="Select Start Time"
                      onKeyDown={(e) => {
                      e.preventDefault();
                      }}
                    />
                    {simpleValidator.current.message(
                      "startTime",
                      formData.startTime,
                      "required"
                    )}
                  </div>
                  <div className={"user_kyc_section_filed end-time-date"}>
                    <label>
                      End Time <span className={"validation-star"}>*</span>
                    </label>
                    {formData.startTime == null ? (
                      <DatePicker
                        selected={formData?.endTime}
                        className="form_control"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="End At"
                        dateFormat="h:mm aa"
                        onChange={handleDateChange}
                        timeIntervals={1}
                        placeholderText="Select End Time"
                        minTime={formData?.startTime ? new Date(formData?.startTime?.getTime() + 60000): null}
                        maxTime={moment().endOf("days").toDate()}
                        disabled
                        onKeyDown={(e) => {
                        e.preventDefault();
                        }}
                      />
                    ) : (
                      <DatePicker
                        selected={formData?.endTime}
                        className="form_control"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="End At"
                        dateFormat="h:mm aa"
                        onChange={handleDateChange}
                        timeIntervals={1}
                        placeholderText="Select End Time"
                        minTime={formData?.startTime ? new Date(formData?.startTime?.getTime() + 60000): null}
                        maxTime={moment().endOf("days").toDate()}
                        onKeyDown={(e) => {
                        e.preventDefault();
                        }}
                      />
                    )}
                    {simpleValidator.current.message(
                      "endTime",
                      formData.endTime,
                      "required"
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
                value={modalValue?.isEdit ? "Update" :"Save"}
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
export default AddCustomerCare;
