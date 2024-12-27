import Box from "@material-ui/core/Box";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import { jsonToFormData, profileImages } from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { createHomeScreenLogo } from "../../../../../Redux/Design/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const AddHomeScreenLogo = ({
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
    footerLogoImage: "",
    isImageUpdated: false,
    type: "Logo",
    privacyPolicy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      // eslint-disable-next-line default-case
      switch (formData?.type) {
        case "Logo": {
          let payload = {
            footerLogoImage: formData?.footerLogoImage,
            isImageUpdated: formData?.isImageUpdated,
            type: formData.type,
          };
          if (!payload.isImageUpdated) {
            delete payload.footerLogoImage;
          }
          setLoader(true);
          dispatch(createHomeScreenLogo(jsonToFormData(payload))).then(
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
                  body: res.data.message || res.data.msg,
                });
              }
            }
          );
          break;
        }
      }
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
      setFormData({
        ...formData,
        footerLogoImage: modalValue?.row?.footerLogoImage,
      });
    }
  }, [modalValue]);

  return (
    <Box
      sx={style}
      className={
        "how_to_play_section_details video-tickets-section login_screen_data"
      }
    >
      <div
        className={"game_details_view modal_main_popup add_admin_user_popup"}
      >
        <div className={"modal_popup_title"}>
          {modalValue?.isEdit ? (
            <h2>Edit Home Screen Logo</h2>
          ) : (
            <h2>Add Home Screen Logo</h2>
          )}
        </div>
      </div>
      <div className={"add_game_details_sec add_admin_user_popup_content"}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          method="post"
          encType="multipart/form-data"
        >
          <div className={"game_display_form"}>
            {formData?.type === "Logo" && (
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.footerLogoImage, user)}
                    {!formData?.footerLogoImage && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="labelIcon"
                          id=""
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              footerLogoImage: e.target.files[0],
                              isImageUpdated: true,
                            })
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>
                {simpleValidator.current.message(
                  "home screen logo",
                  formData?.footerLogoImage,
                  "required"
                )}
                {formData?.footerLogoImage && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, footerLogoImage: "" })
                    }
                  >
                    <CloseSharpIcon />
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className={
              "formData_btn  d_flex_end mt_2 form_common_btn add_game_btn_Top"
            }
          >
            <button
              className={"btn_default"}
              type={"reset"}
              onClick={() => handleOpenModal()}
            >
              Cancel
            </button>
            <FilledButton
              type={"submit"}
              disabled={!formData.isImageUpdated}
              value={modalValue?.isEdit ? "Update" : "Save"}
              className={
                formData.isImageUpdated ? "btn loader_css" : "disabled_button"
              }
              loading={loader}
            />
          </div>
        </form>
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

export default AddHomeScreenLogo;
