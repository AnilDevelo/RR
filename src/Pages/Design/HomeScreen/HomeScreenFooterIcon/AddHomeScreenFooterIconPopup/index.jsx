import { Box } from "@mui/material";
import { jsonToFormData, profileImages } from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {
  createHomeScreenFooterIcon,
  updateHomeScreenFooterIcon,
} from "Redux/Design/action";

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

const AddHomeScreenFooterIconPopup = ({
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
    iconName: "",
    selectedIcon: "",
    nonSelectedIcon: "",
    isSelectedIconImageUpdated: false,
    isNonSelectedIconImageUpdated: false,
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
        selectedIcon: formData?.selectedIcon,
        nonSelectedIcon: formData?.nonSelectedIcon,
        iconName: formData?.iconName.trim(),
      };
      setLoader(true);
      dispatch(createHomeScreenFooterIcon(jsonToFormData(payload))).then(
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

  // const handleIconChange = (e) => {
  //     setFormData({ ...formData, selectedIcon: e.target.files[0],nonSelectedIcon: e.target.files[0], isIconImageUpdated: true })
  // }
  const gameLogoHandler = (e, name) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (name === "selectedIcon") {
          setFormData({
            ...formData,
            selectedIcon: e.target.files[0],
            isSelectedIconImageUpdated: true,
          });
        } else {
          setFormData({
            ...formData,
            nonSelectedIcon: e.target.files[0],
            isNonSelectedIconImageUpdated: true,
          });
        }
      };
    } else {
      handleOpenModal("CommonPop", {
        header: "Error",
        body: "Please add only image file",
      });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        homeScreenIconId: modalValue?.item?._id,
        iconName: formData?.iconName.trim(),
      };
      if (!payload.isIconImageUpdated) {
        delete payload.iconImage;
      }
      setLoader(true);
      dispatch(updateHomeScreenFooterIcon(jsonToFormData(payload)))
        .then((res) => {
          if (res.data.success) {
            redirectApiHandler();
            setLoader(false);
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
        })
        .catch((e) => {
          setLoader(false);
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
        iconName: modalValue?.item?.iconName,
        selectedIcon: modalValue?.item?.selectedIconImage,
        nonSelectedIcon: modalValue?.item?.nonSelectedIconImage,
      });
    }
  }, [modalValue?.isEdit]);
  return (
    <Box sx={style}>
      <div
        className={"add_admin_user_popup modal_main_popup login_screen_data"}
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? "Update Home Screen Footer Icons"
              : "Add New Home Screen Footer Icons"}
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
                    {profileImages(formData?.selectedIcon, user)}
                    {!formData?.selectedIcon && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="Selected Footer Icon"
                          id=""
                          onChange={(e) => gameLogoHandler(e, "selectedIcon")}
                        />
                      </span>
                    )}
                  </div>
                  <label htmlFor="" className="profile_label">
                    Selected Footer Icon{" "}
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                {simpleValidator.current.message(
                  "Selected Footer Icon",
                  formData?.selectedIcon,
                  "required"
                )}
                {formData?.selectedIcon && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, selectedIcon: "" })
                    }
                  >
                    <CloseSharpIcon />
                  </div>
                )}
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.nonSelectedIcon, user)}
                    {!formData?.nonSelectedIcon && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="Non-Selected Footer Icon"
                          id=""
                          onChange={(e) =>
                            gameLogoHandler(e, "nonSelectedIcon")
                          }
                        />
                      </span>
                    )}
                  </div>
                  <label htmlFor="" className="profile_label">
                    Non-Selected Footer Icon{" "}
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                {simpleValidator.current.message(
                  "Non-Selected Footer Icon",
                  formData?.nonSelectedIcon,
                  "required"
                )}
                {formData?.nonSelectedIcon && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, nonSelectedIcon: "" })
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
                    <div className={"user_kyc_section_input_filed lobby-type-description"}>
                      <input
                        style={{paddingRight: "52px"}}
                        maxLength={40}
                        type={"text"}
                        placeholder={"Enter Name"}
                        value={formData?.iconName}
                        name={"iconName"}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>{formData?.iconName?.length}/40</span>
                    </div>
                    {simpleValidator.current.message(
                      "title",
                      formData?.iconName,
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

export default AddHomeScreenFooterIconPopup;
