import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import FilledButton from "../../../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import moment from "moment";
import CommonModal from "../../../../../hoc/CommonModal";
import PopComponent from "../../../../../hoc/PopContent";
import { DateTimePicker } from "@mui/x-date-pickers";
import TimeDropdown from "Components/Dropdown/TimeDropdown";
import PercentageDropdown from "Components/Dropdown/PercentageDropdown";
import { useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import GSTTournament from "Components/Dropdown/GSTTournament";
import {
  createTurnamentRegistration,
  getTournamentDetails,
  updateTurnamentRegistration,
} from "Redux/Tournament/action";
import { getLobbyLabelList } from "Redux/Master/action";
import TournamentLobbyType from "../TournamentLobbyType";
import CustomTable from "hoc/CommonTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "5px",
};

const AddRegistration = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        numberValue: {
          message: "Please Enter a valid whole number greater than zero.",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[1-9]\d*$/);
          },
          required: true,
        },
      },
    })
  );
  const dispatch = useDispatch();
  const [, updateState] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const forceUpdate = useCallback(() => updateState({}), []);
  const [openCale, setOpenCale] = useState({
    endDate: false,
    startDate: false,
  });
  const [formData, setFormData] = useState({
    isGST: false,
    GSTPercentage: 28,
    registrationStartDate: null,
    tournamentStartDate: null,
    tournamentEndDate: null,
    waitingTime: "",
    minimumPlayers: "",
    maximumPlayers: "",
    gameTableSeatSize: "",
    timeLimitForEachRound: "",
    minPlayers: "",
    isMultiWinner: false,
    multiWinner: 1,
    isPlatformCommission: false,
    platformCommission: 0,
    entryFee: "",
    singleWinner: 0,
    isAutoSplit: false,
    noOfPlayer: 0,
    lobbyType: "",
    lobbyTypeId: "",
    pointValue: "",
    remainingTimeBonusPoints: "",
  });
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [formValues, setFormValues] = useState([""]);
  const [rankRange, setRankRange] = useState(false);
  const [updateFees, setupdateFees] = useState("");
  const [updatemaxFees, setupdatemaxFees] = useState("");
  const [lobby, setLobby] = useState([]);
  const [showLevels, setShowLevels] = useState(false);
  const [wrongPlayer, setWrongPlayer] = useState(false);
  const [timeGrater, setTimeGrater] = useState({
    tStart: false,
    tEnd: false,
  });

  useEffect(() => {
    getLobbyTypesList();
    getAllGameDetailsTournament();
  }, []);

  const getLobbyTypesList = () => {
    setLoader(true);
    let payload = {
      limit: 10,
      start: 0,
    };
    dispatch(getLobbyLabelList(payload)).then((res) => {
      setLoader(false);
      setLobby(res?.data?.data?.docs);
    });
  };
  useEffect(() => {
    if (formData?.maximumPlayers && formData?.gameTableSeatSize) {
      const totalPlayer = formData.maximumPlayers;
      const gameTableSeatSize = formData.gameTableSeatSize;
      let ans = Number(totalPlayer);
      let totalLevel = [];
      let level = 0;

      while (ans >= 1) {
        if (!Number.isInteger(ans)) {
          setShowLevels(false);
          setWrongPlayer(true);
          setFormData({ ...formData, totalLevel: [] });
          return;
        }

        level += 1;
        totalLevel.push({
          level: level,
          tables: ans,
          players: totalPlayer,
          promoted: ans,
        });

        setWrongPlayer(false);
        ans = ans / gameTableSeatSize;
      }

      setFormData({
        ...formData,
        totalLevel: totalLevel,
      });
    }
  }, [formData?.maximumPlayers, formData?.gameTableSeatSize]);
  const columns = [
    {
      id: "level",
      label: "LEVEL",
      type: "level",
    },
    {
      id: "tables",
      label: "TABLES",
    },
    {
      id: "players",
      label: "PLAYERS ",
    },
    {
      id: "promoted",
      label: "PROMOTED",
    },
  ];

  const getAllGameDetailsTournament = () => {
    setLoader(true);
    dispatch(getTournamentDetails({ tournamentId: id })).then((res) => {
      setLoader(false);
      setDetails({
        ...details,
        gameModeName: res?.data?.data?.gameModeName,
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.isMultiWinner) {
      simpleValidator.current.fields.rankEnd = true;
      simpleValidator.current.fields.rankStart = true;
      simpleValidator.current.fields.winningPrice = true;
    }
    if (details?.gameModeName === "Points") {
      simpleValidator.current.fields.entryFee = true;
    }

    let singleWinPricePool = [
      { rankEnd: "1", winningPrice: updateFees, rankStart: "1" },
    ];
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        pricePool: formData?.isMultiWinner ? singleWinPricePool : formValues,
        singleWinner: singleWinPricePool,
        registrationStartDate: moment(formData?.registrationStartDate).format(),
        tournamentStartDate: moment(formData?.tournamentStartDate).format(),
        tournamentEndDate: moment(formData?.tournamentEndDate).format(),
        tournamentId: id,
        lobbyTypeId: formData?.lobbyTypeId,
        lobbyType: formData?.lobbyTypeId,
        isLeaderboardScoreOn: false,
        noOfPlayer: Number(formData?.maximumPlayers),
        entryFee:
          details?.gameModeName === "Points"
            ? Number(formData?.pointValue * 80)
            : Number(formData?.entryFee),
        minimumPlayers: Number(formData?.minimumPlayers),
        maximumPlayers: Number(formData?.maximumPlayers),
        gameTableSeatSize: Number(formData?.gameTableSeatSize),
        timeLimitForEachRound: Number(formData?.timeLimitForEachRound),
        minPlayers: Number(formData?.minPlayers),
        multiWinner: formData?.isMultiWinner
          ? Number(1)
          : Number(formData?.multiWinner),
        pointValue: Number(formData?.pointValue),
        remainingTimeBonusPoints: Number(formData?.remainingTimeBonusPoints),
        winningPrice:
          details?.gameModeName === "Points"
            ? formData?.isMultiWinner
              ? Number(formData?.entryFee)
              : Number(formData?.entryFee * formData?.maximumPlayers)
            : Number(formData?.entryFee * formData?.maximumPlayers),
        totalLevel: formData?.totalLevel,
      };

      if (
        formData?.multiWinner === "" ||
        formData?.multiWinner === null ||
        formData?.multiWinner === undefined
      ) {
        delete payload.pricePool;
      }
      if (!formData?.isPlatformCommission) {
        delete payload.platformCommission;
      }
      if (!formData?.isGST) {
        delete payload.GSTPercentage;
      }

      setLoader(true);
      dispatch(createTurnamentRegistration(payload)).then((res) => {
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
  const handleChange = (e, value) => {
    if (value === true || value === false) {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (formData?.isMultiWinner) {
      simpleValidator.current.fields.rankEnd = true;
      simpleValidator.current.fields.rankStart = true;
      simpleValidator.current.fields.winningPrice = true;
    }
    if (details?.gameModeName === "Points") {
      simpleValidator.current.fields.entryFee = true;
    }
    let singleWinPricePool = [
      { rankEnd: "1", winningPrice: updateFees, rankStart: "1" },
    ];
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        pricePool: formData?.isMultiWinner ? singleWinPricePool : formValues,
        registrationStartDate: moment(formData?.registrationStartDate).format(),
        tournamentStartDate: moment(formData?.tournamentStartDate).format(),
        tournamentEndDate: moment(formData?.tournamentEndDate).format(),
        tournamentRegistrationId: modalValue?.row?._id,
        tournamentId: modalValue?.row?.tournamentId?._id,
        winningPrice:
          details?.gameModeName === "Points"
            ? formData?.isMultiWinner
              ? Number(formData?.entryFee)
              : Number(formData?.entryFee * formData?.maximumPlayers)
            : Number(formData?.entryFee * formData?.maximumPlayers),
        isLeaderboardScoreOn: false,
        noOfPlayer: Number(formData?.maximumPlayers),
        lobbyType: formData?.lobbyTypeId,
        entryFee:
          details?.gameModeName === "Points"
            ? Number(formData?.pointValue * 80)
            : Number(formData?.entryFee),
        remainingTimeBonusPoints: Number(formData?.remainingTimeBonusPoints),
        multiWinner: formData?.isMultiWinner
          ? Number(1)
          : Number(formData?.multiWinner),
      };
      if (
        formData?.multiWinner === "" ||
        formData?.multiWinner === null ||
        formData?.multiWinner === undefined
      ) {
        delete payload.pricePool;
      }
      if (!formData?.isPlatformCommission) {
        delete payload.platformCommission;
      }
      if (!formData?.isGST) {
        delete payload.GSTPercentage;
      }
      setLoader(true);
      dispatch(updateTurnamentRegistration(payload)).then((res) => {
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

  const handleDatePicker = (newValue, type) => {
    if (type === "tournamentStartDate") {
      let sDate = new Date(formData?.registrationStartDate);
      let eDate = new Date(newValue);

      if (sDate.getTime() < eDate.getTime()) {
        setTimeGrater({ ...timeGrater, tStart: false });
        setFormData({ ...formData, [type]: newValue });
      } else {
        setTimeGrater({ ...timeGrater, tStart: true });
        setFormData({ ...formData, tournamentStartDate: newValue });
      }
    } else if (type === "tournamentEndDate") {
      let sDate = new Date(formData?.tournamentStartDate);
      let eDate = new Date(newValue);

      if (sDate.getTime() < eDate.getTime()) {
        setTimeGrater({ ...timeGrater, tEnd: false });
        setFormData({ ...formData, [type]: newValue });
      } else {
        setTimeGrater({ ...timeGrater, tEnd: true });
        setFormData({ ...formData, tournamentEndDate: newValue });
      }
    } else {
      setFormData({ ...formData, [type]: newValue });
    }

    setOpenCale({ ...openCale, [type]: false });
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
    setFormData({
      ...formData,
      tournamentStartDate: null,
      tournamentEndDate: null,
    });
  }, [formData.registrationStartDate]);

  useEffect(() => {
    if (modalValue?.isEdit) {
      const { row } = modalValue;
      setFormData({
        ...formData,
      });
    }
  }, [modalValue]);

  const addFormFields = (type, index) => {
    if (type === "add") {
      setFormValues([...formValues, ""]);
    } else {
      let temp = [...formValues];
      temp.splice(index, 1);
      setFormValues(temp);
    }
  };

  const handleChangeRange = (e, index, type) => {
    const { value, name } = e.target;
    let Price = 0;

    if (name === "winningPrice") {
      Price = Number(
        (formValues[index]?.rankEnd - formValues[index]?.rankStart + 1) * value
      );
    }

    formValues?.map((item, i) => {
      return i !== index
        ? (Price += Number((item?.rankEnd - item?.rankStart + 1) * item?.price))
        : "";
    });

    formValues?.map((item, i) => {
      return i !== index
        ? (Price += Number(
            (item?.rankEnd - item?.rankStart + 1) * item?.winningPrice
          ))
        : "";
    });

    if (Number(value) > Number(formData?.multiWinner) && name === "rankEnd") {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Rank not greater than Total Winners",
      });
    } else if (name === "winningPrice" && Price > Number(updateFees)) {
      handleOpenErrorModal("CommonPop", {
        header: "Error",
        body: "Price cannot be greater than the Winning Price",
      });
    } else if (
      Number(value) >= Number(formData?.multiWinner) &&
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
        [name]: value,
      };
      setFormValues(temp);
    }
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

  useEffect(() => {
    if (!formData) return; // Ensure formData is defined
    const {
      entryFee,
      minimumPlayers,
      isGST,
      isPlatformCommission,
      GSTPercentage,
      platformCommission,
      maximumPlayers,
    } = formData;

    let fees =
      details?.gameModeName === "Points"
        ? formData?.pointValue * 80
        : entryFee * minimumPlayers;
    let maxFees =
      details?.gameModeName === "Points"
        ? formData?.pointValue * 80
        : entryFee * maximumPlayers;

    if (isGST) {
      fees -= (entryFee * minimumPlayers * GSTPercentage) / 100;
      maxFees -= (entryFee * maximumPlayers * GSTPercentage) / 100;
    }

    if (isPlatformCommission) {
      fees -= (entryFee * minimumPlayers * platformCommission) / 100;
      maxFees -= (entryFee * maximumPlayers * platformCommission) / 100;
    }
    setupdateFees(Math.round(fees));
    setupdatemaxFees(Math.round(maxFees));
  }, [formData]);

  useEffect(() => {
    if (modalValue?.isEdit) {
      const { row } = modalValue;
      setFormValues(row?.pricePool);
      const selectedOption = lobby.find((item) => item._id === row?.lobbyType);
      setFormData({
        ...formData,
        registrationStartDate: row?.registrationStartDate,
        timeLimitForEachRound: row?.timeLimitForEachRound,
        tournamentStartDate: row?.tournamentStartDate,
        tournamentEndDate: row?.tournamentEndDate,
        waitingTime: row?.waitingTime,
        maximumPlayers: row?.maximumPlayers,
        minimumPlayers: row?.minimumPlayers,
        gameTableSeatSize: row?.gameTableSeatSize,
        entryFee: row?.entryFee,
        multiWinner: row?.multiWinner,
        lobbyType: selectedOption?.lobbyType,
        lobbyTypeId: selectedOption?._id,
        isGST: row?.isGST,
        isAutoSplit: row?.isAutoSplit,
        GSTPercentage: row?.GSTPercentage,
        isPlatformCommission: row?.isPlatformCommission,
        platformCommission: row?.platformCommission,
        isMultiWinner: row?.isMultiWinner,
        pointValue: row?.pointValue,
        remainingTimeBonusPoints: row?.remainingTimeBonusPoints,
      });
    }
  }, [modalValue?.isEdit, lobby]);

  return (
    <Box sx={style}>
      <div
        className={
          "create_headToHead_modal modal_main_popup notification_popup  add_admin_user_popup"
        }
      >
        <div className={"add_admin_user_popup_title modal_popup_title"}>
          <h2>
            {modalValue?.isEdit
              ? `Update Tournament Registration`
              : `Create Tournament Registration`}
          </h2>
        </div>
        <div className={"add_admin_user_popup_content coupon_section_form "}>
          <form
            method={"POST"}
            onSubmit={
              modalValue?.isEdit
                ? (e) => handleEditSubmit(e)
                : (e) => handleSubmit(e)
            }
          >
            <div className={"date-picker_coupon"} style={{ gap: "20px" }}>
              <div className={"start-date-picker"}>
                <label>
                  Registration Start Date{" "}
                  <span className={"validation-star"}>*</span>
                </label>
                <div className={"date_picker_value"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      name="start-date"
                      renderInput={(props) => <TextField {...props} />}
                      className={"datePicker_details"}
                      value={formData?.registrationStartDate}
                      minDate={new Date()}
                      onChange={(newValue) =>
                        handleDatePicker(newValue, "registrationStartDate")
                      }
                      inputProps={{
                        readOnly: true,
                        placeholder: "Select Registration Start Date",
                      }}
                    />
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message(
                  "registrationStartDate",
                  formData?.registrationStartDate,
                  "required"
                )}
              </div>
              <div className={"start-date-picker entryFee-section-inner"}>
                <label>
                  Tournament Start Date
                  <span className={"validation-star"}>*</span>
                  <Tooltip
                    title={
                      <>
                        Choose tournament start date and time greater than
                        registration start date.
                      </>
                    }
                    id={"winAmount-toolTip"}
                    placement={"bottom-start"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#1976d2"
                      height="100%"
                      width="100%"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Tooltip>
                </label>
                <div className={"date_picker_value"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      name="start-date"
                      renderInput={(props) => <TextField {...props} />}
                      className={"datePicker_details"}
                      value={formData?.tournamentStartDate}
                      minDate={
                        formData?.registrationStartDate
                          ? formData?.registrationStartDate
                          : new Date()
                      }
                      onChange={(newValue) =>
                        handleDatePicker(newValue, "tournamentStartDate")
                      }
                      inputProps={{
                        readOnly: true,
                        placeholder: "Select Tournament Start Date",
                      }}
                    />
                  </LocalizationProvider>
                </div>
                {simpleValidator.current.message(
                  "tournamentStartDate",
                  formData?.tournamentStartDate,
                  "required"
                )}

                {formData?.tournamentStartDate && timeGrater.tStart && (
                  <span className={"srv-validation-message"}>
                    Tournament start date should be greater than registration
                    start date.
                  </span>
                )}
              </div>
            </div>
            <div className="tournament_second_row">
              <div className={"date-picker_coupon"} style={{ width: "100%" }}>
                <div className={"start-date-picker entryFee-section-inner"}>
                  <label>
                    Tournament End Date{" "}
                    <span className={"validation-star"}>*</span>
                    <Tooltip
                      title={
                        <>
                          Choose Tournament End date and time greater than
                          registration start date and tournament start date.
                        </>
                      }
                      id={"winAmount-toolTip"}
                      placement={"bottom-start"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#1976d2"
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </label>
                  <div className={"date_picker_value"}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        name="start-date"
                        renderInput={(props) => <TextField {...props} />}
                        className={"datePicker_details"}
                        value={formData?.tournamentEndDate}
                        minDate={
                          formData?.tournamentStartDate
                            ? formData?.tournamentStartDate
                            : new Date()
                        }
                        onChange={(newValue) =>
                          handleDatePicker(newValue, "tournamentEndDate")
                        }
                        inputProps={{
                          readOnly: true,
                          placeholder: "Select Tournament End Date",
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  {simpleValidator.current.message(
                    "tournamentEndDate",
                    formData?.tournamentEndDate,
                    "required"
                  )}
                  {formData?.tournamentEndDate && timeGrater.tEnd && (
                    <span className={"srv-validation-message"}>
                      Tournament end date should be greater than registration
                      start date and tournament start date
                    </span>
                  )}
                </div>
              </div>
              <div
                className={"level_popup_form_field"}
                style={{ width: "100%" }}
              >
                <div className={"w_100"}>
                  <div className={"user_kyc_section"}>
                    <div className={"user_kyc_section_filed"}>
                      <label>
                        Waiting time (Min){" "}
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"user_kyc_section_input_filed"}
                        style={{ marginTop: "7px" }}
                      >
                        <TimeDropdown
                          name={"waitingTime"}
                          formData={formData}
                          setFormData={setFormData}
                          placeholder={"Select Waiting time"}
                        />
                      </div>
                      {simpleValidator.current.message(
                        "waitingTime",
                        formData?.waitingTime,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tournament_threed_row">
              <div className="formData w_100 ">
                <label>
                  Minimum players <span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                    type="text"
                    value={formData?.minimumPlayers}
                    placeholder={"Enter Minimum players"}
                    name="minimumPlayers"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "minimumPlayers",
                  formData?.minimumPlayers?.toString(),
                  "required|min:0|max:10|numeric|numberValue"
                )}
              </div>
              <div className="formData w_100 ">
                <label>
                  Maximum players <span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                    onWheel={(event) => event.currentTarget.blur()}
                    type="text"
                    value={formData?.maximumPlayers}
                    placeholder={"Enter Maximum players"}
                    name="maximumPlayers"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "maximumPlayers",
                  formData?.maximumPlayers?.toString(),
                  "required|min:0|max:10|numeric|numberValue"
                )}
              </div>
            </div>
            <div className="tournament_fourth_row">
              <div className="w_100 entryFee-section-inner">
                <label>
                  Game table seat size
                  <span className={"validation-star"}>*</span>
                  <Tooltip
                    title={
                      <>Enter game table seat size less than or equal to 6</>
                    }
                    id={"winAmount-toolTip"}
                    placement={"bottom-start"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#1976d2"
                      height="100%"
                      width="100%"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Tooltip>
                </label>
                <div className="emailWrap">
                  <input
                    type="text"
                    value={formData?.gameTableSeatSize}
                    placeholder={"Enter Game table seat size"}
                    name="gameTableSeatSize"
                    onChange={(e) => {
                      const inputValue = parseInt(e.target.value, 10);
                      if (inputValue <= 6 || e.target.value === "") {
                        handleChange(e);
                      }
                    }}
                    step="1"
                  />
                </div>
                {simpleValidator.current.message(
                  "gameTableSeatSize", 
                  formData?.gameTableSeatSize,
                  "required|numeric|numberValue"
                )}
              </div>
              <div className={"level_popup_form_field w_100 "}>
                <div className={"w_100"}>
                  <div className={"user_kyc_section"}>
                    <div className={"user_kyc_section_filed"}>
                      <label>
                        Time limit for each round (Min){" "}
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div
                        className={"user_kyc_section_input_filed"}
                        style={{ marginTop: "7px" }}
                      >
                        <TimeDropdown
                          name={"timeLimitForEachRound"}
                          formData={formData}
                          setFormData={setFormData}
                          placeholder={"Select Time limit for each round"}
                        />
                      </div>
                      {simpleValidator.current.message(
                        "timeLimitForEachRound",
                        formData?.timeLimitForEachRound,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="formData w_100 ">
              <label>
                Remaining Time Bonus Points{" "}
                <span className={"validation-star"}>*</span>
              </label>
              <div className="emailWrap">
                <input
                  onWheel={(event) => event.currentTarget.blur()}
                  type="text"
                  value={formData?.remainingTimeBonusPoints}
                  placeholder={"Enter Remaining Time Bonus Points"}
                  name="remainingTimeBonusPoints"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {simpleValidator.current.message(
                "remainingTimeBonusPoints",
                formData?.remainingTimeBonusPoints?.toString(),
                "required|min:0|max:10|numeric|numberValue"
              )}
            </div>
            <div className={"user_kyc_section"}>
              <div className={"user_kyc_section_filed"}>
                <label>
                  Lobby Type <span className={"validation-star"}>*</span>
                </label>
                <div className={"formData mt_margin mb_1  "}>
                  <TournamentLobbyType
                    placeholder={"Select Lobby Type"}
                    options={lobby?.map((element) => element?.lobbyType)}
                    name={"lobbyType"}
                    setFormData={setFormData}
                    formData={formData}
                    isLiveGame={true}
                    onSelectChange={(selectedLobbyType) => {
                      const selectedOption = lobby.find(
                        (item) => item.lobbyType === selectedLobbyType
                      );
                      const selectedId = selectedOption?._id;
                      setFormData({
                        ...formData,
                        lobbyTypeId: selectedId,
                        lobbyType: selectedOption?.lobbyType,
                      });
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "lobbyType",
                  formData?.lobbyType,
                  "required"
                )}
              </div>
            </div>
            {details?.gameModeName !== "Points" && (
              <div className="tournament_five_row">
                <div className={"entryFee-section-inner w_100"}>
                  <label>
                    Entry Fee <span className={"validation-star"}>*</span>
                  </label>
                  <div className={"emailWrap"}>
                    <input
                      style={{ marginBottom: "0px" }}
                      type={"number"}
                      name={"entryFee"}
                      value={formData?.entryFee}
                      placeholder={"Enter Entry Fee"}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "entryFee",
                    formData.entryFee?.toString(),
                    "required|min:0|max:10|numeric"
                  )}
                </div>
              </div>
            )}

            {details?.gameModeName === "Points" && (
              <div className="tournament_five_row">
                <div className={"entryFee-section-inner w_100"}>
                  <label>
                    Point Value <span className={"validation-star"}>*</span>
                  </label>
                  <div className={"emailWrap"}>
                    <input
                      style={{ marginBottom: "0px" }}
                      type={"number"}
                      name={"pointValue"}
                      value={formData?.pointValue}
                      placeholder={"Enter point value"}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "pointValue",
                    formData.pointValue?.toString(),
                    "required|min:0|max:10|numeric"
                  )}
                </div>
                <div className={"entryFee-section-inner dialed-class w_100"}>
                  <label>
                    {" "}
                    Minimum Entry Fee
                    <Tooltip
                      title={<>[Points Value * 80]</>}
                      id={"winAmount-toolTip"}
                      placement={"bottom-start"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#1976d2"
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </label>
                  <div className={"emailWrap readOnly_field"}>
                    <input
                      onWheel={(event) => event.currentTarget.blur()}
                      value={formData?.pointValue * 80 || 0}
                      readOnly={true}
                      placeholder={"Enter Entry Fee"}
                      name={"entryFee"}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={"d_flex w_100  formData "}>
              <div className="w_100 form_amount_tab01 number_of_player readOnly_field">
                <label>
                  Number Of Players<span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                    disabled
                    type="text"
                    name="gameTableSeatSize"
                    maxLength={10}
                    value={formData?.gameTableSeatSize}
                    placeholder={"Total Players"}
                    className={"w_100"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "noOfPlayer",
                  formData?.noOfPlayer,
                  "required"
                )}
              </div>
              <div className="form_amount_tab02  tab02_inner_class w_100 readOnly_field ">
                <label>
                  Total Players<span className={"validation-star"}>*</span>
                </label>
                <div className="emailWrap">
                  <input
                    disabled
                    type="text"
                    name="maximumPlayers"
                    maxLength={10}
                    value={formData?.maximumPlayers}
                    placeholder={"Total Players"}
                    className={"w_100"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {simpleValidator.current.message(
                  "totalPlayers",
                  formData?.maximumPlayers,
                  "required|maximumPlayers"
                )}
                {wrongPlayer && (
                  <div className={"srv-validation-message"}>
                    Please Enter right Total Player
                  </div>
                )}
              </div>
              <div
                className={
                  "w_100 form_amount_tab02 form_amount_tab01 mt_2 tab02_inner_class"
                }
              >
                <div
                  className={"btn p_14"}
                  onClick={() => {
                    if (
                      formData?.gameTableSeatSize &&
                      formData?.maximumPlayers
                    ) {
                      if (formData?.minimumPlayers?.length <= 0) {
                        setShowLevels(false);
                        handleOpenErrorModal("CommonPop", {
                          header: "Info",
                          body: "Please add right Total Player.",
                        });
                      } else {
                        setShowLevels(true);
                      }
                    } else {
                      setShowLevels(false);
                      handleOpenErrorModal("CommonPop", {
                        header: "Info",
                        body: "Please Add maximum number and Game table seat size before show Levels.",
                      });
                    }
                  }}
                >
                  Show Levels
                </div>
              </div>
            </div>
            {showLevels && formData?.totalLevel?.length > 0 && (
              <div className="table">
                <CustomTable
                  headCells={columns}
                  rowData={formData?.totalLevel}
                  totalDocs={formData?.totalLevel?.length}
                  isWinnerTitle={true}
                />
              </div>
            )}
            <div
              className={"common_checkbox_details real_money_field"}
              style={{ marginTop: "10px" }}
            >
              <label>Is Auto Split?</label>
              <div className="multiple_winner">
                <div className={"game_mode_btn"}>
                  <div className={"game_mode_btn_option yes_radio_btn"}>
                    <input
                      type="radio"
                      name="isAutoSplit"
                      checked={formData?.isAutoSplit}
                      className={"checkbox_field_tournament"}
                      onChange={(e) => handleChange(e, true)}
                    />
                    <label>Yes</label>
                  </div>
                  <div className={"game_mode_btn_option no_radio_btn"}>
                    <input
                      type="radio"
                      name={"isAutoSplit"}
                      checked={!formData?.isAutoSplit}
                      className={"checkbox_field_tournament"}
                      onChange={(e) => handleChange(e, false)}
                    />
                    <label>No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="tournament_six_row">
              <div className={"platform-gst-details"}>
                <div className={"common_checkbox_details real_money_field"}>
                  <label>GST (%)</label>
                  <div className={"game_mode_btn"}>
                    <div className={"game_mode_btn_option yes_radio_btn"}>
                      <input
                        type="radio"
                        name={"isGST"}
                        checked={!formData?.isGST}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, false)}
                      />
                      <label>No</label>
                    </div>
                    <div className={"game_mode_btn_option no_radio_btn"}>
                      <input
                        type="radio"
                        name={"isGST"}
                        checked={formData?.isGST}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, true)}
                      />
                      <label>Yes</label>
                    </div>
                  </div>
                </div>
                {formData?.isGST && (
                  <div
                    className="readOnly_field w_100"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="emailWrap">
                      <GSTTournament
                        name={"GSTPercentage"}
                        formData={formData}
                        setFormData={setFormData}
                        placeholder={"Select GST Percentage"}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={"platform-gst-details"}>
                <div
                  className={"common_checkbox_details real_money_field"}
                  style={{ width: "60%" }}
                >
                  <label>Platform Commission (%)</label>
                  <div className={"game_mode_btn"}>
                    <div className={"game_mode_btn_option yes_radio_btn"}>
                      <input
                        type="radio"
                        name="isPlatformCommission"
                        checked={!formData?.isPlatformCommission}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, false)}
                      />
                      <label>No</label>
                    </div>
                    <div className={"game_mode_btn_option no_radio_btn"}>
                      <input
                        type="radio"
                        name={"isPlatformCommission"}
                        checked={formData?.isPlatformCommission}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, true, "isDefault")}
                      />
                      <label>Yes</label>
                    </div>
                  </div>
                </div>
                {formData?.isPlatformCommission && (
                  <div className={"formData leaderboard_field"}>
                    {/* <PlatformCommissionDropdown name={'platformCommission'} formData={formData} setFormData={setFormData} isDisabled={formData?.isDefaultPlatformCommission}/> */}
                    <PercentageDropdown
                      name={"platformCommission"}
                      formData={formData}
                      setFormData={setFormData}
                      isDisabled={!formData?.isPlatformCommission}
                      placeholder={"Select Platform Commission"}
                      style={{ marginRight: "0px", width: "100%" }}
                    />
                    {/* {simpleValidator.current.message(
                      "platformCommission",
                      formData?.platformCommission,
                      "required"
                    )} */}
                  </div>
                )}
              </div>
              <div className="tournament_threed_row">
                <div className="formData w_100 readOnly_field">
                  <label>
                    Minimum Amount
                    <Tooltip
                      title={`Minimum players * Entry Fee ${
                        formData?.isGST ? `- GST` : ""
                      } ${
                        formData?.isPlatformCommission
                          ? `- Platform Commission`
                          : ""
                      }`}
                      id={"winAmount-toolTip"}
                      placement={"bottom-start"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#1976d2"
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </label>
                  <div className="emailWrap">
                    <input
                      disabled
                      type="number"
                      value={updateFees || 0}
                      name="minimumPlayers"
                    />
                  </div>
                </div>
                <div className="formData w_100 readOnly_field">
                  <label>
                    Maximum Amount
                    <Tooltip
                      title={`Maximum players * Entry Fee ${
                        formData?.isGST ? `- GST` : ""
                      } ${
                        formData?.isPlatformCommission
                          ? `- Platform Commission`
                          : ""
                      }`}
                      id={"winAmount-toolTip"}
                      placement={"bottom-start"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#1976d2"
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </label>
                  <div className="emailWrap">
                    <input
                      disabled
                      onWheel={(event) => event.currentTarget.blur()}
                      type="number"
                      value={updatemaxFees || 0}
                      name="maximumPlayers"
                    />
                  </div>
                </div>
              </div>
              <div
                className={"common_checkbox_details real_money_field"}
                style={{ marginTop: "0" }}
              >
                <label>Is Multiple Winner ?</label>
                <div className="multiple_winner">
                  <div className={"game_mode_btn"}>
                    <div className={"game_mode_btn_option yes_radio_btn"}>
                      <input
                        type="radio"
                        name="isMultiWinner"
                        checked={formData?.isMultiWinner}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, true)}
                      />
                      <label>Single Winner</label>
                    </div>
                    <div className={"game_mode_btn_option no_radio_btn"}>
                      <input
                        type="radio"
                        name={"isMultiWinner"}
                        checked={!formData?.isMultiWinner}
                        className={"checkbox_field_tournament"}
                        onChange={(e) => handleChange(e, false)}
                      />
                      <label>Multiple Winner</label>
                    </div>
                  </div>
                </div>
                {formData?.isMultiWinner === false && (
                  <div className="multiple_winner_row">
                    <div className="tab02_inner_class" style={{ width: "50%" }}>
                      <label>
                        Total Winners
                        <span className={"validation-star"}>*</span>
                      </label>
                      <div className="emailWrap">
                        <input
                          type="text"
                          value={formData?.multiWinner}
                          name="multiWinner"
                          placeholder={"Total Winners"}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      {simpleValidator.current.message(
                        "totalWinners",
                        formData?.multiWinner,
                        "required"
                      )}
                    </div>
                    <div className="tab02_inner_class" style={{ width: "50%" }}>
                      <label>Wining Price</label>
                      <div className="emailWrap readOnly_field">
                        <input
                          disabled
                          style={{ marginBottom: "0px" }}
                          type={"number"}
                          name={"singleWinner"}
                          value={updateFees}
                          onChange={(e) => setupdateFees(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {formData?.isMultiWinner ? (
                  <div className="readOnly_field">
                    <input
                      disabled
                      style={{ marginBottom: "0px" }}
                      type={"number"}
                      name={"singleWinner"}
                      value={updateFees}
                      onChange={(e) => setupdateFees(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    {formValues.map((element, index) => {
                      return (
                        <div className="form_tabledata formData">
                          <div className="Start mr_margin">
                            <label>
                              Rank Start
                              <span className={"validation-star"}>*</span>
                            </label>
                            <input
                              disabled={!formData.multiWinner}
                              value={
                                element.rankStart <= formData.multiWinner
                                  ? element.rankStart
                                  : ""
                              }
                              type={"text"}
                              placeholder={"Enter Rank Start"}
                              name={"rankStart"}
                              onChange={(e) => handleChangeRange(e, index)}
                            />
                            {simpleValidator.current.message(
                              "rankStart",
                              element?.rankStart,
                              "required"
                            )}
                          </div>
                          <div className="Start mr_margin">
                            <label>
                              Rank End
                              <span className={"validation-star"}>*</span>
                            </label>
                            <input
                              disabled={!formData.multiWinner}
                              value={
                                element.rankEnd <= formData.multiWinner
                                  ? element.rankEnd
                                  : ""
                              }
                              type={"text"}
                              placeholder={"Enter Rank End"}
                              name={"rankEnd"}
                              onChange={(e) =>
                                handleChangeRange(e, index, "rankEnd")
                              }
                            />
                            {simpleValidator.current.message(
                              "rankEnd",
                              element?.rankEnd,
                              "required"
                            )}
                          </div>
                          <div className="Start">
                            <label>
                              Price<span className={"validation-star"}>*</span>
                            </label>
                            <input
                              disabled={!formData.multiWinner}
                              value={element.winningPrice}
                              type={"text"}
                              placeholder={"Enter Price"}
                              name={"winningPrice"}
                              onChange={(e) => handleChangeRange(e, index)}
                            />
                            {simpleValidator.current.message(
                              "winningPrice",
                              element?.winningPrice,
                              "required"
                            )}
                          </div>
                          {formValues?.length - 1 === index ? (
                            <>
                              {formValues?.length !== 1 && (
                                <span
                                  className="cursor_pointer  remove_field"
                                  onClick={() => addFormFields("remove", index)}
                                >
                                  -
                                </span>
                              )}
                              {!rankRange && formData?.multiWinner && (
                                <span
                                  className="cursor_pointer  add_field "
                                  onClick={() => addFormFields("add")}
                                >
                                  +
                                </span>
                              )}
                            </>
                          ) : (
                            formValues?.length !== 1 && (
                              <span
                                className="cursor_pointer remove_field"
                                onClick={() => addFormFields("remove", index)}
                              >
                                -
                              </span>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
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
export default AddRegistration;
