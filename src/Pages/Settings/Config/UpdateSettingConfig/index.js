import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import {
  UpdateBonusExpireDaysCase,
  UpdatePlatformCommissionCase,
  defaultUserDailyDepositLimit,
  defaultUserMonthlyDepositCash,
  monthlyDepositCash,
  updateMaximumAddCash,
  updateMaximumWithdrawCash,
  updateMinimumAddCash,
  updateMinimumWithdrawCash,
  updateSignUpBonus,
  updateSignUpCash,
} from "../../../../Redux/settings/action";
import GSTPercentageDropdown from "Components/Dropdown/GSTPercentageDropdown";
import DayDropdown from "Components/Dropdown/DayDropdown";

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

const UpdateSettingConfig = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [formData, setFormData] = useState({
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      switch (modalValue?.name) {
        case "signup cash": {
          setLoader(true);
          dispatch(updateSignUpCash({ signupCash: formData?.amount })).then(
            (res) => {
              if (res.data.success) {
                setLoader(false);
                redirectApiHandler();
                handleOpenModal("CommonPop", {
                  header: "Success",
                  body: res.data.message,
                });
              } else {
                handleOpenModal("CommonPop", {
                  header: "Error",
                  body: res.data.message || res.data.msg,
                });
              }
            }
          );
          break;
        }
        case "signup bonus": {
          setLoader(true);
          dispatch(updateSignUpBonus({ signupBonus: formData?.amount })).then(
            (res) => {
              if (res.data.success) {
                setLoader(false);
                redirectApiHandler();
                handleOpenModal("CommonPop", {
                  header: "Success",
                  body: res.data.message,
                });
              } else {
                handleOpenModal("CommonPop", {
                  header: "Error",
                  body: res.data.message || res.data.msg,
                });
              }
            }
          );
          break;
        }
        case "minimum add cash": {
          setLoader(true);
          dispatch(
            updateMinimumAddCash({ minimumAddCash: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "maximum add cash": {
          setLoader(true);
          dispatch(
            updateMaximumAddCash({ maximumAddCash: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "maximum withdraw cash": {
          setLoader(true);
          dispatch(
            updateMaximumWithdrawCash({ maximumWithdrawCash: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "monthly deposit cash": {
          setLoader(true);
          dispatch(
            monthlyDepositCash({ monthlyDepositCash: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "default user monthly deposit limit": {
          setLoader(true);
          dispatch(
            defaultUserMonthlyDepositCash({
              defaultUserMonthlyDepositLimit: formData?.amount,
            })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "default user daily deposit limit": {
          setLoader(true);
          dispatch(
            defaultUserDailyDepositLimit({
              defaultUserDailyDepositLimit: formData?.amount,
            })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "platform commission": {
          setLoader(true);
          dispatch(
            UpdatePlatformCommissionCase({
              platformCommission: formData?.amount,
            })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        case "bonus expire days": {
          setLoader(true);
          dispatch(
            UpdateBonusExpireDaysCase({ bonusExpireDays: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
          break;
        }
        default: {
          setLoader(true);
          dispatch(
            updateMinimumWithdrawCash({ minimumWithdrawCash: formData?.amount })
          ).then((res) => {
            if (res.data.success) {
              setLoader(false);
              redirectApiHandler();
              handleOpenModal("CommonPop", {
                header: "Success",
                body: res.data.message,
              });
            } else {
              handleOpenModal("CommonPop", {
                header: "Error",
                body: res.data.message || res.data.msg,
              });
            }
          });
        }
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      amount: modalValue?.amount,
    });
  }, [modalValue]);

  const nameCapitalise = modalValue?.name
    ? modalValue.name === "platform commission"
      ? "Platform commission (%)"
      : modalValue.name.charAt(0).toUpperCase() + modalValue.name.slice(1)
    : "";
  return (
    <Box sx={style}>
      <div className={"modal_main_popup add_admin_user_popup update_user_cash"}>
        <div className={"modal_popup_title"}>
          <h2 className={"config_text"}> Update {modalValue?.name}</h2>
        </div>
        <div className={"add_admin_user_popup_content_pop"}>
          <form method={"POST"} onSubmit={(e) => handleSubmit(e)}>
            {modalValue?.name === "bonus expire days" ? (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <label className={"config_text"}>
                    {nameCapitalise}{" "}
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                <DayDropdown
                  name={"amount"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
            ) : modalValue?.name !== "platform commission" ? (
              <div className="formData">
                <label className={"config_text"}>
                  {nameCapitalise} <span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <div className={"input_length_counter"}>
                    <input
                      type="text"
                      maxLength={10}
                      name="cash"
                      value={formData?.amount}
                      onChange={(e) => {
                        const userInput = e.target.value;
                        const sanitizedInput = userInput.replace(/[^0-9]/g, "");
                        const sanitizedAndNoLeadingZeroInput =
                          sanitizedInput.replace(/^0+/, "");
                        setFormData({
                          ...formData,
                          amount: sanitizedAndNoLeadingZeroInput,
                        });
                      }}
                    />
                    <span className={"game_edit_info_span"}>
                      {formData?.amount?.toString()?.length}/10
                    </span>
                  </div>
                </div>
                {simpleValidator.current.message(
                  modalValue?.name === "signup cash" ? "signup cash"
                    
                    : modalValue?.name === "signup bonus"
                    ? "signup bonus"
                    : modalValue?.name === "minimum add cash"
                    ? "minimum add cash"
                    : modalValue?.name === "maximum add cash"
                    ? "maximum add cash"
                    : modalValue?.name === "maximum withdraw cash"
                    ? "maximum withdraw cash"
                    : modalValue?.name === "monthly deposit cash"
                    ? "monthly deposit cash"
                    : modalValue?.name === "platform commission"
                    ? "platform commission"
                    : "minimum withdraw cash",
                  formData?.amount?.toString(),
                  "required|numeric"
                )}
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <label className={"config_text"}>
                    {nameCapitalise}{" "}
                    <span className={"validation-star"}>*</span>
                  </label>
                </div>
                <GSTPercentageDropdown
                  name={"amount"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
            )}

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
    </Box>
  );
};
export default UpdateSettingConfig;
