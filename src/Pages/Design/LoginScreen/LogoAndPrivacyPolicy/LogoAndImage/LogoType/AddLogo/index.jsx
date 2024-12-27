import Box from "@material-ui/core/Box";
import UploaderImages from "../../../../../../../Components/UploaderImages";
import FilledButton from "../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../hoc/CommonModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../hoc/PopContent";
import { jsonToFormData, profileImages } from "../../../../../../../utils";
import user from "../../../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  createDesignLoginScreen,
  updateDesignLoginScreen,
  UploadSliderImageLoginScreen,
} from "../../../../../../../Redux/Design/action";

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

const AddLogo = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
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
    companyLogoImage: "",
    isImageUpdated: false,
    type: "Logo",
    privacyPolicy: "",
    screenShots: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        companyLogoImage: formData?.companyLogoImage,
        isImageUpdated: formData?.isImageUpdated,
        type: formData.type,
        privacyPolicy: formData?.privacyPolicy,
      };
      setLoader(true);
      dispatch(createDesignLoginScreen(jsonToFormData(payload))).then((res) => {
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
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        loginScreenId: modalValue?.row?._id,
      };

      if (!payload.isImageUpdated) {
        delete payload.footerIconImage;
      }
      setLoader(true);
      dispatch(updateDesignLoginScreen(jsonToFormData(payload)))
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
      if (row?.type === "Logo") {
        setFormData({
          type: row?.type,
          companyLogoImage: row?.companyLogoImage,
          privacyPolicy: row?.privacyPolicy,
        });
      }
    }
  }, [modalValue]);

  return (
    <Box
      sx={style}
      className={
        "how_to_play_section_details login_screen_data video-tickets-section"
      }
    >
      <div
        className={"game_details_view modal_main_popup add_admin_user_popup"}
      >
        <div className={"modal_popup_title"}>
          {modalValue?.isEdit ? <h2>Edit Logo</h2> : <h2>Add Logo</h2>}
        </div>
      </div>
      <div className={"add_game_details_sec add_admin_user_popup_content"}>
        <form
          onSubmit={
            modalValue?.isEdit
              ? (e) => handleEditSubmit(e)
              : (e) => handleSubmit(e)
          }
          method="post"
          encType="multipart/form-data"
        >
          <div className={"game_display_form"}>
            {formData?.type === "Logo" && (
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.companyLogoImage, user)}
                    {!formData?.companyLogoImage?.length > 0 && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="labelIcon"
                          id=""
                          onChange={(e) => {
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
                                  companyLogoImage: file,
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
                          }}
                        />
                      </span>
                    )}
                  </div>
                </div>
                {simpleValidator.current.message(
                  "companyLogoImage",
                  formData?.companyLogoImage,
                  "required"
                )}
                {formData?.companyLogoImage?.length > 0 && (
                  <div
                    className={"close-icon"}
                    onClick={() =>
                      setFormData({ ...formData, companyLogoImage: "" })
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
            {!formData?.isImageUpdated ? (
              <FilledButton
                type={"submit"}
                value={modalValue?.isEdit ? "Update" : "Save"}
                className={" disabled_btn_game_Splash  loader_css"}
                loading={loader}
                disabled={true}
              />
            ) : (
              <FilledButton
                type={"submit"}
                value={modalValue?.isEdit ? "Update" : "Save"}
                className={"btn loader_css"}
                loading={loader}
              />
            )}
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

export default AddLogo;
