import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import CommonModal from "../../../../../../hoc/CommonModal";
import { useParams } from "react-router-dom";
import PopComponent from "../../../../../../hoc/PopContent";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import LobbyType from "./LobbyType";
import LobbyGameMode from "./LobbyGameMode";
import LobbyLeaderboard from "./LobbyLeaderboard";
import DummyAndUserBotOption from "./DummyAndUserBotOption";
import PlatformGST from "./PlatformGST";
import PokerEntryFee from "./PokerEntryFee";
import RummyEntryFee from "./RummyEntryFee";
import LobbyEnterFee from "./LobbyEnterFee";
import MultipleWinner from "./MultipleWinner";
import {
  createGameLobby,
  getSingleGameDetails,
} from "../../../../../../Redux/games/action";
import FilledButton from "../../../../../../Components/FileButton";

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

const CreateLobby = ({ modalValue, handleOpenModal }) => {
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
    platformCommission:gameDetails?.gameConfig?.gameConfig?.PLATFORM_COMMISSION,
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

  useEffect(() => {
    dispatch(getSingleGameDetails({ gameId: id }));
  }, []);

  useEffect(() => {
    if (!gameDetails?.isNoOfPlayer) {
      localStorage.setItem(
        "noOfPlayer",
        gameDetails?.numberOfPlayer?.map((item) => item?.numberOfPlayer)?.[0]
      );
    }
  }, [formData?.minPlayer]);

  useEffect(() => {
    if (
      formData?.entryfee &&
      formData?.noOfPlayer &&
      gameDetails?.isNoOfPlayer
    ) {
       //GST Calculation start
      let totalFees = Number(formData?.entryfee) * Number(formData?.noOfPlayer)
      let fees = totalFees - (totalFees * Number(formData?.platformCommission) / 100)
      //GST Calculation End
      // let fees = +formData?.entryfee * +formData?.noOfPlayer - +formData?.entryfee * +formData?.noOfPlayer * `0.${+formData?.platformCommission}`;
      setFormData({
        ...formData,
        winningPrice: fees,
        leaderboardScores:
          formData?.noOfPlayer &&
          Array.from(Array(formData?.noOfPlayer)).fill(""),
      });
    } else if (formData?.noOfPlayer) {
      setFormData({
        ...formData,
        leaderboardScores:
          formData?.noOfPlayer &&
          Array.from(Array(formData?.noOfPlayer)).fill(""),
      });
    } else {
      setFormData({
        ...formData,
        leaderboardScores: Array.from(
          Array(
            gameDetails?.numberOfPlayer
              ?.filter((item) => item?.isDefault)
              ?.reduce((acc, cur) => {
                return { ...cur };
              }, {})?.numberOfPlayer
          )
        ).fill(""),
      });
    }
  }, [formData?.noOfPlayer, gameDetails]);

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
  const handleValidationFields = () => {
    if(gameModeName === "Points"){
        simpleValidator.current.fields.entryFee = true
    }
    if(gameModeName !== "Points"){
        simpleValidator.current.fields.pointValue = true
    }
    if(gameModeName === "Poker"){
        simpleValidator.current.fields.entryFee = true
    }
    if(gameModeName !== "Poker"){
        simpleValidator.current.fields.minEntryFee = true;
        simpleValidator.current.fields.maxEntryFee = true;
        simpleValidator.current.fields.stakesAmount = true;
    }
    if(!formData?.isLeaderboardScoreOn){
        simpleValidator.current.fields.leaderboardScore = true
    }
    if(!formData?.isDummyPlayer){
        simpleValidator.current.fields.dummyPlayerStartPoint = true
    }
    if(!formData?.isMultiWinner){
        simpleValidator.current.fields.winnerPrize = true
        simpleValidator.current.fields.multiWinner = true
    }
    if(gameModeName !== 'Deals'){
        simpleValidator.current.fields.dealsSubMode = true
    }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidationFields();
    if (simpleValidator.current.allValid() && !lobbyProps?.maxEntryFeeError) {
      let payload = {
        ...formData,
        gameId: gameDetails?._id,
        publisherId: gameDetails?.publisherId?._id,
        entryfee: Number(
          formData?.isGST ? lobbyProps?.totalEntryFee : formData?.entryfee
        ),
        maxPlayer: formData?.noOfPlayer,
        minPlayer: formData?.minPlayer,
        dummyPlayerStartPoint: Number(formData?.dummyPlayerStartPoint),
        noOfDecks: formData?.noOfDecks,
      };
      // Remove properties conditionally
      if (!formData?.isDummyPlayer) {
        delete payload?.dummyPlayerStartPoint;
      }
      if (!payload?.isGameModeOption) {
        delete payload?.gameModeOptions;
      }
      if (gameModeName === "Points" || !payload?.isLeaderboardScoreOn) {
        delete payload?.leaderboardScores;
      }
      Object?.keys(payload).forEach((ele) => {
        if (payload[ele] === undefined || payload[ele] === "") {
          delete payload[ele];
        }
      });
      setLoader(true);
      dispatch(createGameLobby(payload)).then((res) => {
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
  return (
    <Box sx={style}>
      <div
        className={
          "create_headToHead_modal modal_main_popup  add_admin_user_popup"
        }
      >
        <div className={"add_admin_user_popup_title modal_popup_title"}>
          {" "}
          <h2>{`Create Lobby`}</h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="formData">
              <label> Name <span className={"validation-star mll"}> * </span></label>
              <div className="emailWrap">
                <input
                  style={{marginBottom:"0px"}}
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
                  value={formData.description}
                  name="description"
                  placeholder={"Enter description"}
                  onChange={(e) => handleChange(e)}
                />
                <span>{formData?.description?.length}/50</span>
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
                    lobbyProps={lobbyProps}
                    setLobbyProps={setLobbyProps}
                    gameDetails={gameDetails}
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

            {/* <PlatformGST gameDetails={gameDetails} formData={formData} setFormData={setFormData} simpleValidator={simpleValidator} handleChangeCheckbox={handleChangeCheckbox} /> */}
            {gameDetails?.gameName === "Poker" ||
            gameDetails?.gameName === "Poker Omaha" ||
            gameDetails?.gameName === "Poker Omaha 5" ||
            gameDetails?.gameName === "Poker texas" ||
            gameDetails?.gameName === "Blackjack" ||
            gameDetails?.gameName === "Win Patti" ? (
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
                setLobbyProps={setLobbyProps}
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
                value={"Save"}
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
export default CreateLobby;
