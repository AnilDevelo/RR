import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PopComponent from "../../../../../../hoc/PopContent";
import SimpleReactValidator from "simple-react-validator";
import CommonModal from "../../../../../../hoc/CommonModal";
import Box from "@material-ui/core/Box";
import LobbyType from "../CreateLobby/LobbyType";
import LobbyGameMode from "../CreateLobby/LobbyGameMode";
import LobbyLeaderboard from "../CreateLobby/LobbyLeaderboard";
import DummyAndUserBotOption from "../CreateLobby/DummyAndUserBotOption";
import PokerEntryFee from "../CreateLobby/PokerEntryFee";
import RummyEntryFee from "../CreateLobby/RummyEntryFee";
import LobbyEnterFee from "../CreateLobby/LobbyEnterFee";
import MultipleWinner from "../CreateLobby/MultipleWinner";
import FilledButton from "../../../../../../Components/FileButton";
import { updateGameLobby } from "../../../../../../Redux/games/action";
import PlatformGST from "../CreateLobby/PlatformGST";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "5px",
};

const UpdateLobby = ({ modalValue, handleOpenModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const gameDetails = useSelector((state) => state?.gameReducer?.gameDetails);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [lobbyProps, setLobbyProps] = useState({
    defaultNumberOfPlayer: gameDetails?.numberOfPlayer
      ?.filter((item) => item?.isDefault)
      ?.reduce((acc, cur) => {
        return { ...cur };
      }, {}),
    isReadOnlyEntryFee: false,
    totalEntryFee: 0,
    lobbyTypeString: "",
    numberOfPlayer: gameDetails?.numberOfPlayer?.map(
      (item) => item?.numberOfPlayer
    ),
    maxEntryFeeError: false,
  });
  const [formData, setFormData] = useState({
    tournamentName: "",
    description: "",
    lobbyType: "",
    maxPlayer: "",
    minPlayer: "",
    isGameModeOption: true,
    gameModeId: "",
    noOfPlayer: "",
    noOfDecks: "",
    isLeaderboardScoreOn: false,
    leaderboardScores: [],
    isDummyPlayer: false,
    dummyPlayerStartPoint: "",
    isUseBot: false,
    entryfee: "",
    winningPrice: 0,
    isGST: false,
    isDefaultGST: true,
    GSTAmount: "",
    GSTPercentage: gameDetails?.gameConfig?.gameConfig?.DEFAULT_GST_PERCENTAGE,
    isMultiWinner: false,
    multiWinner: "",
    pricePool: [],
    isDefaultPlatformCommission: true,
    minEntryFee: "",
    maxEntryFee: "",
    stakesAmount: "",
    pointValue: "",
    platformCommission:
      gameDetails?.gameConfig?.gameConfig?.PLATFORM_COMMISSION,
    isAutoSplit: false,
    subMode: '',
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        minPlayer: {
          message:
            "Please Enter Minimum Players For Start Playing Less Than OR equal game number of player.",
          rule: (val, params, validator) => {
            let numberOfPlayer = localStorage.getItem("noOfPlayer");
            return +val <= +numberOfPlayer;
          },
          required: true,
        },
      },
    })
  );
  let gameModeName = gameDetails?.gameModes?.filter(
    (ele) => ele._id === formData?.gameModeId
  )?.[0]?.gameModeName;

  const handleChange = (e, type, nameType) => {
    const { name, value } = e.target;
    if (type === true || type === false) {
      if (name === "isMultiWinner") {
        setFormData({
          ...formData,
          [name]: type,
          multiWinner: "",
          pricePool: [],
        });
      } else if (name === "isLeaderboardScoreOn") {
        setFormData({
          ...formData,
          [name]: type,
          leaderboardScores:
            formData?.leaderboardScores?.length > 0
              ? formData?.leaderboardScores
              : Array.from(Array(formData?.noOfPlayer)).fill(""),
        });
      } else if (nameType === "isDefault") {
        setFormData({
          ...formData,
          [name]: type,
          platformCommission:
            gameDetails?.gameConfig?.gameConfig?.PLATFORM_COMMISSION,
        });
      } else {
        setFormData({ ...formData, [name]: type });
      }
    } else {
      setFormData({ ...formData, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameModeName === "Points") {
      simpleValidator.current.fields.entryFee = true;
    }
    if (gameModeName !== "Points") {
      simpleValidator.current.fields.pointValue = true;
    }
    if (gameModeName === "Poker") {
      simpleValidator.current.fields.entryFee = true;
    }
    if (gameModeName !== "Poker") {
      simpleValidator.current.fields.minEntryFee = true;
      simpleValidator.current.fields.maxEntryFee = true;
      simpleValidator.current.fields.stakesAmount = true;
    }
    if (!formData?.isLeaderboardScoreOn) {
      simpleValidator.current.fields.leaderboardScore = true;
    }
    if (!formData?.isDummyPlayer) {
      simpleValidator.current.fields.dummyPlayerStartPoint = true;
    }
    if (!formData?.isMultiWinner) {
      simpleValidator.current.fields.winnerPrize = true;
    }
    if (!formData?.isMultipleDeck) {
      simpleValidator.current.fields.noOfDecks = true;
    }
    if(gameModeName !== 'Deals'){
      simpleValidator.current.fields.dealsSubMode = true
  }
    if (simpleValidator.current.allValid() && !lobbyProps?.maxEntryFeeError) {
      let payload = {
        ...formData,
        gameId: gameDetails?._id,
        headToHeadId: modalValue?.data?._id,
        publisherId: gameDetails?.publisherId?._id,
        entryfee: Number(formData?.isGST ? lobbyProps?.totalEntryFee : formData?.entryfee),
        maxPlayer: formData?.noOfPlayer,
        minPlayer: formData?.minPlayer,
        leaderboardScores: formData?.leaderboardScores?.map((item) =>
          Number(item)
        ),
        dummyPlayerStartPoint: Number(formData?.dummyPlayerStartPoint),
        noOfDecks:formData?.noOfDecks
      };
      if (!formData?.isDummyPlayer) {
        delete payload?.dummyPlayerStartPoint;
      }
      if (!payload?.isGameModeOption) {
        delete payload?.gameModeOptions;
      }
      if (gameModeName === "Points" || !payload?.isLeaderboardScoreOn) {
        delete payload?.leaderboardScores;
      }
      if (gameModeName !== "Points") {
        delete payload?.pointValue;
      }
      if (!payload?.isMultiWinner) {
        payload = {
          ...payload,
          multiWinner: 1,
          pricePool: [{ rank: 1, winningPrice: payload?.winningPrice }],
        };
      }
      setLoader(true);
      dispatch(updateGameLobby(payload)).then((res) => {
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
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const handleChangeCheckbox = (e, type) => {
    setFormData({
      ...formData,
      [e.target.name]: type,
    });
  };
  useEffect(() => {
    const { data } = modalValue;
    let GSTAmount = data?.entryfee - +data?.entryfee * (100 / (100 + +data?.GSTPercentage));
    let netPrice = data?.entryfee - GSTAmount;
    setFormData({
      ...formData,
      tournamentName: data?.tournamentName,
      description: data?.description,
      lobbyType: data?.lobbyType?._id,
      maxPlayer: data?.maxPlayer,
      minPlayer: data?.minPlayer,
      isGameModeOption: data?.isGameModeOption,
      gameModeId: data?.gameModeId?._id,
      noOfPlayer: data?.noOfPlayer,
      noOfDecks: data?.noOfDecks,
      isLeaderboardScoreOn: data?.isLeaderboardScoreOn || false,
      leaderboardScores: data?.leaderboardScores,
      isDummyPlayer: data?.isDummyPlayer || false,
      dummyPlayerStartPoint: data?.dummyPlayerStartPoint,
      isUseBot: data?.isUseBot || false,
      entryfee: data?.isGST ? Math.round(netPrice) : data?.entryfee,
      winningPrice: data?.winningPrice,
      isGST: data?.isGST || false,
      isDefaultGST: true,
      GSTAmount: data?.GSTAmount,
      GSTPercentage: data?.GSTPercentage,
      isMultiWinner: data?.isMultiWinner || false,
      multiWinner: data?.multiWinner,
      pricePool: data?.pricePool,
      isDefaultPlatformCommission:data?.isDefaultPlatformCommission,
      minEntryFee: data?.minEntryFee,
      maxEntryFee: data?.maxEntryFee,
      stakesAmount: data?.stakesAmount,
      platformCommission: data?.platformCommission,
      pointValue: data?.pointValue || 0,
      leaderboardPoints: data?.leaderboardPoints,
      isAutoSplit: data?.isAutoSplit || false,
      subMode: data?.subMode,
    });
    localStorage.setItem("noOfPlayer", data?.noOfPlayer);
    let temp = gameDetails?.lobbyType?.reduce((acc, cur) => {
      return cur?._id === data?.lobbyType
        ? { ...acc, lobbyType: cur?.lobbyType }
        : acc;
    }, {});

    setLobbyProps({
      ...lobbyProps,
      totalEntryFee: data?.totalEntryFee,
      isReadOnlyEntryFee: temp?.lobbyType
        ?.toLowerCase()
        ?.includes("PRACTICE"?.toLowerCase()),
      numberOfPlayer:
        temp?.lobbyType === "PRACTICE BATTLE" || temp?.lobbyType === "BATTLE"
          ? [2]
          : temp?.lobbyType === "PRACTICE CONTEST" ||
            temp?.lobbyType === "CONTEST"
          ? gameDetails?.numberOfPlayer
              ?.filter((item) => item.numberOfPlayer !== 2)
              ?.map((item) => item?.numberOfPlayer)
          : gameDetails?.numberOfPlayer?.map((item) => item?.numberOfPlayer),
      lobbyTypeString: temp?.lobbyType,
    });
  }, [modalValue?.isEdit]);

  useEffect(() => {
    let temp = gameDetails?.lobbyType?.reduce((acc, cur) => {
      return cur?._id === formData?.lobbyType
        ? { ...acc, lobbyType: cur?.lobbyType }
        : acc;
    }, {});
    if (temp?.lobbyType === "PRACTICE BATTLE" || temp?.lobbyType === "BATTLE") {
      setFormData({
        ...formData,
        leaderboardScores: (temp?.lobbyType === "BATTLE" && modalValue?.data?.leaderboardScores?.length === 2) || (temp?.lobbyType === "PRACTICE BATTLE" &&  modalValue?.data?.leaderboardScores?.length === 2) ? modalValue?.data?.leaderboardScores : Array.from(Array(2)).fill(""),
      });
    }
  }, [formData?.lobbyType]);

  useEffect(() => {
    if (
      formData?.noOfPlayer &&
      formData?.entryfee &&
      formData?.platformCommission
    ) {
      let numberOfPlayer = gameDetails?.isNoOfPlayer ? formData?.noOfPlayer ? +formData?.noOfPlayer : +lobbyProps?.defaultNumberOfPlayer?.numberOfPlayer : +lobbyProps?.defaultNumberOfPlayer?.numberOfPlayer;
      let fees = formData?.entryfee * numberOfPlayer - formData?.entryfee * numberOfPlayer * `0.${+formData?.platformCommission}`;
      setFormData({
        ...formData,
        winningPrice: fees,
      });
    }
  }, [formData?.platformCommission, formData?.isDefaultPlatformCommission]);
  
  return (
    <Box sx={style}>
      <div
        className={
          "create_headToHead_modal modal_main_popup  add_admin_user_popup"
        }
      >
        <div className={"add_admin_user_popup_title modal_popup_title"}>
          <h2>{`Update Lobby`}</h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="formData">
              <label> Name <span className={"validation-star mll"}> * </span></label>
              <div className="emailWrap">
                <input
                  type="text"
                  value={formData?.tournamentName}
                  className={"wrap_input_modal"}
                  maxLength={30}
                  name="tournamentName"
                  placeholder={"Enter name"}
                  onChange={(e) => handleChange(e)}
                />
                <span>{formData?.tournamentName?.length}/30</span>
                {simpleValidator.current.message(
                    "Name",
                    formData?.tournamentName,
                    "required"
                  )}
              </div>
            </div>
            <div className="formData">
              <label>Description (optional) </label>
              <div className="text_Wrap emailWrap">
                <input
                  type={"text"}
                  className={"wrap_input_modal"}
                  maxLength={50}
                  value={formData?.description}
                  name="description"
                  placeholder={"Enter description"}
                  onChange={(e) => handleChange(e)}
                />
                <span>{formData?.description?.length || 0}/50</span>
              </div>
            </div>
            <div className={"formData checkbox_modal real_money_field"}>
              <label>
                Lobby Type <span className={"validation-star mll"}> *</span>
              </label>
              <div className={"select_game_option_mode"}>
                <div className={"select_game_option"}>
                  <LobbyType
                    options={gameDetails?.lobbyType}
                    formData={formData}
                    setFormData={setFormData}
                    gameDetails={gameDetails}
                    lobbyProps={lobbyProps}
                    setLobbyProps={setLobbyProps}
                  />
                  {simpleValidator.current.message(
                    "lobbyType",
                    formData?.lobbyType,
                    "required"
                  )}
                </div>
              </div>
            </div>

            <LobbyGameMode
              gameDetails={gameDetails}
              setFormData={setFormData}
              formData={formData}
              simpleValidator={simpleValidator}
              lobbyProps={lobbyProps}
              gameModeName={gameModeName}
            />

            <LobbyLeaderboard
              setFormData={setFormData}
              formData={formData}
              simpleValidator={simpleValidator}
              handleChange={handleChange}
              gameMode={gameModeName}
            />

            <DummyAndUserBotOption
              setFormData={setFormData}
              formData={formData}
              simpleValidator={simpleValidator}
              handleChange={handleChange}
              gameModeName={gameModeName}
            />

            {/* <PlatformGST gameDetails={gameDetails} formData={formData} setFormData={setFormData} simpleValidator={simpleValidator} handleChangeCheckbox={handleChangeCheckbox}/> */}
            {gameDetails?.gameName === "Poker" ||
            gameDetails?.gameName === "Poker texas" ||
            gameDetails?.gameName === "Poker Omaha" ||
            gameDetails?.gameName === "Poker Omaha 5" ||
            gameDetails?.gameName === "Blackjack" ||
            gameDetails?.gameName === "Win Patti"? (
              <PokerEntryFee
                lobbyProps={lobbyProps}
                setFormData={setFormData}
                formData={formData}
                simpleValidator={simpleValidator}
                handleChange={handleChange}
                gameDetails={gameDetails}
                gameMode={gameModeName}
                setLobbyProps={setLobbyProps}
              />
            ) : gameModeName === "Points" ? (
              <RummyEntryFee
                lobbyProps={lobbyProps}
                setFormData={setFormData}
                formData={formData}
                simpleValidator={simpleValidator}
                handleChange={handleChange}
                gameDetails={gameDetails}
                gameMode={gameModeName}
                setLobbyProps={setLobbyProps }
              />
            ) : (
              <LobbyEnterFee
                lobbyProps={lobbyProps}
                setFormData={setFormData}
                formData={formData}
                simpleValidator={simpleValidator}
                handleChange={handleChange}
                gameDetails={gameDetails}
                gameMode={gameModeName}
                setLobbyProps={setLobbyProps}
              />
            )}
            {gameModeName !== "Points" &&
              gameDetails?.gameName !== "Poker" &&
              +formData?.winningPrice > 0 && (
                <MultipleWinner
                  setFormData={setFormData}
                  formData={formData}
                  gameDetails={gameDetails}
                  handleChange={handleChange}
                  simpleValidator={simpleValidator}
                  handleOpenErrorModal={handleOpenErrorModal}
                  lobbyProps={lobbyProps}
                />
              )}

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
                value={"Update"}
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
export default UpdateLobby;
