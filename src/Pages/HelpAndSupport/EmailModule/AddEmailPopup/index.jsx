import FilledButton from "../../../../Components/FileButton";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { addHelpAndSupportEmail } from "../../../../Redux/HelpAndSupport/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 486,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};
const AddEmailPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator({
    validators: {
        email: {
            message: "The email must be a valid email address.",
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val,/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            },
            required: true
        }
    }
}));
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({ email: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      dispatch(addHelpAndSupportEmail(formData)).then((res) => {
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
      setFormData({ ...formData, email: modalValue?.row?.email });
    }
  }, [modalValue]);
  return (
    <Box sx={style}>
      <div className={"add_admin_user_popup modal_main_popup"}>
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? "Update Help & Support Email"
              : " Add Help & Support Email"}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={"user_kyc_section"}>
              <div className={"user_kyc_section_filed"}>
                <label>
                  Email <span className={"validation-star"}>*</span>
                </label>
                <div className={"user_kyc_section_input_filed"}>
                  <input
                    type={"text"}
                    value={formData?.email}
                    placeholder={"Enter Email"}
                    maxLength={40}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                {simpleValidator.current.message(
                  "email",
                  formData?.email,
                  "required|email"
                )}
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
    </Box>
  );
};
export default AddEmailPopup;
