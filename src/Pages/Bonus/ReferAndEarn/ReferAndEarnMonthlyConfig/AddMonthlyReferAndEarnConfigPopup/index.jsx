import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import { Box } from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import TextField from "@mui/material/TextField";
import DropdownMode from "../../../../Games/GameDetails/GameTabDetails/LobbyTab/CreateLobby/DropdownMode";
import {
  referAndEarnPointsConfig,
  updateReferAndEarnPointsConfig,
} from "../../../../../Redux/Bonus/action";

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

const AddMonthlyReferAndEarnConfigPopup = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
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
  const [openCale, setOpenCale] = useState({
    expireDate: false,
    startDate: false,
  });
  const [formData, setFormData] = useState({
    categoryType: "",
    points: "",
    noOfRefer: "",
    minimumAddCash: "",
    daysLimit: "",
    isDaysLimit: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        categoryType:
          formData?.categoryType === "Refer & Earn Basic"
            ? "Basic"
            : formData?.categoryType === "Refer & Earn Target Base"
            ? "TargetBase"
              : formData?.categoryType === "Add Cash"
              ? "AddCash"
              : formData?.categoryType === "Add Cash by Referral" &&
                "AddCashByReferral",
      };
      Object?.keys(payload).forEach((ele) => {
        if (payload[ele] === "" || payload[ele] === null) {
          delete payload[ele];
        }
      });
      dispatch(referAndEarnPointsConfig(payload)).then((res) => {
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
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        categoryType:
          formData?.categoryType === "Refer & Earn Basic"
            ? "Basic"
            : formData?.categoryType === "Refer & Earn Target Base"
            ? "TargetBase"
              : formData?.categoryType === "Add Cash"
              ? "AddCash"
              : formData?.categoryType === "Add Cash by Referral" &&
                "AddCashByReferral",
        pointsConfigId: modalValue?.row?._id,
      };
      dispatch(updateReferAndEarnPointsConfig(payload)).then((res) => {
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

  useEffect(() => {
    if (modalValue?.isEdit) {
      setFormData({
        ...formData,
        categoryType:
          modalValue?.row?.categoryType === "Basic"
            ? "Refer & Earn Basic"
            : modalValue?.row?.categoryType === "TargetBase"
            ? "Refer & Earn Target Base"
              : modalValue?.row?.categoryType === "AddCash"
                ? "Add Cash"
            : modalValue?.row?.categoryType === "AddCashByReferral" &&
              "Add Cash by Referral",
        points: modalValue?.row?.points,
        noOfRefer: modalValue?.row?.noOfRefer,
        minimumAddCash: modalValue?.row?.minimumAddCash,
        daysLimit: modalValue?.row?.daysLimit,
        isDaysLimit: modalValue?.row?.isDaysLimit,
      });
    }
  }, [modalValue?.isEdit]);
  return (
    <Box sx={style}>
      <div
        className={
          "add_admin_user_popup modal_main_popup leaderboard-bonus-section "
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? "Update Monthly Refer & Earn Point Config"
              : "Add Monthly Refer & Earn Point Config"}
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
            {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
            <div className={"formData checkbox_modal real_money_field"}>
              <div>
                <label>
                  Point Category <span className={"validation-star"}>*</span>
                </label>
              </div>
              <div className={"select_game_option_mode"}>
                <div className={"select_game_option"}>
                  <DropdownMode
                    options={[
                      "Refer & Earn Basic",
                      "Refer & Earn Target Base",
                      "Add Cash",
                      "Add Cash by Referral"
                    ]}
                    name={"categoryType"}
                    isMonthlyCate={{ isEdit: modalValue?.isEdit, type: true }}
                    formData={formData}
                    setFormData={setFormData}
                    placeholder={"Select Point Category Type"}
                  />
                  {simpleValidator.current.message(
                    "pointCategory",
                    formData?.categoryType,
                    "required"
                  )}
                </div>
              </div>
            </div>
            <div className={"refer-and-config-point-details"}>
              <div
                className={
                  formData?.categoryType === "Refer & Earn Basic"
                    ? "user_kyc_section "
                    : "user_kyc_section tab-01"
                }
              >
                <div className={"formData"}>
                  <label>
                    Point <span className={"validation-star"}>*</span>
                  </label>
                  <div className={"user_kyc_section_input_filed"}>
                    <input
                      type={"number"}
                      placeholder={"Enter Point"}
                      onWheel={(e) => e.currentTarget.blur()}
                      value={formData?.points}
                      onChange={(e) =>
                        setFormData({ ...formData, points:/^0/.test(e.target.value) ? e.target.value.replace(/^0/, "") : e.target.value  })
                      }
                    />
                  </div>
                  {simpleValidator.current.message(
                    "points",
                    formData?.points?.toString(),
                    "required|min:0|max:10"
                  )}
                </div>
              </div>
              {formData?.categoryType === "Refer & Earn Target Base" && (
                <div className={"user_kyc_section tab-02"}>
                  <div className={"formData"}>
                    <label>
                      Number Of Refer{" "}
                      <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"user_kyc_section_input_filed"}>
                      <input
                        type={"number"}
                        placeholder={"Enter Number Of Refer"}
                        onWheel={(e) => e.currentTarget.blur()}
                        value={formData?.noOfRefer}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            noOfRefer: /^0/.test(e.target.value) ? e.target.value.replace(/^0/, "") : e.target.value,
                          })
                        }
                      />
                    </div>
                    {simpleValidator.current.message(
                      "Number Of Refer",
                      formData?.noOfRefer?.toString(),
                      "required|min:0|max:10"
                    )}
                    {/*{ formData?.categoryType === 'Refer & Earn Target Base' ? simpleValidator.current.message("noOfRefer", formData?.noOfRefer, 'required') : ''}*/}
                  </div>
                </div>
              )}
              {formData?.categoryType === "Add Cash" || formData?.categoryType === "Add Cash by Referral"? (
                <div className={"user_kyc_section tab-02"}>
                  <div className={"formData"}>
                    <label>
                      Minimum Cash <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"user_kyc_section_input_filed"}>
                      <input
                        type={"number"}
                        placeholder={"Enter Minimum Cash"}
                        onWheel={(e) => e.currentTarget.blur()}
                        //defaultValue={0}
                        value={formData?.minimumAddCash}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minimumAddCash: /^0/.test(e.target.value) ? e.target.value.replace(/^0/, "") : e.target.value,
                          })
                        }
                      />
                    </div>
                    {formData?.categoryType === "Add Cash" || formData?.categoryType === "Add Cash by Referral"
                      ? simpleValidator.current.message(
                          "minimumAddCash",
                          formData?.minimumAddCash?.toString(),
                          "required|min:0|max:10"
                        )
                      : ""}
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
            {(formData?.categoryType === "Add Cash"  || formData?.categoryType === "Add Cash by Referral") && (
              <div className={"common_checkbox_details mt_1"}>
                <label>is Days Limit ? </label>
                <div className={"game_mode_btn"}>
                  <div className={"game_mode_btn_option yes_radio_btn"}>
                    <input
                      type={"radio"}
                      name={"isDaysLimit"}
                      checked={formData?.isDaysLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, isDaysLimit: true })
                      }
                    />
                    <label>Yes</label>
                  </div>
                  <div className={"game_mode_btn_option no_radio_btn"}>
                    <input
                      type={"radio"}
                      name={"isDaysLimit"}
                      checked={!formData?.isDaysLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, isDaysLimit: false })
                      }
                    />
                    <label>No</label>
                  </div>
                </div>
              </div>
            )}

            {formData?.isDaysLimit && (
              <div className={"user_kyc_section tab-02"}>
                <div className={"formData"}>
                  <label>
                    Days Limit <span className={"validation-star"}>*</span>
                  </label>
                  <div className={"user_kyc_section_input_filed"}>
                    <input
                      type={"number"}
                      placeholder={"Enter Days Limit"}
                      onWheel={(e) => e.currentTarget.blur()}
                      value={formData?.daysLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, daysLimit: /^0/.test(e.target.value) ? e.target.value.replace(/^0/, "") : e.target.value })
                      }
                    />
                  </div>
                </div>
                {simpleValidator.current.message(
                  "daysLimit",
                  formData?.daysLimit?.toString(),
                  "required|min:0|max:10"
                )}
              </div>
            )}

            {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
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
export default AddMonthlyReferAndEarnConfigPopup;
