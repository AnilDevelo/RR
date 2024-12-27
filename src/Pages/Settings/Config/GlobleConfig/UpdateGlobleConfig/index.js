import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GSTPercentageDropdown from "Components/Dropdown/GSTPercentageDropdown";
import { UpdateGameCaseCase } from "Redux/settings/action";
import FilledButton from "Components/FileButton";
import PopComponent from "hoc/PopContent";
import CommonModal from "hoc/CommonModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const UpdateGlobleConfig = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    bonusCash: "",
    depositCash: "",
    winningCash: "",
  });
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];



  const handleOpenErrorModal = (type, data) => {
    switch (type) {
        case 'CommonPop': {
            setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
            break;
        }
        default: {
            setModalDetails({ ...modalDetails, modalIsOpen: false })
        }
    }
};
  const handleSubmit = (e) => {
    e.preventDefault();
      const { bonusCash, depositCash, winningCash } = formData;
      // Check if the sum is equal to 100
      if (bonusCash + depositCash + winningCash !== 100) {
        handleOpenErrorModal("CommonPop", {
          header: "Error",
          body: "Winning cash, Bonus cash and Deposit cash total must be 100 %",
        });
        return;
      } else {
        let payload = {
          ...formData,
        };

        setLoader(true);
        dispatch(UpdateGameCaseCase(payload)).then((res) => {
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
      }
  };

  useEffect(() => {
    const updatedFormData = {...formData};
    const nameToKey = {"winning cash": "winningCash","bonus cash": "bonusCash","deposit cash": "depositCash"};
    modalValue.forEach((cashItem) => {const key = nameToKey[cashItem?.name];
    if (key) {updatedFormData[key] = cashItem?.amount;}});
    setFormData(updatedFormData);
  }, [modalValue]);

  return (
    <Box sx={style}>
      <div className={"modal_main_popup add_admin_user_popup update_user_cash"}>
        <div className={"modal_popup_title"}>
          <h2 className={"config_text"}> Update Globle Config</h2>
        </div>
        <div className={"add_admin_user_popup_content_pop"}>
          <form method={"POST"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"user_kyc_section"}>
              <div
                className={"user_kyc_section_filed"}
                style={{ marginBottom: "5px" }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <label>
                    Winning Cash (%)
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                <GSTPercentageDropdown
                  name={"winningCash"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className={"user_kyc_section_filed"}
                style={{ marginBottom: "5px" }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <label>
                    Bonus Cash (%)<span className={"validation-star"}>*</span>
                  </label>
                </div>
                <GSTPercentageDropdown
                  name={"bonusCash"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className={"user_kyc_section_filed"}
              >
                <div style={{ marginBottom: "5px" }}>
                  <label>
                    Deposit Cash (%)<span className={"validation-star"}>*</span>
                  </label>
                </div>
                <GSTPercentageDropdown
                  name={"depositCash"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className={"formData_btn"}>
              <button
                className={"btn_default mr_2"}
                onClick={() => handleOpenModal()}
              >
                Cancel
              </button>
              <FilledButton
                type={"submit"}
                value={"Submit"}
                className={"btn"}
                loading={loader}
              />
            </div>
          </form>
        </div>
      </div>
      <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
      </CommonModal>
    </Box>
  );
};
export default UpdateGlobleConfig;
