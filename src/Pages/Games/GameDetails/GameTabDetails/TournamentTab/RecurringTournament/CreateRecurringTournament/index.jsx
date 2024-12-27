import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Optional } from "../../../../../../../images/OptionalIcon";
import FilledButton from "../../../../../../../Components/FileButton";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import SimpleReactValidator from "simple-react-validator";
import TextEditor from "../../../../../../Master/Document/TextEditor";
import {
  createTournamentLobby,
  getSingleGameDetails,
  updateTournamentLobby,
} from "../../../../../../../Redux/games/action";
import DropdownMode from "../../../LobbyTab/CreateLobby/DropdownMode";
import CommonModal from "../../../../../../../hoc/CommonModal";
import PopComponent from "../../../../../../../hoc/PopContent";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import GSTDropDown from "../../../LobbyTab/CreateLobby/GSTDropDown";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CustomTable from "../../../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import { fr } from "date-fns/locale";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { jsonToFormData, profileImages } from "../../../../../../../utils";
import user from "../../../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../../../assets/images/plus.svg";
import ShowLevels from "./ShowLevels";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 831,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "32px 0",
  borderRadius: "5px",
};

const CreateRecurringTournament = ({modalValue,handleOpenModal}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [releaseNote, setReleaseNote] = useState("");
  const [rankRange, setRankRange] = useState(false);
  const [formValues, setFormValues] = useState([""]);
  const [openCale, setOpenCale] = useState({
    tournamentPlayStartDate: false,
    tournamentJoinStartDate: false,
  });
  const [numberOfRank, setNumberOfRank] = useState([]);
  const gameDetails = useSelector((state) => state?.gameReducer?.gameDetails);
  const [formData, setFormData] = useState({
    tournamentName: "",
    winningPrice: "",
    maxPlayer: "",
    minPlayer: "",
    entryfee: "",
    tournamentJoinStartDate: null,
    tournamentPlayStartDate: null,
    isDefaultPlatformCommission: true,
    platformCommission: "",
    isGST: false,
    levelInfo: [],
    multiWinner: "",
    noOfPlayer: "",
    tournamentIcon: "",
    isImageUpdated: false,
  });



  useEffect(() => {
    dispatch(getSingleGameDetails({ gameId: id }));
  }, []);

  useEffect(() => {
    if (formData?.isDefaultPlatformCommission) {
      setFormData({
        ...formData,
        platformCommission:
          gameDetails?.gameConfig?.gameConfig?.PLATFORM_COMMISSION,
      });
    }
  }, [formData?.isDefaultPlatformCommission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        pricePool: formValues,
        gameId: gameDetails?._id,
        tournamentRules: releaseNote,
        tournamentIcon: formData?.tournamentIcon,
        tournamentJoinStartDate: moment
          .utc(formData?.tournamentJoinStartDate)
          .format("YYYY-MM-DD"),
        tournamentPlayStartDate: moment
          .utc(formData?.tournamentPlayStartDate)
          .format("YYYY-MM-DD"),
      };
      if(formData?.levelInfo?.length > 0){
        setLoader(true);
        dispatch(createTournamentLobby(jsonToFormData(payload))).then((res) => {
          if (res.data.success) {
            setLoader(false);
            modalValue.redirectApiProps();
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
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const handleDatePicker = (newValue, type) => {
    setFormData({ ...formData, [type]: newValue });
    setOpenCale({ ...openCale, [type]: false });
  };

  const handleEditor = (props) => {
    setReleaseNote(props);
  };

  const addFormFields = (type, index) => {
    if (type === "add") {
      setFormValues([...formValues, ""]);
    } else {
      let temp = [...formValues];
      temp.splice(index, 1);
      setFormValues(temp);
    }
  };

  const handleChange = (e) => {
    let numberRegex = /^\d+$/;
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: +numberRegex.test(value)
        ? /^0/.test(value)
          ? value.replace(/^0/, "")
          : +value
        : "",
    });
  };

  useEffect(() => {
    if (
      formValues?.filter((item) => +item?.rankEnd === +formData.multiWinner)
        ?.length > 0
    ) {
      setRankRange(true);
    }
    if (
      formValues?.filter((item) => +item?.rankEnd === +formData.multiWinner)
        ?.length <= 0
    ) {
      setRankRange(false);
    }
  }, [formValues]);

  const handleChangeRange = (e, index, type) => {
    const { value, name } = e.target;
    if (Number(value) > Number(formData.multiWinner) && name === "rankEnd") {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Rank not greater than Total Winners",
      });
    } else if (
      Number(value) >= Number(formData.multiWinner) &&
      name === "rankStart"
    ) {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Rank Start not greater than and Equal Total Winners",
      });
    } else {
      let temp = [...formValues];
      temp[index] = {
        ...temp[index],
        [name]: /^0/.test(value) ? value.replace(/^0/, "") : value,
      };
      setFormValues(temp);
    }
  };

  const handleChangeCheckbox = (e, type) => {
    setFormData({
      ...formData,
      [e.target.name]: type,
    });
  };
  const handleIconChange = (e) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      setFormData({
        ...formData,
        tournamentIcon: e.target.files[0],
        isImageUpdated: true,
      });
    } else {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Please add only image file",
      });
    }
  };
  useEffect(() => {
    if (modalValue?.isEdit) {  
      setFormData({
        ...formData,
    tournamentName: modalValue.row.tournamentName,
    winningPrice: modalValue.row.winningPrice,
    maxPlayer: modalValue.row.maxPlayer,
    minPlayer: modalValue.row.minPlayer,
    entryfee: modalValue.row.entryfee,
    tournamentJoinStartDate: moment(modalValue.row.tournamentJoinStartDate),
    tournamentPlayStartDate: moment(modalValue.row.tournamentPlayStartDate),
    isDefaultPlatformCommission: modalValue.row.isDefaultPlatformCommission,
    platformCommission: modalValue.row.platformCommission,
    isGST: modalValue.row.isGST || false,
    levelInfo:modalValue.row.levelInfo,
    multiWinner: modalValue.row.multiWinner,
    noOfPlayer: modalValue.row.noOfPlayer,
    tournamentIcon: modalValue.row.tournamentIconImage,
        isImageUpdated: false,
    
      });
      setFormValues(modalValue.row.pricePool)
      setReleaseNote(modalValue.row.tournamentRules)
    }
  }, [modalValue?.isEdit]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        pricePool: formValues,
        gameId: gameDetails?._id,
        tournamentRules: releaseNote,
        tournamentIcon: formData?.tournamentIcon,
        tournamentJoinStartDate: moment
          .utc(formData?.tournamentJoinStartDate)
          .format("YYYY-MM-DD"),
        tournamentPlayStartDate: moment
          .utc(formData?.tournamentPlayStartDate)
          .format("YYYY-MM-DD"),
          tournamentId:modalValue.row._id
      };
      if (!payload.isImageUpdated) {
        delete payload.tournamentIcon;
      }
      if(formData?.levelInfo?.length > 0) {
        setLoader(true);

        dispatch(updateTournamentLobby(jsonToFormData(payload)))
            .then((res) => {
              if (res.data.success) {
                setLoader(false);
                modalValue.redirectApiProps();
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
      case "CreateRecurringTournament": {
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

  return (
    <Box sx={style}>
      <div className={"create_headToHead_modal create_recurring_tournament modal_main_popup add_admin_user_popup"}>
        <div className={"modal_popup_title"}>
          <h2>{ modalValue?.isEdit ? "Update Tournament" : "Add Tournament"}</h2>
        </div>
        <div className={" header_slider_details_Ads"}>
          <form
            method={"POST"}
            onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)} className={"ads_internal"}>
            <div className="d_flex_component">
              <div className="formData" style={{ width: "50%" }}>
                <label>Tournament Name <span className={"validation-star"}>*</span></label>
                <div className="emailWrap">
                  <input type="text" className={"wrap_input_modal"} name="tournamentName" maxLength={20} value={formData?.tournamentName} placeholder={"Enter tournament name"} onChange={(e) => setFormData({
                    ...formData,
                    tournamentName: e.target.value,
                  })
                  }/>
                  <span>{formData?.tournamentName?.length}/20</span>
                </div>
                {simpleValidator.current.message("tournamentName", formData?.tournamentName, "required")}
              </div>
              <div className="form_group profile new_game_section profile-image-dropdown">
                <div className="user_profile">
                  <div className="user_profile_pic">
                    {profileImages(formData?.tournamentIcon, user)}
                    {!formData?.tournamentIcon && (
                      <span className="addnew">
                        <img src={icon_plus} alt="" />
                        <input type="file" name="labelIcon" id="" onChange={(e) => handleIconChange(e)}/>
                      </span>
                    )}
                  </div>
                  <label htmlFor="" className="profile_label">Tournament Icon <span className={"validation-star"}>*</span></label>
                </div>
                {simpleValidator.current.message("tournamentIcon", formData?.tournamentIcon, "required")}
                {formData?.tournamentIcon && (
                  <div className={"close-icon"} onClick={() => setFormData({ ...formData, tournamentIcon: "" })}><CloseSharpIcon /></div>
                )}
              </div>
            </div>

            {/*<div className="formData">*/}
            {/*  <label>Description (optional) </label>*/}
            {/*  <div className="text_Wrap emailWrap">*/}
            {/*    <input type={"text"} className={"wrap_input_modal"} value={formData?.description} maxLength={50} name="description" placeholder={"Enter tournament description"} onChange={(e)=>handleChange(e)} />*/}
            {/*    <span>{formData?.description?.length}/50</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={"formData tournament_setting_content prize_amount d_flex w_100 "}>
              <div className=" form_amount_tab01  w_100">
                <label>
                  Total Minimum Join Player
                  <span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                      type="text"
                      maxLength={10}
                      value={formData?.minPlayer}
                      name="minPlayer"
                      placeholder={"Total Minimum Join Player"}
                      className={"w_100"}
                      onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message("minPlayer", formData?.minPlayer, "required")}
              </div>
              <div className="form_amount_tab02  tab02_inner_class w_100" >
                <label>
                  Total Winners<span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input type="text" value={formData.multiWinner} name="multiWinner" placeholder={"Total Winners"} onChange={(e) => handleChange(e)}/>
                </div>
                {simpleValidator.current.message("totalWinners", formData?.multiWinner, "required")}
              </div>
            </div>

            <ShowLevels
                formData={formData}
                setFormData={setFormData}
                simpleValidator={simpleValidator}
                gameDetails={gameDetails}
                handleChange={handleChange}
                handleOpenErrorModal={handleOpenErrorModal}
                setNumberOfRank={setNumberOfRank}
                numberOfRank = {numberOfRank}
            />

            <div className={"tournament_setting_content"}>
              <h3>Prize Amount</h3>
              <div className={"formData tournament_setting_content prize_amount"}>
                <div className={"tournament_setting_amount"}>
                  <div className=" form_amount_tab01 w_100">
                    <label>Tournament Entry Fee (₹){" "}<span className={"validation-star"}>*</span></label>
                    <div className="emailWrap">
                      <input type="text" fullWidth name="entryfee" placeholder={"Enter Tournament Entry Fee"} className={"w_100"} value={formData?.entryfee} onChange={(e) =>
                          setFormData({
                            ...formData,
                            entryfee: e.target.value,
                          })}/>
                    </div>
                    {simpleValidator.current.message("entry fee", formData?.entryfee, "required")}
                  </div>
                  <div className="form_amount_tab02 tab02_inner_class w_100 ">
                    <label>Tournament Winning Prize{" "}
                    <span className={"validation-star"}> *</span></label>
                    <div className="emailWrap">
                      <input type="text" name="winningPrice" placeholder={"Enter Tournament Winning Prize"} value={formData?.winningPrice} className={"w_100"} onChange={(e) => handleChange(e)}/>
                    </div>
                    {simpleValidator.current.message("winningPrice", formData?.winningPrice, "required")}
                  </div>
                </div>
              </div>
            </div>
            {formValues.map((element, index) => {
              return (
                <div className="form_tabledata formData">
                  <div className="Start mr_margin">
                    <label>Rank Start<span className={"validation-star"}>*</span></label>
                    <input value={element.rankStart} type={"text"} placeholder={"Enter Rank Start"} name={"rankStart"} onChange={(e) => handleChangeRange(e, index)}/>
                    {simpleValidator.current.message("rankStart", element?.rankStart, "required")}
                  </div>
                  <div className="Start mr_margin">
                    <label>Rank End<span className={"validation-star"}>*</span></label>
                    <input value={element.rankEnd} type={"text"} placeholder={"Enter Rank End"} name={"rankEnd"} onChange={(e) => handleChangeRange(e, index, "rankEnd")}/>
                    {simpleValidator.current.message("rankEnd", element?.rankEnd, "required")}
                  </div>
                  <div className="Start">
                    <label>Price<span className={"validation-star"}>*</span></label>
                    <input value={element.price} type={"text"} placeholder={"Enter Price"} name={"price"} onChange={(e) => handleChangeRange(e, index)}/>
                    {simpleValidator.current.message("price", element?.price, "required")}
                  </div>
                  {formValues?.length - 1 === index ? (
                    <>
                      {formValues?.length !== 1 && (<span className="cursor_pointer  remove_field" onClick={() => addFormFields("remove", index)}>-</span>)}
                      {!rankRange && (<span className="cursor_pointer  add_field" onClick={() => addFormFields("add")}>+</span>)}
                    </>
                  ) : (
                    formValues?.length !== 1 && (<span className="cursor_pointer remove_field" onClick={() => addFormFields("remove", index)}>-</span>)
                  )}
                </div>
              );
            })}
            <div className={"date-picker_coupon mt_1"}>
              <div className={"start-date-picker"}>
                <label>Tournament join start date{" "}<span className={"validation-star"}>*</span></label>
                <div className={"date_picker_value"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker name="start-date" renderInput={(props) => <TextField {...props} />} className={"datePicker_details"} value={formData?.tournamentJoinStartDate} minDate={new Date()} onChange={(newValue) => handleDatePicker(newValue, "tournamentJoinStartDate")
                    } inputProps={{ readOnly: true }}/>
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message("tournamentJoinStartDate", formData?.tournamentJoinStartDate, "required")}
              </div>
              <div className={"end-date-picker"}>
                <label>Tournament play start date{" "}<span className={"validation-star"}>*</span></label>
                <div className={"date_picker_value"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      name="start-date"
                      renderInput={(props) => <TextField {...props} />}
                      className={"datePicker_details"}
                      value={formData?.tournamentPlayStartDate}
                      minDate={new Date()}
                      onChange={(newValue) =>
                        handleDatePicker(newValue, "tournamentPlayStartDate")
                      }
                      inputProps={{ readOnly: true }}
                    />
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message("tournamentPlayStartDate", formData?.tournamentPlayStartDate, "required")}
              </div>
            </div>
            <div className={"platform-gst-details"}>
              <div className={"common_checkbox_details real_money_field"}>
                <label>
                  Platform Commission (%){" "}
                  <span className={"validation-star"}>*</span>
                </label>
                <div className={"game_mode_btn"}>
                  <div className={"game_mode_btn_option yes_radio_btn"}>
                    <input type="radio" name="isDefaultPlatformCommission" checked={formData?.isDefaultPlatformCommission} disabled={formData?.entryFeeIsDisable} className={"checkbox_field_tournament"} onChange={(e) => handleChangeCheckbox(e, true)}/>
                    <label>Default Commission </label>
                  </div>
                  <div className={"game_mode_btn_option no_radio_btn"}>
                    <input type="radio" name={"isDefaultPlatformCommission"} checked={!formData?.isDefaultPlatformCommission} disabled={formData?.entryFeeIsDisable} className={"checkbox_field_tournament"} onChange={(e) => handleChangeCheckbox(e, false)}/>
                    <label>Customize Commission</label>
                  </div>
                </div>
              </div>
              {/* <div
                className={
                  formData?.isDefaultPlatformCommission ? "formData leaderboard_field readOnly_field" : "formData leaderboard_field"}>
                <GSTDropDown name={"platformCommission"} formData={formData} setFormData={setFormData} isDisabled={formData?.isDefaultPlatformCommission}/>
                {simpleValidator.current.message("platformCommission", formData?.platformCommission, "required")}
              </div> */}
            </div>
            <div className={"user_kyc_section_filed"}>
              <div className={"text-editor-details-section"}>
                <label className={"main_label"}>Tournament Rules <span className={"validation-star"} style={{color:"red"}}>*</span></label>
                <div className={"mt_margin"}>
                  <TextEditor handleChange={handleEditor} value={releaseNote} />
                </div>
              </div>
              {simpleValidator.current.message("Tournament Rules", releaseNote?.toString(), "required")}
            </div>
            <div className={"formData_btn"}>
              <button className={"btn_default"} type={"reset"} onClick={() => handleOpenModal()}>Cancel</button>
              <FilledButton type={"submit"} value={modalValue.isEdit ? "Update" : "Save"} className={"btn loader_css"} loading={loader}/>
            </div>
          </form>
        </div>
      </div>
      <CommonModal className={"Approved-reject-section"} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen}/>
      </CommonModal>
    </Box>
  );
};
export default CreateRecurringTournament;
