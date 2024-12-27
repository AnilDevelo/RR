import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../../../Redux/user/action";
import FilledButton from "../../../../../Components/FileButton";
import { getCountriesRestrictGeo } from "../../../../../Redux/settings/action";
import { profileImages } from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CountryDropdown from "Pages/Settings/RestrictGeo/AddRestrictGeo/CountryDropdown";

const UpdateUserInfo = ({ id, setEditUser, handleOpenModal, userProfile,getUserProfileDetails }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [countryList, setCountryList] = useState({ country: [] });
  const simpleValidator = useRef(new SimpleReactValidator());
  const [formData, setFormData] = useState({
    fullName: "",
    userId: id,
    country: "",
    isProfileImageUpdated: false,
    phoneNumber: "",
    profileImage: "",
    profileURL: "",
    email: "",
  });
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [emailErr, setEmailErr] = useState(false);
  
  useEffect(() => {
    dispatch(getCountriesRestrictGeo({})).then((res) => {
      setCountryList({
        ...countryList,
        country:
          res.data.data?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
              isoCode: item?.isoCode,
            };
          }) || [],
      });
    });
  }, []);

  const closeModalError = () => {
    setEditUser(false);
  };
  const userImageChange = (e) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      const newImg = URL.createObjectURL(e.target.files[0]);
      const fileList = Math.round(e.target.files[0].size / 1024);
      if (fileList >= 2048) {
        handleOpenModal("CommonPop", {
          header: "Error",
          body: "Please upload a file smaller than 2 MB",
        });
        return false;
      } else {
        setFormData({
          ...formData,
          profileImage: e.target.files[0],
          profileURL: newImg,
          isProfileImageUpdated: true,
        });
      }
      return true;
    } else {
      // setFormData({
      //     ...formData,
      //     profileImage: '',
      //     profileURL: '',
      //     isProfileImageUpdated: false
      // })
      handleOpenModal("CommonPop", {
        header: "Error",
        body: "Please add only image file",
      });
    }
  };

  const userDetailsSubmitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      updateUserInfoDetails();
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };
  useEffect(() => {
    if (formData?.email) {
      let validEmail = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/
      if (!validEmail.test(formData?.email)) {
        setEmailErr(true);
      } else {
        setEmailErr(false);
      }
    }
  }, [formData?.email]);
  const updateUserInfoDetails = () => {
    let payload = {
      ...formData,
      country: formData?.country,
    };
    if (payload?.email === "" || payload?.email === undefined) {
      delete payload?.email;
    }
    delete payload.profileURL;

    if (!formData?.profileImage) {
      delete payload.profileImage;
    }
    if ((formData?.email && !emailErr) || !emailErr) {
      setLoader(true);
      dispatch(updateUserProfile(payload)).then((res) => {
        if (res.data.success) {
          getUserProfileDetails()
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
            modalCloseHandle: setEditUser(false),
          });
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res?.data?.msg,
          });
        }
      });
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleChangeFullName(e) {
  const fieldName = e.target.name;
  let fieldValue = e.target.value;
  // Remove non-alphabetical and space characters using a regular expression
  fieldValue = fieldValue.replace(/[^A-Za-z]/g, '');
  setFormData({
    ...formData,
    [fieldName]: fieldValue,
  });
  }
  
  useEffect(() => {
    if (Object.keys(userProfile)?.length > 0) {
      setFormData({
        ...formData,
        fullName: userProfile.fullName,
        email: userProfile?.email,
        country: userProfile?.country,
        phoneNumber: userProfile?.phoneNumber,
        profileURL: userProfile?.profileImage,
      });
    }
  }, [userProfile]);

  return (
    <div className={"user_profile_edit_info"}>
      <div className={"profile userProfile_edit_info"}>
        <div className="user_profile">
          <div className="user_profile_pic">
            {profileImages(formData?.profileURL, user)}
            <span className="addnew">
              <img src={icon_plus} alt="" />
              <input
                type="file"
                name="labelIcon"
                id=""
                onChange={(e) => userImageChange(e)}
              />
            </span>
          </div>
          <label htmlFor="" className="profile_label">
            User Profile
          </label>
        </div>
      </div>
      <form onSubmit={(e) => userDetailsSubmitHandler(e)} className={""}>
        <div className="user-details ">
          <div className={"user_details_form"}>
            <div className={"form_details_section"}>
              <label> Full Name : </label>
              <div className={"formData lobby-type-description"}>
                <input
                  type={"text"}
                  name={"fullName"}
                  value={formData?.fullName}
                  alt={"name"}
                  onChange={(e) => handleChangeFullName(e)}
                  maxLength={20}
                />
                <span style={{top:"18px"}}>{formData?.fullName?.length}/20</span>
                {simpleValidator.current.message(
                  "fullName",
                  formData?.fullName,
                  "required"
                )}
              </div>
            </div>
            {/* <div className={"form_details_section"}>
              <label> Email : </label>
              <div className={"formData"}>
                <input
                  type={"text"}
                  name={"email"}
                  value={formData?.email}
                  alt={"name"}
                  onChange={(e) => handleChange(e)}
                />
                <span className={"srv-validation-message"}>
                  {emailErr && "The email must be a valid email address."}
                </span>
              </div>
            </div> */}
            <div className={"form_details_section"}>
              <label> Country : </label>
              <div className={"formData"}>
                <CountryDropdown
                  options={countryList?.country}
                  name={"country"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            {simpleValidator.current.message(
              "country",
              formData?.country,
              "required"
            )}
            <div className={"form_details_section "}>
              <label> Phone Number : </label>
              <div className={"formData readOnly_field"}>
                <input
                  type={"text"}
                  name={"phoneNumber"}
                  maxLength={10}
                  readOnly={true}
                  value={formData?.phoneNumber}
                  alt={"phoneNumber"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className={"form_data_btn mt_3"}>
            <FilledButton
              type={"Submit"}
              value={"Update"}
              loading={loader}
              className={"btn loader_css mr_1"}
            />
            <button
              className={"btn ml_1"}
              type={"reset"}
              onClick={() => closeModalError()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
