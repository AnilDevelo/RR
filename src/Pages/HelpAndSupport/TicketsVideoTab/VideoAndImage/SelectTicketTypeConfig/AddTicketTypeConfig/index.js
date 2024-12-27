import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import Box from "@material-ui/core/Box";
import FilledButton from "../../../../../../Components/FileButton";
import GameStatusDropDown from "../../../../../../Components/MainCommonFilter/GameStatusDropDown";
import { addLoginScreenTypeConfig } from "Redux/Design/action";
import { addTicketTypeConfig } from "Redux/HelpAndSupport/action";
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
const AddTicketTypeConfig = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({ type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      dispatch(addTicketTypeConfig(formData)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          const successMessage =
          formData.type === "Video"
            ? "Ticket video config has been updated successfully."
            : "Ticket image config has been updated successfully.";
          handleOpenModal("CommonPop", {
            header: "Success",
            body: successMessage,
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
      setFormData({ ...formData, type: modalValue?.row?.type });
    }
  }, [modalValue]);
  return (
    <Box sx={style}>
      <div
        className={
          "add_admin_user_popup modal_main_popup daily_bonus_spin_dropdown"
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit ? "Update Type Config" : " Add Type Config"}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={"user_kyc_section"}>
              <div className={"user_kyc_section_filed"}>
                <label>
                  Type Config<span className={"validation-star"}>*</span>
                </label>
                <GameStatusDropDown
                  option={["Video", "Image"]}
                  name={"type"}
                  filterData={formData}
                  setFilterData={setFormData}
                />
                {simpleValidator.current.message(
                  "Type Config",
                  formData?.type,
                  "required"
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

export default AddTicketTypeConfig;
