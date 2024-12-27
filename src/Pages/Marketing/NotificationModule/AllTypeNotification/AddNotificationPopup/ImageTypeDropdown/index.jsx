import { profileImages } from "../../../../../../utils";
import user from "../../../../../../assets/images/avatar.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import React from "react";
import icon_plus from "../../../../../../assets/images/plus.svg";

const ImageTypeDropdown = ({ formData, setFormData, handleOpenErrorModal, simpleValidator,modalValue }) => {
  return (
    <div className={"notification_logo_filed"}>
      {formData?.imageType === "Banner" && (
        <div className={"add_admin_user_popup"}>
          <div className={"header_slider_details header_slider_details_Ads"}>
            <div className="user_profile profile-image-dropdown ads_internal">
              <label htmlFor="" className="profile_label">
                {" "}
                Banner{" "}
              </label>
              <div className={"header_section_slider "}>
                <div className="user_profile_pic">
                  {profileImages(formData?.bannerImage, user)}
                  {!formData?.bannerImage && (
                    <span className="add_new">
                      <input
                        title=""
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        name="bannerImage"
                        id=""
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (
                            file?.type?.includes("image/") &&
                            file.type !== "image/gif" &&
                            file.type !== "image/svg+xml"
                          )  if (file.size <= 5 * 1024 * 1024) {
                                // Check if file size is less than or equal to 5 MB
                                setFormData({
                                  ...formData,
                                  bannerImage: file,
                                  isBanner: true,
                                });
                              } else {
                            handleOpenErrorModal("CommonPop", {
                              header: "Error",
                              body: "Please Enter Only Image File",
                            });
                          }
                        }}
                      />{" "}
                    </span>
                  )}
                </div>
              </div>
              {formData?.bannerImage && (
                <div
                  className={"close-icon"}
                  onClick={() => setFormData({ ...formData, bannerImage: "" })}
                >
                  <CloseSharpIcon />
                </div>
              )}
            </div>
          </div>
          {/* {simpleValidator.current.message("banner", formData?.bannerImage, 'required')} */}
        </div>
      )}

      {formData?.imageType === "Logo" && (
        <div className="form_group profile new_game_section profile-image-dropdown">
          <label htmlFor="" className="profile_label">
            Logo
          </label>
          <div className="user_profile">
            <div className="user_profile_pic">
              {profileImages(formData?.logoImage, user)}
              {!formData?.logoImage && (
                <span className="addnew">
                  <img src={icon_plus} alt="" />
                  <input
                    title=""
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    name="logoImage"
                    id=""
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (
                        file?.type?.includes("image/") &&
                        file?.type !== "image/gif" &&
                        file?.type !== "image/svg+xml"
                      ) {
                        if (file.size <= 5 * 1024 * 1024) {
                          // Check if file size is less than or equal to 5 MB
                          setFormData({
                            ...formData,
                            logoImage: file,
                            isLogo: true,
                          });
                        } else {
                          handleOpenErrorModal("CommonPop", {
                            header: "Error",
                            body: "Please Enter Only Image File",
                          });
                        }
                      }else {
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
          {formData?.logoImage && (
            <div
              className={"close-icon"}
              onClick={() => setFormData({ ...formData, logoImage: "" })}
            >
              <CloseSharpIcon />
            </div>
          )}
          {/* {simpleValidator.current.message("logo", formData?.logoImage, 'required')} */}
        </div>
      )}
    </div>
  );
};
export default ImageTypeDropdown;
