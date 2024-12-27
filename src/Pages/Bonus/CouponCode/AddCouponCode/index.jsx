import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import { useDispatch } from "react-redux";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import {
  createCouponCode,
  updateCouponCode,
} from "../../../../Redux/Bonus/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "5px",
};
const AddCouponCode = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    startDate: "",
    expireDate: "",
    couponCodeName: "",
    couponCodeDescription: "",
    minDepositAmount: "",
    isCashbackInPercentage: false,
    cashBack: "",
    isRepeatedCoupon: false,
  });
  const [openCale, setOpenCale] = useState({
    expireDate: false,
    startDate: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
      setFilterData({
        ...filterData,
        [name]: /^0/.test(value) ? value.replace(/^0/, "") : value,
      });
  };

  const handleChangenumber = (e) => {
    const { value, name } = e.target;
    // Regex pattern to check for valid input (only numbers, maximum 10 digits, cannot start with 0)
    const regex = /^[1-9][0-9]{0,9}$/;
    // Check if the value matches the regex pattern
    if (regex.test(value)) {
      setFilterData({
        ...filterData,
        [name]: value,
      });
    }
    // If the value is not valid, update it accordingly (remove leading 0 or set an empty string)
    else {
      setFilterData({
        ...filterData,
        [name]: /^0/.test(value) ? value.replace(/^0/, "") : "",
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...filterData,
        startDate: moment(filterData?.startDate).format("YYYY-MM-DD"),
        expireDate: moment(filterData?.expireDate).format("YYYY-MM-DD"),
      };
      setLoader(true);
      dispatch(createCouponCode(payload)).then((res) => {
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

  useEffect(() => {
    if (modalValue?.isEdit) {
      setFilterData({
        ...modalValue?.row,
      });
    }
  }, [modalValue]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...filterData,
        startDate: moment(filterData?.startDate).format("YYYY-MM-DD"),
        expireDate: moment(filterData?.expireDate).format("YYYY-MM-DD"),
        couponCodeId: filterData?.id,
      };
      delete payload?.createdAt;
      delete payload?.updatedAt;
      delete payload?._id;
      delete payload?.id;
      setLoader(true);
      dispatch(updateCouponCode(payload)).then((res) => {
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

  const handleDatePicker = (newValue, type) => {
    setFilterData({ ...filterData, [type]: newValue });
    setOpenCale({ ...openCale, [type]: false });
  };

  return (
    <Box sx={style}>
      <div className={"add_admin_user_popup"}>
        <div className={"add_admin_user_popup_title coupon_section_form_title modal_main_popup"}>
        <div className={'modal_popup_title'}>
          <h2>
            {modalValue?.isEdit ? "Update Coupon Code" : "Add Coupon Code"}
            </h2>
            </div>
        </div>
        <div
          className={
            "add_admin_user_popup_content  coupon_section_form coupon_form_details"
          }
        >
          <form
            method={"POST"}
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className="formData">
              <label>Title <span className={'validation-star'}>*</span></label>
              <div className="emailWrap">
                <input
                  type="text"
                  value={filterData?.couponCodeName}
                  name="couponCodeName"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Title"
                  maxLength={40}
                />
                {simpleValidator.current.message(
                "title",
                filterData?.couponCodeName,
                "required|max:40"
              )}
              </div>
              
            </div>
            <div className="formData">
              <label>Description <span className={'validation-star'}>*</span></label>
              <div className="couponCodeDescription">
                <textarea
                  style={{resize: "none"}}
                  rows={4}
                  name={"couponCodeDescription"}
                  value={filterData?.couponCodeDescription}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Description"
                  maxLength={100}
                />
              </div>
              {simpleValidator.current.message(
                "description",
                filterData?.couponCodeDescription,
                "required"
              )}
            </div>
            <div className={"date-picker_coupon"}>
              <div className={"start-date-picker"}>
                <label>Start Date <span className={'validation-star'}>*</span></label>
                <div className={"date_picker_value"} style={{marginBottom:"10px"}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      name="startDate"
                      value={filterData?.startDate}
                      open={openCale.startDate}
                      onChange={(newValue) =>
                        handleDatePicker(newValue, "startDate")
                      }
                      minDate={new Date()}
                      maxDate={
                        filterData?.expireDate ? filterData?.expireDate : ""
                      }
                      onClose={() =>
                        setOpenCale({ ...openCale, startDate: false })
                      }
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            onClick={() =>
                              setOpenCale({
                                ...openCale,
                                startDate: !openCale?.startDate,
                                expireDate: false,
                              })
                            }
                          />
                        );
                      }}
                      inputFormat="MMM dd, yyyy"
                      className={"datePicker_details"}
                      inputProps={{ readOnly: true,placeholder: "Select Start Date" }}
                    />
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message(
                  "startDate",
                  filterData?.startDate,
                  "required"
                )}
              </div>
              <div className={"end-date-picker"}>
                <label>End Date <span className={'validation-star'}>*</span></label>
                <div className={"date_picker_value"} style={{marginBottom:"10px"}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      name="expireDate"
                      value={filterData.expireDate}
                      onChange={(newValue) =>
                        handleDatePicker(newValue, "expireDate")
                      }
                      inputFormat="MMM dd, yyyy"
                      minDate={
                        filterData?.startDate
                          ? filterData?.startDate
                          : new Date()
                      }
                      open={openCale.expireDate}
                      onClose={() =>
                        setOpenCale({ ...openCale, expireDate: false })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onClick={() =>
                            setOpenCale({
                              ...openCale,
                              expireDate: !openCale?.expireDate,
                              startDate: false,
                            })
                          }
                        />
                      )}
                      inputProps={{ readOnly: true,placeholder: "Select End Date" }}
                    />
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message(
                  "End Date",
                  filterData?.expireDate,
                  "required"
                )}
              </div>
            </div>
            <div className="formData">
              <label>Cashback Bonus <span className={'validation-star'}>*</span></label>
              <div className="emailWrap">
                <input
                  onWheel={(event) => event.currentTarget.blur()}
                  type="text"
                  value={filterData?.cashBack}
                  name="cashBack"
                  onChange={(e) => handleChangenumber(e)}
                  placeholder="Enter Cashback Bonus"
                  maxLength={10}
                />
              </div>
              {simpleValidator.current.message(
                "Cashback Bonus",
                filterData?.cashBack,
                "required"
              )}
            </div>
           <div className={'d_flex justify_content_between'}>
             <div className="filter_data_radio">
               <label>Is Percentage Amount?</label>
               <div className={"filter_data_radio_sub"}>
                 <div className="filter_data_radio_field tab_field_left">
                   <input type="radio" name="isCashbackInPercentage" checked={filterData?.isCashbackInPercentage} onChange={() => setFilterData({...filterData, isCashbackInPercentage: true,})}/>
                   <label>Yes</label>
                 </div>
                 <div className="filter_data_radio_field tab_field_right">
                   <input type="radio" name="isCashbackInPercentage" checked={!filterData?.isCashbackInPercentage} onChange={() => setFilterData({...filterData, isCashbackInPercentage: false,})}/>
                   <label>No</label>
                 </div>
               </div>
             </div>
             <div className="filter_data_radio">
               <label>Is Repeated Get Coupon?</label>
               <div className={"filter_data_radio_sub"}>
                 <div className="filter_data_radio_field tab_field_left">
                   <input type="radio" name="isRepeatedCoupon" checked={filterData?.isRepeatedCoupon} onChange={() => setFilterData({ ...filterData, isRepeatedCoupon: true })}/>
                   <label>Yes</label>
                 </div>
                 <div className="filter_data_radio_field tab_field_right">
                   <input type="radio" name="isRepeatedCoupon" checked={!filterData?.isRepeatedCoupon} onChange={() => setFilterData({ ...filterData, isRepeatedCoupon: false })}/>
                   <label>No</label>
                 </div>
               </div>
             </div>
           </div>

            <div className="formData">
              <label>Deposit Amount <span className={'validation-star'}>*</span></label>
              <div className="emailWrap">
                <input maxLength={10} onWheel={(event) => event.currentTarget.blur()} type="text" value={filterData?.minDepositAmount == 0 ? "" : filterData?.minDepositAmount} name="minDepositAmount" onChange={(e) => handleChangenumber(e)} placeholder="Enter Deposit Amount"/>
              </div>
              {simpleValidator.current.message("DepositAmount", filterData?.minDepositAmount, "required")}
            </div>


            <div className={"formData_btn"} style={{ gap: 10 }}>
              <button className={"btn_default"} type={"reset"} onClick={() => handleOpenModal()}>Cancel</button>
              <FilledButton type={"submit"} value={modalValue?.isEdit ? "Update" : "Save"} className={"submit_btn loader_css btn"} loading={loader}/>
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
export default AddCouponCode;
