import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {
  addChallanTDSDetails,
  addTDSFilling,
  updateChallanTDSDetails,
} from "../../../../../Redux/TDSReport/action";
import { Box } from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import GameStatusDropDown from "../../../../../Components/MainCommonFilter/GameStatusDropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import SectionDropdown from "./SectionDropdown";
import MinorHeadDropdown from "./MinorHeadDropdown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "30px 0",
  borderRadius: "5px",
};

const AddTDSChallan = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        email: {
          message: "The email must be a valid email address.",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(
              val,
              /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
            );
          },
          required: true,
        },
      },
    })
  );
  const [loader, setLoader] = useState(false);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [openCale, setOpenCale] = useState({
    month: false,
    year: false,
    chalnStartDate: false,
    chalanEndDate: false,
    paid_date: false,
  });
  const [formData, setFormData] = useState({
    challan_serial: "",
    bsr_code: "",
    paid_date: "",
    minor_head: "",
    tds_amount: "",
    surcharge: "",
    education_cess: "",
    interest: "",
    late_filing_fees: "",
    other_penalty: "",
    section: "",
    month: "",
    year: "",
    chalnStartDate: "",
    chalanEndDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        paid_date: moment(formData?.paid_date).format("YYYY-MM-DD"),
        chalnStartDate: moment(formData?.chalnStartDate).format("YYYY-MM-DD"),
        chalanEndDate: moment(formData?.chalanEndDate).format("YYYY-MM-DD"),
        month: moment(formData?.month).format("MM"),
        year: moment(formData?.year).format("YYYY"),
        section : formData?.section === '194B' ? '194B - Lotteries / Puzzle / Game' :  formData?.section === '194B-P' ? '194B-P - Winnings from lotteries and crossword puzzles where consideration is made in kind or cash is not sufficient to meet the tax liability and tax has been paid before such winnings are released' : formData?.section === '194BA' ? '194BA - Winnings from online games': ''

      };
      setLoader(true);
      dispatch(addChallanTDSDetails(payload)).then((res) => {
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
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (modalValue?.isEdit) {
      const { row } = modalValue;

      setFormData({
        ...formData,
        challan_serial: row?.challan_serial,
        bsr_code: row?.bsr_code,
        paid_date: moment(row?.paid_date),
        minor_head: row?.minor_head,
        tds_amount: row?.tds_amount,
        surcharge: row?.surcharge,
        education_cess: row?.education_cess,
        interest: row?.interest,
        late_filing_fees: row?.late_filing_fees,
        other_penalty: row?.other_penalty,
        section:
          row?.section === "194B - Lotteries / Puzzle / Game"
            ? "194B"
            : row?.section ===
              "194B-P - Winnings from lotteries and crossword puzzles where consideration is made in kind or cash is not sufficient to meet the tax liability and tax has been paid before such winnings are released"
            ? "194B-P"
            : row?.section === "194BA - Winnings from online games"
            ? "194BA"
            : "",
        month: row?.month,
        year: row?.year,
        chalnStartDate: moment(row?.chalnStartDate),
        chalanEndDate: moment(row?.chalanEndDate),
      });
    }
  }, [modalValue]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        paid_date: moment(formData?.paid_date).format("YYYY-MM-DD"),
        chalnStartDate: moment(formData?.chalnStartDate).format("YYYY-MM-DD"),
        chalanEndDate: moment(formData?.chalanEndDate).format("YYYY-MM-DD"),
        month: moment(formData?.month).format("MM"),
        year: moment(formData?.year).format("YYYY"),
        TDSchallanId: modalValue?.row?._id,
        section : formData?.section === '194B' ? '194B - Lotteries / Puzzle / Game' :  formData?.section === '194B-P' ? '194B-P - Winnings from lotteries and crossword puzzles where consideration is made in kind or cash is not sufficient to meet the tax liability and tax has been paid before such winnings are released' : formData?.section === '194BA' ? '194BA - Winnings from online games': ''

      };
      setLoader(true);
      dispatch(updateChallanTDSDetails(payload)).then((res) => {
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

  const amountChangeHandler = (e) => {
    const { value, name } = e.target;
    // Check if the value is numeric
    if (!isNaN(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <Box sx={style}>
      <div
        className={
          "add_admin_user_popup modal_main_popup game-mode-config-design tds_file_section lobby_section_details"
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit ? "Update TDS Challan" : "Add TDS Challan"}
          </h2>
        </div>
        <div className={"header_slider_details header_slider_details_Ads"}>
          <form
            className="form_group "
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"user_kyc_section add_tDS_challan"}>
              <div className={"formData user_kyc_section_filed"}>
                <label>
                  Challan Serial <span className={"validation-star"}>*</span>
                </label>
                <div
                  className={
                    "user_kyc_section_input_filed lobby-type-description"
                  }
                >
                  <input
                    type={"text"}
                    placeholder={"Enter Challan Serial"}
                    maxLength={20}
                    value={formData?.challan_serial}
                    name={"challan_serial"}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "ChallanSerial",
                  formData?.challan_serial,
                  "required"
                )}
              </div>
              <div className={"d_flex w_100 gap_20"}>
                <div
                  className={"formData user_kyc_section_filed w_100 mr_margin"}
                >
                  <label>
                    BSR Code<span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter BSR Code"}
                      maxLength={10}
                      value={formData?.bsr_code}
                      name={"bsr_code"}
                      onChange={(e) => changeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "bsrCode",
                    formData?.bsr_code,
                    "required"
                  )}
                </div>

                <div className={"date-picker_coupon w_100 ml_margin"}>
                  <div className={"start-date-picker"}>
                    <label>
                      Paid Date <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"date_picker_value w_100"}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          name="chalnStartDate"
                          value={formData.paid_date}
                          onChange={(newValue) => {
                            setFormData({ ...formData, paid_date: newValue });
                            setOpenCale({ ...openCale, paid_date: false });
                          }}
                          open={openCale.paid_date}
                          onClose={() =>
                            setOpenCale({ ...openCale, paid_date: false })
                          }
                          inputFormat="MMM dd, yyyy"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              onClick={() =>
                                setOpenCale({
                                  ...openCale,
                                  paid_date: !openCale?.paid_date,
                                })
                              }
                            />
                          )}
                          inputProps={{
                            readOnly: true,
                            placeholder: "Select Paid Date",
                          }}
                          className={"datePicker_details w_100"}
                          maxDate={new Date()}
                        />
                      </LocalizationProvider>
                    </div>
                    {simpleValidator.current.message(
                      "paidDate",
                      formData?.paid_date,
                      "required"
                    )}
                  </div>
                </div>
              </div>
              <div className={"d_flex w_100 gap_20"}>
                <div
                  className={"formData user_kyc_section_filed w_100 mr_margin"}
                >
                  <label>
                    Minor Head<span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description w_100"
                    }
                  >
                    <MinorHeadDropdown
                      formData={formData}
                      setFormData={setFormData}
                      placeholder={"Select Minor Head"}
                    />
                    {/* <input type={'text'} placeholder={'Enter Minor Head'}  value={formData?.minor_head} name={'minor_head'}  onChange={(e)=>changeHandler(e)}  /> */}
                  </div>
                  {simpleValidator.current.message(
                    "MinorHead",
                    formData?.minor_head,
                    "required"
                  )}
                </div>
                <div
                  className={"formData user_kyc_section_filed w_100 ml_margin"}
                >
                  <label>
                    TDS Amount <span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter TDS Amount"}
                      maxLength={10}
                      value={formData?.tds_amount}
                      name={"tds_amount"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "tdsAmount",
                    formData?.tds_amount,
                    "required"
                  )}
                </div>
              </div>
              <div className={"d_flex gap_20"}>
                <div
                  className={"formData user_kyc_section_filed w_100 mr_margin"}
                >
                  <label>
                    Surcharge <span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter Surcharge"}
                      value={formData?.surcharge}
                      name={"surcharge"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "surcharge",
                    formData?.surcharge,
                    "required"
                  )}
                </div>
                <div
                  className={"formData user_kyc_section_filed w_100 ml_margin"}
                >
                  <label>
                    Education Cess<span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description w_100"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter Education Cess"}
                      className={"w_100"}
                      maxLength={20}
                      value={formData?.education_cess}
                      name={"education_cess"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "EducationCess",
                    formData?.education_cess,
                    "required"
                  )}
                </div>
              </div>

              <div className={"d_flex gap_20"}>
                <div
                  className={"formData user_kyc_section_filed w_100 mr_margin "}
                >
                  <label>
                    Interest <span className={"validation-star "}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter Interest"}
                      value={formData?.interest}
                      name={"interest"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "interest",
                    formData?.interest,
                    "required"
                  )}
                </div>
                <div
                  className={"formData user_kyc_section_filed ml_margin w_100"}
                >
                  <label>
                    Section <span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <SectionDropdown
                      formData={formData}
                      setFormData={setFormData}
                      placeholder={"Select Section"}
                    />
                    {/* <input type={'text'} placeholder={'Enter Section'}  value={formData?.section} name={'section'} onChange={(e)=>changeHandler(e)} /> */}
                  </div>
                  {simpleValidator.current.message(
                    "section",
                    formData?.section,
                    "required"
                  )}
                </div>
              </div>
              <div className={"d_flex gap_20"}>
                <div
                  className={"formData user_kyc_section_filed mr_margin w_100"}
                >
                  <label>
                    Late Filing Fees<span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter Late Filing Fees"}
                      value={formData?.late_filing_fees}
                      name={"late_filing_fees"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "lateFilingFees",
                    formData?.late_filing_fees,
                    "required"
                  )}
                </div>

                <div
                  className={"formData user_kyc_section_filed ml_margin w_100"}
                >
                  <label>
                    Other Penalty <span className={"validation-star"}>*</span>
                  </label>
                  <div
                    className={
                      "user_kyc_section_input_filed lobby-type-description"
                    }
                  >
                    <input
                      type={"text"}
                      placeholder={"Enter Other Penalty"}
                      value={formData?.other_penalty}
                      name={"other_penalty"}
                      onChange={(e) => amountChangeHandler(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "otherPenalty",
                    formData?.other_penalty,
                    "required"
                  )}
                </div>
              </div>

              <div
                className={
                  "filter_details_tab_section  user_kyc_section_filed mt_margin"
                }
              >
                <div className={"filter_inner_tab_info w_100"}>
                  <div className={"filter_export_date_dropdown"}>
                    <div className={"w_100 mr_margin"}>
                      <label>
                        Month <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"custom_date_filter platform_report_filter"}
                      >
                        <div
                          className={"start-date-picker"}
                          style={{ paddingLeft: "0px" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              views={["month"]}
                              maxDate={new Date()}
                              value={formData?.month}
                              onChange={(date) => {
                                setOpenCale(false);
                                setFormData({ ...formData, month: date });
                              }}
                              className={"w_100"}
                              inputFormat="MMMM"
                              open={openCale?.month}
                              onClose={() =>
                                setOpenCale({ ...openCale, month: false })
                              }
                              inputProps={{
                                readOnly: true,
                                placeholder: "Select Month",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  helperText={null}
                                  onClick={() =>
                                    setOpenCale({
                                      ...openCale,
                                      month: !openCale?.month,
                                    })
                                  }
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                    <div className={"w_100 ml_margin"}>
                      <label>
                        Year <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"custom_date_filter platform_report_filter"}
                      >
                        <div
                          className={"start-date-picker"}
                          style={{ paddingLeft: "0px" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              views={["year"]}
                              maxDate={new Date()}
                              value={formData?.year}
                              onChange={(date) => {
                                setOpenCale({ ...openCale, year: false });
                                setFormData({ ...formData, year: date });
                              }}
                              className={"w_100"}
                              inputFormat="yyyy"
                              open={openCale?.year}
                              onClose={() =>
                                setOpenCale({ ...openCale, year: false })
                              }
                              inputProps={{
                                readOnly: true,
                                placeholder: "Select Year",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  helperText={null}
                                  onClick={() =>
                                    setOpenCale({
                                      ...openCale,
                                      year: !openCale?.year,
                                    })
                                  }
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  "filter_details_tab_section  user_kyc_section_filed mt_margin"
                }
              >
                <div className={"filter_inner_tab_info w_100"}>
                  <div className={"filter_export_date_dropdown"}>
                    <div
                      className={"w_100 mr_margin"}
                      style={{ marginTop: "7px" }}
                    >
                      <label>
                        Challan Start Date{" "}
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"custom_date_filter platform_report_filter"}
                      >
                        <div
                          className={"start-date-picker"}
                          style={{ paddingLeft: "0px" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              name="chalnStartDate"
                              value={formData.chalnStartDate}
                              onChange={(newValue) => {
                                setFormData({
                                  ...formData,
                                  chalnStartDate: newValue,
                                  chalanEndDate: null,
                                });
                                setOpenCale({
                                  ...openCale,
                                  chalnStartDate: false,
                                });
                              }}
                              open={openCale.chalnStartDate}
                              onClose={() =>
                                setOpenCale({
                                  ...openCale,
                                  chalnStartDate: false,
                                })
                              }
                              inputFormat="MMM dd, yyyy"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onClick={() =>
                                    setOpenCale({
                                      ...openCale,
                                      chalnStartDate: !openCale?.chalnStartDate,
                                      chalanEndDate: false,
                                    })
                                  }
                                />
                              )}
                              inputProps={{
                                readOnly: true,
                                placeholder: "Select Challan Start Date",
                              }}
                              className={"w_100"}
                              maxDate={moment().date(
                                Number(moment().format("DD")) - 1
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                    <div
                      className={"w_100 ml_margin"}
                      style={{ marginTop: "7px" }}
                    >
                      <label>
                        Challan End Date{" "}
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"custom_date_filter platform_report_filter"}
                      >
                        <div
                          className={"start-date-picker"}
                          style={{ paddingLeft: "0px" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              name="chalanEndDate"
                              value={formData.chalanEndDate}
                              onChange={(newValue) => {
                                setFormData({
                                  ...formData,
                                  chalanEndDate: newValue,
                                });
                                setOpenCale({
                                  ...openCale,
                                  chalanEndDate: false,
                                });
                              }}
                              open={openCale.chalanEndDate}
                              onClose={() =>
                                setOpenCale({
                                  ...openCale,
                                  chalanEndDate: false,
                                })
                              }
                              inputFormat="MMM dd, yyyy"
                              minDate={formData?.chalnStartDate}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onClick={() =>
                                    setOpenCale({
                                      ...openCale,
                                      chalanEndDate: !openCale?.chalanEndDate,
                                      chalnStartDate: false,
                                    })
                                  }
                                />
                              )}
                              inputProps={{
                                readOnly: true,
                                placeholder: "Select Challan End Date",
                              }}
                              className={"w_100"}
                              maxDate={moment().date(
                                Number(moment().format("DD")) - 1
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
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
export default AddTDSChallan;
