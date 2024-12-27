import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import SelectDropdown from "../../../Components/SelectDropdown";
import FilledButton from "../../../Components/FileButton";
import Paper from "@mui/material/Paper";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch} from "react-redux";
import icon_plus from "../../../assets/images/plus.svg";
import ScreenLockLandscapeIcon from "@mui/icons-material/ScreenLockLandscape";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import { jsonToFormData } from "../../../utils";
import user from "../../../assets/images/avatar.png";
import Tooltip from "@mui/material/Tooltip";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { createTournamentLobby, getTournamentGamelist } from "Redux/Tournament/action";
import CommonDropdown from "Components/Dropdown/CommonDropdown";

const AddNewGame = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [filterStage, setFilterStage] = useState({android: false,ios: false,crossPlatform: false});
  const [filterOrientation, setFilterOrientation] = useState({portrait: false,landscape: false,orientationField: ""});
  const [modalDetails, setModalDetails] = useState({ modalValue: "", modalName: "", modalIsOpen: false});
  let Modal = PopComponent[modalDetails.modalName];
  const [formData, setFormData] = useState({
    tournamentName: "", game: "", gameSubmode: "", description: "", platform: "", isOrientationPortrait: "", tournamentIcon: "", gameGenreKey: {},
    gameId: "",
    gameModeId: null,
    subMode: "All Game Mode",
    isGameModeOption:false,isImageAvailable:false
  });
  const [gameList, setgameList] = useState([])

 // Fetch Game list
  useEffect(() => {
    getgameList();
  }, []);

  const getgameList = () => {
    dispatch(getTournamentGamelist()).then((res) => {
      setgameList(res?.data?.data || []);
    }).catch((error) => {
      console.error(error);
    });
  };
  
  // check Game Modes
  const CheckGameMode = gameList?.find((game) => game?.gameName == formData?.game)?.gameModes;

  // Handle Platform checkbox function
  const platformCheckboxHandler = (e) => {
    const { checked, name } = e.target;
    setFilterStage({ ...filterStage, [name]: checked });
    setFormData({ ...formData, platform: name });
    if (name === "Android" && checked) {
      setFilterStage({ android: checked, ios: false, crossPlatform: false });
    } else if (name === "Ios" && checked) {
      setFilterStage({ android: false, ios: checked, crossPlatform: false });
    } else if (name === "Cross-Platform" && checked) {
      setFilterStage({ android: false, ios: false, crossPlatform: checked });
    }
  };

  // Handle orientation checkbox
  const orientationCheckboxFilter = (e) => {
    const { checked, value, name } = e.target;
    setFilterOrientation({ ...filterOrientation, [e.target.name]: checked });
    if (name === "portrait" && checked) { setFilterOrientation({ portrait: true, landscape: false, orientationField: e.target.name })}
    if (name === "landscape" && checked) { setFilterOrientation({ portrait: false, landscape: true, orientationField: e.target.name })}
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        isOrientationPortrait: filterOrientation.orientationField === "portrait",
      };
      if(formData?.gameSubmode !== "Deals"){
         delete payload.subMode;
      }
      if(!formData.isGameModeOption) {
          delete payload.gameModeId;
      }
      setLoader(true);
      dispatch(createTournamentLobby(jsonToFormData(payload))).then((res) => {
        if (res.data.success) {
          setLoader(false);
          handleOpenModal("CommonPop", { header: "Success", body: res?.data?.message, auth: true, redirect: "/all-tournament"});
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", { header: "Error", body: res?.data?.message || res?.data?.msg });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle opening modals
  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop":
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
        break;
      default:
        setModalDetails({ ...modalDetails, modalIsOpen: false });
    }
  };

  // Reset form fields
  const resetFieldHandler = () => {
    setFilterOrientation({
      portrait: false,
      landscape: false,
      orientationField: "",
    });
    setFilterStage({ android: false, ios: false, crossPlatform: false });
    setFormData({
      ...formData,
      tournamentName: "",
      game: "",
      gameSubmode: "",
      description: "",
      platform: "",
      isOrientationPortrait: "",
      tournamentIcon: "",
      gameGenreKey: {},
    });
  };

  // Handle game logo selection
  const gameLogoHandler = (e) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (img.width === 512 && img.height === 512) {
          setFormData({ ...formData, tournamentIcon: e.target.files[0] , isImageAvailable:true});
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "The width and height of the image should be  512 * 512 size",
          });
        }
      };
    } else {
      handleOpenModal("CommonPop", {
        header: "Error",
        body: "Please add only image file",
      });
    }
  };
  return (
    <Box className={"add_game_details"}>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"add_game_popup"}>
          <div className={"add_game_popup_title"}>
            <h2>Add Tournament information and get started!</h2>
          </div>
          <div className={"add_game_popup_content"}>
            <div className={"add_game_popup_content_sub_title"}>
              <div className={"icon_game"}>
                <SportsEsportsIcon />
              </div>
              <div className={"add_game_popup_content_sub_title_content"}>
                <h3>Basic Information</h3>
                <p>Get started by adding information of your Tournament</p>
              </div>
            </div>
            <div className={"add_game_popup_content_form add-new-game-details"}>
              <form
                className={"popup_form"}
                method={"POST"}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <div className={"popup_modal_details_data"}>
                    <div className={"add_game_section_content_form"}>
                      <div className="formData">
                        <label>
                          Enter Tournament Name{" "}
                          <span className={"validation-star"}>*</span>
                        </label>
                        <div className="emailWrap input_length_counter">
                          <input
                            type="text"
                            value={formData?.tournamentName}
                            className={"wrap_input_modal"}
                            maxLength={20}
                            name="tournamentName"
                            placeholder={"Enter Tournament Name"}
                            onChange={(e) => handleChange(e)}
                          />
                          <span>{formData?.tournamentName?.length}/20</span>
                        </div>
                        <span>
                        {simpleValidator.current.message("Tournament name",formData?.tournamentName, "required")}
                        </span>
                      </div>
                      {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                      <div className="form_group profile new_game_section profile-image-dropdown w-250">
                        <div>
                          <div className="user_profile">
                            <div className="user_profile_pic">
                              <img
                                src={
                                  formData?.tournamentIcon
                                    ? URL.createObjectURL(formData?.tournamentIcon)
                                    : user
                                }
                                alt=""
                              />
                              {!formData?.tournamentIcon && (
                                <span className="addnew">
                                  <img src={icon_plus} alt="" />
                                  <input
                                    type="file"
                                    name="member_photo"
                                    id=""
                                    onChange={(e) => gameLogoHandler(e)}
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                          <label htmlFor="" className="profile_label">
                          Tournament Logo <span className={"validation-star"}>*</span> <br/>
                            <span className={"size-validation"}>
                              (512*512 size)
                            </span>
                          </label>
                        </div>
                        {formData?.tournamentIcon && (
                          <div
                            className={"close-icon"}
                            onClick={() =>
                              setFormData({ ...formData, tournamentIcon: "" , isImageAvailable:false })
                            }
                          >
                            <CloseSharpIcon />
                          </div>
                        )}
                      {simpleValidator.current.message("tournamentLogo",formData?.tournamentIcon,"required")}
                      </div>

                      {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                    </div>
                    <div className={"select_game_platform_value"}>
                      <div className={"select_label tab01 mt_1"}>
                        <label>
                          Games <span className={"validation-star"}>*</span>
                        </label>
                        <SelectDropdown
                          name={"game"}
                          options={gameList}
                          formData={formData}
                          setFormData={setFormData}
                          handleOpenModal={handleOpenModal}
                          placeholder={"Select games"}
                        />
                        {simpleValidator.current.message("select games",formData?.game,"required")}
                      </div>
                      {
                        CheckGameMode?.length ? <div className={"select_label tab01 mt_1"}>
                          
                        <label>
                          Game Mode
                        </label>
                        <SelectDropdown
                          name={"gameSubmode"}
                          options={CheckGameMode}
                          formData={formData}
                          setFormData={setFormData}
                          handleOpenModal={handleOpenModal}
                          placeholder={"Select Game Mode"}
                        />
                        {CheckGameMode?.length && simpleValidator.current.message("game mode",formData?.gameSubmode,"required")}
                        </div>
                          : <></>
                      }
                      {formData?.gameSubmode === "Deals" && 
                      (<div className={"select_label tab01 mt_1"}>
                      <label>
                          Sub Mode <span className={"validation-star"}>*</span>
                        </label>
                        <CommonDropdown
                          options={["All Game Mode", "2 Deals", "3 Deals", "6 Deals"]} name={'subMode'} formData={formData} setFormData={setFormData} placeholder={"Select Sub Mode"}
                        />
                        {simpleValidator.current.message("submode",formData?.subMode,"required")}
                        </div>
                        )
                      }
                      <div className={"popup_form_checkbox mt_05"}>
                        <div className="formData">
                          <label>
                            Platform{" "}
                            <span className={"validation-star"}>*</span>
                          </label>
                          <div className={"platform_field"}>
                            <Tooltip title="Android Platform">
                              <div
                                className={
                                  filterStage.android
                                    ? "checkboxWrap activePlatformIcon"
                                    : "checkboxWrap"
                                }
                              >
                                <AndroidIcon />
                                <input
                                  type="checkbox"
                                  name="Android"
                                  checked={filterStage.android}
                                  onChange={(e) => platformCheckboxHandler(e)}
                                />
                              </div>
                            </Tooltip>
                            <Tooltip title="iOS Platform">
                              <div
                                className={
                                  filterStage.ios
                                    ? "checkboxWrap activePlatformIcon"
                                    : "checkboxWrap"
                                }
                              >
                                <AppleIcon />
                                <input
                                  type="checkbox"
                                  name="Ios"
                                  checked={filterStage.ios}
                                  onChange={(e) => platformCheckboxHandler(e)}
                                />
                              </div>
                            </Tooltip>
                            <Tooltip title="Cross-Platform">
                              <div
                                className={
                                  filterStage.crossPlatform
                                    ? "checkboxWrap activePlatformIcon"
                                    : "checkboxWrap"
                                }
                              >
                                <PhonelinkIcon />
                                <input
                                  type="checkbox"
                                  name="Cross-Platform"
                                  checked={filterStage.crossPlatform}
                                  onChange={(e) => platformCheckboxHandler(e)}
                                />
                              </div>
                            </Tooltip>
                          </div>
                          {simpleValidator.current.message("Platform",formData?.platform,"required")}
                        </div>
                        <div className="formData orientation_filed">
                          <label>
                            Orientation{" "}
                            <span className={"validation-star"}>*</span>{" "}
                          </label>
                          <div className={"platform_field"}>
                            <Tooltip title="Portrait Orientation">
                              <div
                                className={
                                  filterOrientation.portrait
                                    ? "checkboxWrap activePlatformIcon"
                                    : "checkboxWrap"
                                }
                              >
                                <ScreenLockPortraitIcon />
                                <input
                                  type="radio"
                                  name="portrait"
                                  checked={filterOrientation.portrait}
                                  onChange={(e) => orientationCheckboxFilter(e)}
                                />
                              </div>
                            </Tooltip>
                            <Tooltip title="Landscape Orientation">
                              <div
                                className={
                                  filterOrientation.landscape
                                    ? "checkboxWrap activePlatformIcon"
                                    : "checkboxWrap"
                                }
                              >
                                <ScreenLockLandscapeIcon />
                                <input
                                  type="radio"
                                  name="landscape"
                                  checked={filterOrientation.landscape}
                                  onChange={(e) => orientationCheckboxFilter(e)}
                                />
                              </div>
                            </Tooltip>
                          </div>
                          {simpleValidator.current.message("Orientation",filterOrientation?.orientationField,"required")}
                        </div>
                      </div>
                    </div>
                    
                    {/*-----------------------------------------------------Game Dropdown Genre,Format,Mode,Engine [End]---------------------------------------------------------*/}
                    <div className="formData game_input_chars">
                      <label>Enter Tournament Description (100 Chars) </label>
                      <div className="text_Wrap">
                        <textarea
                          name="description"
                          placeholder={"Enter Tournament Description"}
                          rows={4}
                          value={formData?.description}
                          maxLength={100}
                          onChange={(e) => handleChange(e)}
                        />
                        <span>{formData?.description?.length}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"formData_btn"}>
                  {/* <button
                    className={"btn_default"}
                    type={"reset"}
                    onClick={() => resetFieldHandler()}
                  >
                    Clear
                  </button> */}
                  <FilledButton
                    type={"submit"}
                    value={"Add"}
                    className={"btn loader_css"}
                    loading={loader}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Paper>
      {/*---------------------------------------------------Common Modal ------------------------------------------------------------*/}
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={getgameList}
        />
      </CommonModal>
    </Box>
  );
};
export default AddNewGame;
