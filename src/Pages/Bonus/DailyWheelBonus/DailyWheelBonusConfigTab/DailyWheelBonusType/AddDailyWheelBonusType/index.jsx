import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import { jsonToFormData, profileImages } from "../../../../../../utils";
import { Box } from "@mui/material";
import user from "../../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";
import { addDailyWheelBonusTypeList } from "../../../../../../Redux/Bonus/action";
import CommonDropdown from "../../../../../../Components/Dropdown/CommonDropdown";

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

const AddDailyWheelBonusType = ({
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
  const [formData, setFormData] = useState({
    type: "",
    dailyWheelBonusType: "",
    isDailyWheelBonusTypeTconUpdated: false,
    description: "",
      title: "",
      isDeductTds: false,
  });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        description: formData.description?.trim(),
        title: formData.title?.trim(),
  
      };
      if (!payload?.title) {
        delete payload?.title;
      }
      if (!payload?.description) {
        delete payload?.description;
      }
      if (!payload.isDailyWheelBonusTypeTconUpdated) {
        delete payload.dailyWheelBonusType;
      }
      setLoader(true);
      dispatch(addDailyWheelBonusTypeList(jsonToFormData(payload))).then(
        (res) => {
          if (res.data.success) {
            setLoader(false);
            redirectApiHandler();
            handleOpenModal("CommonPop", {
              header: "Success",
              body: res.data.message,
            });
          } else {
            setLoader(false);
            handleOpenModal("CommonPop", {
              header: "Error",
              body: res.data.message || res?.data?.msg,
            });
          }
        }
      );
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const handleIconChange = (e) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (img.width === 100 && img.height === 100) {
          setFormData({
            ...formData,
            dailyWheelBonusType: e.target.files[0],
            isDailyWheelBonusTypeTconUpdated: true,
          });
        } else {
          handleOpenErrorModal("CommonPop", {
            header: "Error",
            body: "The width and height of the image should be  100 * 100 size",
          });
        }
      };
    } else {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Please add only image file",
      });
    }
  };

  useEffect(() => {
    if (modalValue?.isEdit) {
      setFormData({
        ...formData,
        type: modalValue?.row?.type,
        title: modalValue?.row?.title?.trim(),
        description: modalValue?.row?.description?.trim(),
        dailyWheelBonusType: modalValue?.row?.dailyWheelBonusIcon,
        isDailyWheelBonusTypeTconUpdated:
          formData?.isDailyWheelBonusTypeTconUpdated,
        isDeductTds: formData?.isDeductTds,
      });
    }
  }, [modalValue?.isEdit]);

  const handleOpenModalError = (type, data) => {
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
        className={
          "add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details"
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? "Update Daily Spin Bonus Type"
              : "Add Daily Spin Bonus Type"}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content mt_15"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={"level_popup_form_field "}>
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.dailyWheelBonusType, user)}
                    {!formData?.dailyWheelBonusType && (
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
                    Type Icon <span className={"validation-star"}>*</span>{" "}
                    <span className={"size-validation"}>(100*100 size)</span>
                  </label>
                </div>
                {simpleValidator.current.message(
                  "dailyWheelBonusTypeIcon",
                  formData?.dailyWheelBonusType,
                  "required"
                )}
                {formData?.dailyWheelBonusType && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, dailyWheelBonusType: "" })
                    }
                  >
                    <CloseSharpIcon />
                  </div>
                )}
              </div>
              <div className={"level_popup_form_field_left"}>
                <div className={"user_kyc_section"}>
                  <div className={"user_kyc_section_filed readOnly_field"}>
                    <label>
                      Type <span className={"validation-star"}>*</span>
                    </label>
                    <div className={"user_kyc_section_input_filed mt_margin"}>
                      <CommonDropdown
                        options={[
                          "Deposit Cash",
                          "Winning Cash",
                          "Bonus Cash",
                          "Referral Boosters",
                          "Add Cash Offer",
                          "Hard Luck",
                        ]}
                        name={"type"}
                        setFormData={setFormData}
                        formData={formData}
                      />
                      {/*<input type={'text'} placeholder={'Enter Type'} disabled={modalValue?.isEdit} value={formData?.type} name={'type'} onChange={(e) => changeHandler(e)} />*/}
                    </div>
                    {simpleValidator.current.message(
                      "type",
                      formData?.type,
                      "required"
                    )}
                  </div>
                  <div className={"user_kyc_section_filed mt_margin"}>
                    <label>Title</label>
                    <div
                      className={
                        "user_kyc_section_input_filed lobby-type-description"
                      }
                    >
                      <input
                        type={"text"}
                        placeholder={"Enter Title"}
                        value={formData?.title}
                        maxLength={20}
                        name={"title"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.title?.length}/20</span>
                    </div>
                  </div>
                  <div className={"user_kyc_section_filed "}>
                    <label>Description</label>
                    <div
                      className={
                        "user_kyc_section_input_filed lobby-type-description"
                      }
                    >
                      <input
                        type={"text"}
                        placeholder={"Enter Description"}
                        value={formData?.description}
                        maxLength={100}
                        name={"description"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.description?.length}/100</span>
                    </div>
                  </div>
                  {(formData?.type === "Bonus Cash" ||
                    formData?.type === "Deposit Cash" ||
                    formData?.type === "Winning Cash") && (
                    <div className={"common_checkbox_details mt_more_margin"}>
                      <label>
                        Is Deduct TDS ?{" "}
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div className={"game_mode_btn"}>
                        <div className={"game_mode_btn_option yes_radio_btn"}>
                          <input
                            type={"radio"}
                            name={"isDeductTds"}
                            checked={formData?.isDeductTds}
                            onChange={(e) =>
                              setFormData({ ...formData, isDeductTds: true })
                            }
                          />
                          <label>Yes</label>
                        </div>
                        <div className={"game_mode_btn_option no_radio_btn"}>
                          <input
                            type={"radio"}
                            name={"isDeductTds"}
                            checked={!formData?.isDeductTds}
                            onChange={(e) =>
                              setFormData({ ...formData, isDeductTds: false })
                            }
                          />
                          <label>No</label>
                        </div>
                      </div>
                    </div>
                  )}
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
export default AddDailyWheelBonusType;
