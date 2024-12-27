import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import DaysFilterDropdown from "./DaysFilterDropdown";
import { useDispatch } from "react-redux";
import FilledButton from "../../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import DailyBonusTypeDropdown from "./DailyBonusTypeDropdown";
import DropdownReleaseDate from "../../ReferAndEarn/ReferAndEarnMonthlyTab/BonusReleaseDate/AddBonusReleaseDate/DropdownReleaseDate";
import AddCashDropdown from "./AddCashDropdown";
import ReferralBoostersDropdown from "./ReferralBoostersDropdown";
import {
  createDailyWheelBonusList,
  getDailyWheelBonusType,
  getDayDailyWheelBonus,
  updateDailyWheelBonusList,
} from "../../../../Redux/Bonus/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "5px",
};

const AddDailyWheelBonusPop = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
  getDayDailyWheelBonusList,
}) => {
  const dispatch = useDispatch();
  const [bonusDays, setBonusDays] = useState("");
  const [loader, setLoader] = useState(false);
  const [bonusType, setBonusType] = useState({});
  const [formData, setFormData] = useState({
    day: "",
    spinTitle: "",
    spinDescription: "",
    bonusCashUpto: "",
    realMoneyType: "",
    referralBooster: "",
    realMoneyAmount: "",
    bonusType: [],
  });
  const simpleValidator = useRef(new SimpleReactValidator());
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
      dispatch(getDayDailyWheelBonus()).then((res) => {
      let temp = res.data.data?.remaingDays?.reduce((acc, cur, i) => {
        return [
          ...acc,
          {
            label:
              cur === 1
                ? `Day ${cur} - Sunday`
                : cur === 2
                ? `Day ${cur} - Monday`
                : cur === 3
                ? `Day ${cur} - Tuesday`
                : cur === 4
                ? `Day ${cur} - wednesday`
                : cur === 5
                ? `Day ${cur} - Thursday`
                : cur === 6
                ? `Day ${cur} - Friday`
                : cur === 7 && `Day ${cur} - Saturday`,
            value: cur,
          },
        ];
      }, []);
      setBonusDays({
        isDaysAvalible: res?.data?.data?.isDaysAvalible,
        remaingDays: temp,
      });
    });
  }, []);

  useEffect(() => {
    dispatch(getDailyWheelBonusType({})).then((res) => {
      setBonusType(res.data.data);
      if (!modalValue?.isEdit) {
        setFormData({
          ...formData,
          bonusType: Array.from(Array(8)).fill(""),
        });
      }
    });
  }, []);

  useEffect(() => {
    if (modalValue?.isEdit) {
      const { row } = modalValue;
      setFormData({
        ...formData,
        day: row?.day,
        spinTitle: row?.spinTitle,
        spinDescription: row?.spinDescription,
        bonusCashUpto: row?.bonusCashUpto,
        referralBooster: row?.referralBooster,
        depositCashUpto: row?.depositCashUpto,
        winCashUpto: row?.winCashUpto,
        realMoneyType:
          row?.realMoneyType === "WinCash"
            ? "Winning Cash"
            : row?.realMoneyType === "Cash" && "Deposit Cash",
        realMoneyAmount: row?.realMoneyAmount,
        bonusType: bonusType?.dailyWheelBonusTypeCounter === 6 ? row?.bonusType : row?.bonusType?.length === 8 ? row?.bonusType : [...row?.bonusType, ...Array.from(Array(2)).fill('')],
      });
    }
  }, [modalValue?.isEdit, bonusDays, bonusType?.dailyWheelBonusTypeCounter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(bonusType?.dailyWheelBonusTypeCounter === 6){
      simpleValidator.current.fields['Division 7'] = true
      simpleValidator.current.fields['Division 8'] = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Referral Boosters')){
      simpleValidator.current.fields.expireAt = true
      simpleValidator.current.fields.referralBooster = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Bonus Cash')){
      simpleValidator.current.fields.bonusCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Deposit Cash')){
      simpleValidator.current.fields.depositCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Winning Cash')){
      simpleValidator.current.fields.winningCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Add Cash Offer')){
      simpleValidator.current.fields.minimumAmount = true
      simpleValidator.current.fields.rewardCounter = true
  }
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        day: formData?.day,
        spinTitle: formData?.spinTitle,
        spinDescription: formData?.spinDescription,
        bonusType: formData?.bonusType.reduce((acc, cur) => {
          let temp = [];
          bonusType?.dailyWheelBonusType?.reduce((prev, next) => {
            if (cur.bonusType === next?.type)
              temp.push({ ...cur, isDeductTds: next?.isDeductTds || false });
          }, []);
          return [...acc, ...temp];
        }, []),
        //isDeductTds: formData?.isDeductTds,
      };
      dispatch(createDailyWheelBonusList(payload)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          getDayDailyWheelBonusList();
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenErrorModal("CommonPop", {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if(bonusType?.dailyWheelBonusTypeCounter === 6){
      simpleValidator.current.fields['Division 7'] = true
      simpleValidator.current.fields['Division 8'] = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Referral Boosters')){
      simpleValidator.current.fields.expireAt = true
      simpleValidator.current.fields.referralBooster = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Bonus Cash')){
      simpleValidator.current.fields.bonusCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Deposit Cash')){
      simpleValidator.current.fields.depositCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Winning Cash')){
      simpleValidator.current.fields.winningCash = true
  }
  if(!formData?.bonusType?.reduce((acc,cur)=> [...acc,cur?.bonusType],[])?.includes('Add Cash Offer')){
      simpleValidator.current.fields.minimumAmount = true
      simpleValidator.current.fields.rewardCounter = true
  }
    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        day: formData?.day,
        spinTitle: formData?.spinTitle,
        spinDescription: formData?.spinDescription,
        bonusType: formData?.bonusType.reduce((acc, cur) => {
          let temp = [];
          bonusType?.dailyWheelBonusType?.reduce((prev, next) => {
            if (cur.bonusType === next?.type)
              temp.push({ ...cur, isDeductTds: next?.isDeductTds || false });
          }, []);
          return [...acc, ...temp];
        }, []),
        dailyWheelBonusId: modalValue?.row?._id,
        //isDeductTds: formData?.isDeductTds,
      };
      delete payload?.day;
      dispatch(updateDailyWheelBonusList(payload)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenErrorModal("CommonPop", {
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

  const handleBonusChange = (
    event,
    bonusTypeIndex,
    bonusItem,
    bonusType,
    isDeductTDS,
    deductType
  ) => {
    let temp = [...formData.bonusType];
    if (bonusType === "rewardCounter") {
      temp[bonusTypeIndex] = {
        ...temp[bonusTypeIndex],
        rewardCounter: event.target.value,
      };
      setFormData({
        ...formData,
        bonusType: temp,
      });
    } else if (bonusType === "minAmount") {
      temp[bonusTypeIndex] = {
        ...temp[bonusTypeIndex],
        minAmount: event.target.value.replace("-",""),
      };
      setFormData({
        ...formData,
        bonusType: temp,
      });
    } else {
      temp[bonusTypeIndex] = {
        ...temp[bonusTypeIndex],
        value: event.target.value.replace("-",""),
      };
      setFormData({
        ...formData,
        bonusType: temp,
      });
    }
    //     else if (
    //       bonusType === "Winning Cash" ||
    //       bonusType === "Bonus Cash" ||
    //       bonusType === "Deposit Cash"
    //     ) {
    //       if (deductType) {
    //         temp[bonusTypeIndex] = {
    //           ...temp[bonusTypeIndex],
    //           isDeductTDS: isDeductTDS || false,
    //         };
    //       } else {
    //         temp[bonusTypeIndex] = {
    //           ...temp[bonusTypeIndex],
    //           value: event.target.value,
    //           isDeductTDS: isDeductTDS || false,
    //         };
    //       }
    //       setFormData({
    //         ...formData,
    //         bonusType: temp,
    //       });
    //     } else {
    //       temp[bonusTypeIndex] = {
    //         ...temp[bonusTypeIndex],
    //         value: event.target.value,
    //       };
    //       setFormData({
    //         ...formData,
    //         bonusType: temp,
    //       });
    //     }
  };
  return (
    <Box sx={style}>
      <div
        className={
          "modal_main_popup add_admin_user_popup daily_wheel_bonus_popup"
        }
      >
        <div className={"modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? "Edit Daily Wheel Bonus"
              : "Add Daily Spin Bonus"}
          </h2>
        </div>
        <div
          className={"add_daily_wheel_bonus_pop add_admin_user_popup_content"}
        >
          <form
            className={"form"}
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"daily_wheel_bonus_section "}>
              <div className={"daily_wheel_bonus_section_filed"}>
                <label>
                  Day <span className={"validation-star"}>*</span>
                </label>
                <DaysFilterDropdown
                  option={bonusDays?.remaingDays}
                  formData={formData}
                  isEdit={modalValue?.isEdit}
                  setFormData={setFormData}
                />
                {simpleValidator.current.message(
                  "day",
                  formData?.day,
                  "required"
                )}
              </div>

              <div className="formData">
                <label>
                  Spin Title <span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                    type="text"
                    value={formData?.spinTitle}
                    className={"wrap_input_modal"}
                    maxLength={20}
                    name="spinTitle"
                    placeholder={"Enter Spin Title"}
                    onChange={(e) => handleChange(e)}
                  />
                  <span>{formData?.spinTitle?.length}/20</span>
                </div>
                {simpleValidator.current.message(
                  "spinTitle",
                  formData?.spinTitle,
                  "required"
                )}
              </div>

              <div
                className={"daily_wheel_bonus_section_filed game_input_chars"}
              >
                <label>Spin Description</label>
                <div className={"daily_wheel_bonus_input_filed mt_daily_bonus"}>
                  <textarea
                    name={"spinDescription"}
                    placeholder={"Enter Spin Description"}
                    rows={3}
                    maxLength={20}
                    value={formData?.spinDescription}
                    onChange={(e) => handleChange(e)}
                  />
                  <span>{formData?.spinDescription?.length}/20</span>
                </div>
              </div>
              <div
                className={"daily_wheel_bonus_section_filed bonus_type_section"}
              >
                <label className={"main_label label-border"}>
                  Spin Bonus Type
                </label>
                <div className={"bonus_type_content_text mt_1"}>
                  {(bonusType?.dailyWheelBonusTypeCounter === 6
                    ? formData?.bonusType?.slice(0, 6)
                    : formData?.bonusType
                  )?.map((item, index) => {
                    return (
                      <div
                        className={
                          item?.bonusType === "Referral Boosters" ||
                          item?.bonusType === "Add Cash Offer" ||
                          item?.bonusType === undefined ||
                          item?.bonusType === "Hard Luck"
                            ? "daily_wheel_bonus_spin_section"
                            : "dropdown_part d_flex daily_wheel_bonus_spin_section "
                        }
                      >
                        <div className={"w_100 mr"}>
                          <label className={"main_spin_division"}>
                            Division {index + 1}{" "}
                            <span className={"validation-star"}>*</span>
                          </label>
                          <DailyBonusTypeDropdown
                            name={`bonusType${index}`}
                            bonusValue={item}
                            options={bonusType?.dailyWheelBonusType}
                            index={index}
                            setFormData={setFormData}
                            formData={formData}
                          />
                          {simpleValidator.current.message(
                            `Division ${index + 1}`,
                            item,
                            "required"
                          )}
                          {/* {
                                                        ( formData?.bonusType[index].bonusType === 'Bonus Cash' && item.bonusType === 'Bonus Cash' && index === index  ||
                                                            formData?.bonusType[index].bonusType === 'Deposit Cash' && item.bonusType === 'Deposit Cash' && index === index ||
                                                            formData?.bonusType[index].bonusType === 'Winning Cash' && item.bonusType === 'Winning Cash' && index === index
                                                        ) &&
                                                         <div className={'common_checkbox_details mt_more_margin'} >
                                                             <label>Is Deduct TDS  ? <span className={'validation-star'}>*</span></label>
                                                             <div className={'game_mode_btn'}>
                                                                 <div className={'game_mode_btn_option yes_radio_btn'}>
                                                                     <input type={'radio'} name={`${formData?.bonusType[index].bonusType?.replaceAll(' ', '')}${index}`} checked={item?.isDeductTDS} onChange={(e) => handleBonusChange(e, index, item, formData?.bonusType[index].bonusType,true,'checkbox')} />
                                                                     <label>Yes</label>
                                                                 </div>
                                                                 <div className={'game_mode_btn_option no_radio_btn'}>
                                                                     <input type={'radio'} name={`${formData?.bonusType[index].bonusType?.replaceAll(' ', '')}${index}`} checked={!item?.isDeductTDS} onChange={(e) => handleBonusChange(e, index, item, formData?.bonusType[index].bonusType, false,'checkbox')} />
                                                                     <label>No</label>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                     } */}
                        </div>
                        <div className={"daily_bonus_details_section w_100 ml"}>
                          {formData?.bonusType[index].bonusType ===
                            "Bonus Cash" &&
                            item.bonusType === "Bonus Cash" &&
                            index === index && (
                              <div>
                                <label>
                                  {" "}
                                  Bonus Cash price{" "}
                                  <span className={"validation-star"}>
                                    *
                                  </span>{" "}
                                </label>
                                <div
                                  className={"daily_wheel_bonus_input_filed"}
                                >
                                  <input
                                    type={"number"}
                                    onWheel={(event) =>
                                      event.currentTarget.blur()
                                    }
                                    name={"bonusCashUpto"}
                                    value={item?.value}
                                    placeholder={"Bonus Cash"}
                                    onChange={(e) =>
                                      handleBonusChange(
                                        e,
                                        index,
                                        item,
                                        formData?.bonusType[index].bonusType
                                      )
                                    }
                                  />
                                </div>
                                {simpleValidator.current.message(
                                  "bonusCash",
                                  formData?.bonusType[index]?.value?.toString(),
                                  "required|min:0|max:10"
                                )}
                              </div>
                            )}
                          {formData?.bonusType[index].bonusType ===
                            "Deposit Cash" &&
                            item.bonusType === "Deposit Cash" &&
                            index === index && (
                              <div>
                                <label>
                                  Deposit Cash price{" "}
                                  <span className={"validation-star"}>*</span>{" "}
                                </label>
                                <div
                                  className={"daily_wheel_bonus_input_filed"}
                                >
                                  <input
                                    type={"number"}
                                    onWheel={(event) =>
                                      event.currentTarget.blur()
                                    }
                                    name={"bonusCashUpto"}
                                    value={item?.value}
                                    placeholder={"Deposit Cash"}
                                    onChange={(e) =>
                                      handleBonusChange(
                                        e,
                                        index,
                                        item,
                                        formData?.bonusType[index].bonusType
                                      )
                                    }
                                  />
                                </div>

                                {simpleValidator.current.message(
                                  "depositCash",
                                  formData?.bonusType[index]?.value?.toString(),
                                  "required|min:0|max:10"
                                )}
                              </div>
                            )}
                          {formData?.bonusType[index].bonusType ===
                            "Winning Cash" &&
                            item.bonusType === "Winning Cash" &&
                            index === index && (
                              <div>
                                <label>
                                  Winning Cash price{" "}
                                  <span className={"validation-star"}>*</span>
                                </label>
                                <div
                                  className={"daily_wheel_bonus_input_filed"}
                                >
                                  <input
                                    type={"number"}
                                    onWheel={(event) =>
                                      event.currentTarget.blur()
                                    }
                                    name={"bonusCashUpto"}
                                    value={item?.value}
                                    placeholder={"Winning Cash"}
                                    onChange={(e) =>
                                      handleBonusChange(
                                        e,
                                        index,
                                        item,
                                        formData?.bonusType[index].bonusType
                                      )
                                    }
                                  />
                                </div>
                                {simpleValidator.current.message(
                                  "winningCash",
                                  formData?.bonusType[index]?.value?.toString(),
                                  "required|min:0|max:10"
                                )}
                              </div>
                            )}
                          {formData?.bonusType[index].bonusType ===
                            "Referral Boosters" &&
                            item.bonusType === "Referral Boosters" &&
                            index === index && (
                              <>
                                <div className={"d_flex  referral_booster"}>
                                  <div className={"w_100 mr"}>
                                    <label>
                                      Referral Boosters{" "}
                                      <span className={"mini_boosters"}>
                                        (ex.2x,3x...){" "}
                                        <span className={"validation-star"}>
                                          *
                                        </span>
                                      </span>
                                    </label>
                                    <ReferralBoostersDropdown
                                      options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                      bonusValue={item.value}
                                      bonusTypeIndex={index}
                                      name={"referralBooster"}
                                      formData={formData}
                                      setFormData={setFormData}
                                    />
                                    {/*<div className={'daily_wheel_bonus_input_filed'}>*/}
                                    {/*    <input type={'number'} onWheel={event => event.currentTarget.blur()} name={'referralBooster'} value={item?.value} placeholder={'Referral Boosters'} onChange={(e) => handleBonusChange(e, index, item)} />*/}
                                    {/*</div>*/}
                                    {simpleValidator.current.message(
                                      "referralBooster",
                                      formData?.bonusType[index]?.value,
                                      "required"
                                    )}
                                  </div>
                                  {/*<div className={'w_100 ml mr'}>*/}
                                  {/*    <label>Reward Counter </label>*/}
                                  {/*    <div className={'daily_wheel_bonus_input_filed'}>*/}
                                  {/*        <input type={'number'} onWheel={event => event.currentTarget.blur()} name={'rewardCounter'} value={item?.rewardCounter} placeholder={'Reward Counter'} onChange={(e) => handleBonusChange(e, index, item,'rewardCounter')} />*/}
                                  {/*    </div>*/}
                                  {/*    {simpleValidator.current.message("rewardCounter", formData?.bonusType[index]?.rewardCounter, 'required')}*/}
                                  {/*</div>*/}
                                  <div className={"w_100 ml"}>
                                    <label>
                                      Expire At{" "}
                                      <span className={"validation-star"}>
                                        *
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        "daily_wheel_bonus_input_filed"
                                      }
                                    >
                                      <DropdownReleaseDate
                                        name={"expireAt"}
                                        expireAtValue={item?.expireAt}
                                        setFormData={setFormData}
                                        formData={formData}
                                        bonusTypeIndex={index}
                                        isDailyBonus={true}
                                      />
                                    </div>
                                    {simpleValidator.current.message(
                                      "expireAt",
                                      formData?.bonusType[index]?.expireAt,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          {formData?.bonusType[index].bonusType ===
                            "Add Cash Offer" &&
                            item.bonusType === "Add Cash Offer" &&
                            index === index && (
                              <>
                                <div className={"d_flex  add_cash_section"}>
                                  <div className={"w_100 mr"}>
                                    <label>
                                      Add Cash Offer{" "}
                                      <span className={"validation-star"}>
                                        *
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        "daily_wheel_bonus_input_filed"
                                      }
                                    >
                                      <AddCashDropdown
                                        name={"addCashOffer"}
                                        cashPercentage={item?.value}
                                        setFormData={setFormData}
                                        formData={formData}
                                        bonusTypeIndex={index}
                                        isDailyBonus={true}
                                      />
                                    </div>
                                    {simpleValidator.current.message(
                                      "referralBooster",
                                      formData?.bonusType[index]?.value,
                                      "required"
                                    )}
                                  </div>
                                  <div className={"w_100 ml mr"}>
                                    <label>
                                      Min Amount{" "}
                                      <span className={"validation-star"}>
                                        *
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        "daily_wheel_bonus_input_filed"
                                      }
                                    >
                                      <input
                                        type={"number"}
                                        onWheel={(event) =>
                                          event.currentTarget.blur()
                                        }
                                        name={"minAmount"}
                                        value={item?.minAmount}
                                        placeholder={"Enter Min Amount"}
                                        onChange={(e) =>
                                          handleBonusChange(
                                            e,
                                            index,
                                            item,
                                            "minAmount"
                                          )
                                        }
                                      />
                                    </div>
                                    {simpleValidator.current.message(
                                      "minimumAmount",
                                      formData?.bonusType[
                                        index
                                      ]?.minAmount?.toString(),
                                      "required|min:0|max:10"
                                    )}
                                  </div>
                                  <div className={"w_100 ml mr"}>
                                    <label>
                                      Reward Counter{" "}
                                      <span className={"validation-star"}>
                                        *
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        "daily_wheel_bonus_input_filed"
                                      }
                                    >
                                      <input
                                        type={"number"}
                                        onWheel={(event) =>
                                          event.currentTarget.blur()
                                        }
                                        name={"rewardCounter"}
                                        value={item?.rewardCounter}
                                        placeholder={"Reward Counter"}
                                        onChange={(e) =>
                                          handleBonusChange(
                                            e,
                                            index,
                                            item,
                                            "rewardCounter"
                                          )
                                        }
                                      />
                                    </div>
                                    {simpleValidator.current.message(
                                      "rewardCounter",
                                      formData?.bonusType[
                                        index
                                      ]?.rewardCounter?.toString(),
                                      "required|min:0|max:10"
                                    )}
                                  </div>
                                  <div className={"w_100 ml"}>
                                    <label>
                                      Expire At{" "}
                                      <span className={"validation-star"}>
                                        *
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        "daily_wheel_bonus_input_filed"
                                      }
                                    >
                                      <DropdownReleaseDate
                                        name={"expireAt"}
                                        setFormData={setFormData}
                                        expireAtValue={item?.expireAt}
                                        formData={formData}
                                        bonusTypeIndex={index}
                                        isDailyBonus={true}
                                      />
                                    </div>
                                    {simpleValidator.current.message(
                                      "expireAt",
                                      formData?.bonusType[index]?.expireAt,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                    );
                  })}
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
export default AddDailyWheelBonusPop;
