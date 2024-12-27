import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import SelectDropdown from "../../../Components/SelectDropdown";
import FilledButton from "../../../Components/FileButton";
import Paper from "@mui/material/Paper";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import icon_plus from "../../../assets/images/plus.svg";
import ScreenLockLandscapeIcon from "@mui/icons-material/ScreenLockLandscape";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import { addGame } from "../../../Redux/games/action";
import { jsonToFormData } from "../../../utils";
import user from "../../../assets/images/avatar.png";
import Tooltip from "@mui/material/Tooltip";
import { getGenreNames } from "../../../Redux/games/GenreGame/action";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Modal from "@mui/material/Modal";

const AddNewGame = () => {
  const dispatch = useDispatch();
  const genreNamesList = useSelector(
    (state) => state?.gameReducer?.genreNamesList
  );
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [filterStage, setFilterStage] = useState({
    android: false,
    ios: false,
    crossPlatform: false,
  });
  const [filterOrientation, setFilterOrientation] = useState({
    portrait: false,
    landscape: false,
    orientationField: "",
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [formData, setFormData] = useState({
    gameName: "",
    genre: "",
    description: "",
    platform: "",
    isOrientationPortrait: "",
    gameIcon: "",
    gameDesignDocLink: "",
    youtubeVideoLink: "",
    isGameModeOption: false,
    isNoOfPlayer: false,
    isMultipleDeck: false,
    gameGenreKey: {},
    gamePoster: "",
    headerBackgroundImage: "",
  });

  useEffect(() => {
    genreList();
  }, []);

  // Fetch genre list
  const genreList = () => {
    dispatch(getGenreNames({ genreStatus: "Active" }));
  };

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
    if (name === "portrait" && checked) {
      setFilterOrientation({
        portrait: true,
        landscape: false,
        orientationField: e.target.name,
      });
    }
    if (name === "landscape" && checked) {
      setFilterOrientation({
        portrait: false,
        landscape: true,
        orientationField: e.target.name,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      setLoader(true);
      let payload = {
        ...formData,
        isOrientationPortrait:
          filterOrientation.orientationField === "portrait",
      };
      setLoader(true);
      dispatch(addGame(jsonToFormData(payload))).then((res) => {
        if (res.data.success) {
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
            auth: true,
            redirect: "/games/all-games",
          });
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res.data.msg,
          });
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
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      case "AddGenrePopup":
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
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
      gameName: "",
      genre: "",
      description: "",
      platform: "",
      isOrientationPortrait: "",
      mode: "",
      gameIcon: "",
      gameDesignDocLink: "",
      youtubeVideoLink: "",
      gamePoster: "",
    });
  };

  // Handle game logo selection
  const gameLogoHandler = (e, name) => {
    if (
      e.target.files[0]?.type?.includes("image/") &&
      e.target.files[0].type !== "image/gif"
    ) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (name === "gameLogo") {
          if (img.width === 512 && img.height === 512) {
            setFormData({ ...formData, gameIcon: e.target.files[0] });
          } else {
            handleOpenModal("CommonPop", {
              header: "Error",
              body: "The width and height of the image should be  512 * 512 size",
            });
          }
        } else if (name === "headerBackgroundImage") {
          setFormData({
            ...formData,
            headerBackgroundImage: e.target.files[0],
          });
        } else {
          if (img.width === 430 && img.height === 400) {
            setFormData({ ...formData, gamePoster: e.target.files[0] });
          } else {
            handleOpenModal("CommonPop", {
              header: "Error",
              body: "The width and height of the image should be  430 * 400 size",
            });
          }
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
            <h2>Add Game information and get started!</h2>
          </div>
          <div className={"add_game_popup_content"}>
            <div className={"add_game_popup_content_sub_title"}>
              <div className={"icon_game"}>
                <SportsEsportsIcon />
              </div>
              <div className={"add_game_popup_content_sub_title_content"}>
                <h3>Basic Information</h3>
                <p>Get started by adding information of your game</p>
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
                          Enter Game Name{" "}
                          <span className={"validation-star"}>*</span>
                        </label>
                        <div className="emailWrap input_length_counter">
                          <input
                            type="text"
                            value={formData?.gameName}
                            className={"wrap_input_modal"}
                            maxLength={20}
                            name="gameName"
                            placeholder={"Enter Game Name"}
                            onChange={(e) => handleChange(e)}
                          />
                          <span>{formData?.gameName?.length}/20</span>
                        </div>
                        {simpleValidator.current.message(
                          "game name",
                          formData?.gameName,
                          "required"
                        )}
                      </div>
                      {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                      {/* <div className="form_group profile new_game_section profile-image-dropdown">
                        <div>
                          <div className="user_profile">
                            <div className="user_profile_pic">
                              <img
                                src={
                                  formData?.gameIcon
                                    ? URL.createObjectURL(formData?.gameIcon)
                                    : user
                                }
                                alt=""
                              />
                              {!formData?.gameIcon && (
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
                            Game Logo{" "}
                            <span className={"size-validation"}>
                              (512*512 size)
                            </span>{" "}
                            <span className={"validation-star"}>*</span>
                          </label>
                          {simpleValidator.current.message(
                            "gameIcon",
                            formData?.gameIcon,
                            "required"
                          )}
                        </div>
                        {formData?.gameIcon && (
                          <div
                            className={"close-icon"}
                            onClick={() =>
                              setFormData({ ...formData, gameIcon: "" })
                            }
                          >
                            <CloseSharpIcon />
                          </div>
                        )}
                      </div> */}
                      {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                    </div>

                    {/*--------------------------------------- Game Dropdown Genre,Format,Mode,Engine [Start] ----------------------------------------- */}

                    {/*<div className={'select_game_platform_value game_mode game_mode_main_section'}>*/}
                    {/*    <div className={'select_label tab02'}>*/}
                    {/*        <label>Format <span className={'validation-star'}>*</span></label>*/}
                    {/*        <SelectDropdown name={'format'} isFormat={true} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />*/}
                    {/*        {simpleValidator.current.message("selectFormat", formData.format, 'required')}*/}
                    {/*    </div>*/}
                    {/*    <div className={'select_label tab-left-side'}>*/}
                    {/*        <label>Engine <span className={'validation-star'}>*</span></label>*/}
                    {/*        <SelectDropdown name={'engine'} options={['Unity']} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />*/}
                    {/*        {simpleValidator.current.message("selectEngine", formData.engine, 'required')}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={"select_game_platform_value"}>
                      <div className={"select_label tab01"}>
                        <label>
                          Genre <span className={"validation-star"}>*</span>
                        </label>
                        <SelectDropdown
                          name={"genre"}
                          options={genreNamesList}
                          formData={formData}
                          setFormData={setFormData}
                          handleOpenModal={handleOpenModal}
                          placeholder={"Select Genre"}
                        />
                        {simpleValidator.current.message(
                          "selectGenre",
                          formData.genre,
                          "required"
                        )}
                      </div>
                      <div className={"popup_form_checkbox"} style={{display:"-webkit-box"}}>
                        <div className="formData" style={{marginTop:"0px"}}>
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
                          {simpleValidator.current.message(
                            "Platform",
                            formData.platform,
                            "required"
                          )}
                        </div>
                        <div className="formData orientation_filed" style={{marginTop:"0px"}}>
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
                          {simpleValidator.current.message(
                            "Orientation",
                            filterOrientation.orientationField,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                    {/*-----------------------------------------------------Game Dropdown Genre,Format,Mode,Engine [End]---------------------------------------------------------*/}

                    {/*-----------------------------------------------------Game Genre Type Dropdown [Start]---------------------------------------------------------*/}
                    {Object?.keys(formData?.gameGenreKey)?.length > 0 && (
                      <div
                        className={
                          "select_game_platform_value game_mode game_mode_main_section"
                        }
                      >
                        <div
                          className={"select_label game-number-of-player-merge"}
                        >
                          {/*--------------------------------------------[Start] Game Mode ----------------------------------------------------------------*/}
                          {(formData?.gameGenreKey?.isGameMode ||
                            formData?.gameGenreKey?.genreName === "Card" ||
                            formData?.gameGenreKey?.genreName ===
                              "Card Game") && (
                            <div className={"common_checkbox_details"}>
                              <label>
                                Is Game Mode ?{" "}
                                <span className={"validation-star"}> *</span>
                              </label>
                              <div className={"game_mode_btn"}>
                                <div
                                  className={
                                    "game_mode_btn_option yes_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isGameMode"}
                                    checked={formData?.isGameModeOption}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isGameModeOption: true,
                                      })
                                    }
                                  />
                                  <label>Yes</label>
                                </div>
                                <div
                                  className={
                                    "game_mode_btn_option no_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isGameMode"}
                                    checked={!formData?.isGameModeOption}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isGameModeOption: false,
                                      })
                                    }
                                  />
                                  <label>No</label>
                                </div>
                              </div>
                            </div>
                          )}
                          {/*-------------------------------------------- [End] Game Mode ----------------------------------------------------------------*/}

                          {/*--------------------------------------------[Start] Number of Player ----------------------------------------------------------------*/}
                          {(formData?.gameGenreKey?.isNoOfPlayer ||
                            formData?.gameGenreKey?.genreName === "Card" ||
                            formData?.gameGenreKey?.genreName ===
                              "Card Game") && (
                            <div className={"common_checkbox_details"}>
                              <label>
                                Is Number Of Player ?{" "}
                                <span className={"validation-star"}>*</span>
                              </label>
                              <div className={"game_mode_btn"}>
                                <div
                                  className={
                                    "game_mode_btn_option yes_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isNoOfPlayer"}
                                    checked={formData?.isNoOfPlayer}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isNoOfPlayer: true,
                                      })
                                    }
                                  />
                                  <label>Yes</label>
                                </div>
                                <div
                                  className={
                                    "game_mode_btn_option no_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isNoOfPlayer"}
                                    checked={!formData?.isNoOfPlayer}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isNoOfPlayer: false,
                                      })
                                    }
                                  />
                                  <label>No</label>
                                </div>
                              </div>
                            </div>
                          )}
                          {/*--------------------------------------------[Start] End Number of Player ----------------------------------------------------------------*/}
                          {/*--------------------------------------------[Start] Number of Deck ----------------------------------------------------------------*/}
                          {(formData?.gameGenreKey?.isMultipleDeck ||
                            formData?.gameGenreKey?.genreName === "Card" ||
                            formData?.gameGenreKey?.genreName ===
                              "Card Game") && (
                            <div className={"common_checkbox_details"}>
                              <label>
                                Is Multiple Number Of Deck?
                                <span className={"validation-star"}>*</span>
                              </label>
                              <div className={"game_mode_btn"}>
                                <div
                                  className={
                                    "game_mode_btn_option yes_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isMultipleDeck"}
                                    checked={formData?.isMultipleDeck}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isMultipleDeck: true,
                                      })
                                    }
                                  />
                                  <label>Yes</label>
                                </div>
                                <div
                                  className={
                                    "game_mode_btn_option tab_radio no_radio_btn"
                                  }
                                >
                                  <input
                                    type={"radio"}
                                    name={"isMultipleDeck"}
                                    checked={!formData?.isMultipleDeck}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        isMultipleDeck: false,
                                      })
                                    }
                                  />
                                  <label>No</label>
                                </div>
                              </div>
                            </div>
                          )}
                          {/*--------------------------------------------[End] Number of Deck ----------------------------------------------------------------*/}
                        </div>
                      </div>
                    )}
                                        {/*--------------------------------------- Game Poster [Start] ----------------------------------------- */}
                                        <div className="games_add_new_games_logo_poster">
                      <div className="form_group profile new_game_section profile-image-dropdown">
                        <div className="games_add_new_games_poster">
                          <div className="user_profile">
                            <div className="user_profile_pic">
                              <img
                                src={
                                  formData?.gamePoster
                                    ? URL.createObjectURL(formData?.gamePoster)
                                    : user
                                }
                                alt=""
                              />
                              {!formData?.gamePoster && (
                                <span className="addnew">
                                  <img src={icon_plus} alt="" />
                                  <input
                                    type="file"
                                    name="member_photo"
                                    id=""
                                    onChange={(e) =>
                                      gameLogoHandler(e, "gamePoster")
                                    }
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                          <label htmlFor="" className="profile_label">
                            Game Poster
                            <span className={"size-validation"}>
                              (430*400 size)
                            </span>
                          </label>
                          {/* {simpleValidator.current.message("gamePoster", formData?.gamePoster, 'required')} */}
                        </div>
                        {formData?.gamePoster && (
                          <div
                            className={"close-icon"}
                            onClick={() =>
                              setFormData({ ...formData, gamePoster: "" })
                            }
                          >
                            <CloseSharpIcon />
                          </div>
                        )}
                      </div>
                      {/*------
                                            {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}

                      <div className="form_group profile new_game_section profile-image-dropdown">
                        <div className="games_add_new_games_poster">
                          <div className="user_profile">
                            <div className="user_profile_pic">
                              <img
                                src={
                                  formData?.gameIcon
                                    ? URL.createObjectURL(formData?.gameIcon)
                                    : user
                                }
                                alt=""
                              />
                              {!formData?.gameIcon && (
                                <span className="addnew">
                                  <img src={icon_plus} alt="" />
                                  <input
                                    type="file"
                                    name="member_photo"
                                    id=""
                                    onChange={(e) =>
                                      gameLogoHandler(e, "gameLogo")
                                    }
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                          <label htmlFor="" className="profile_label">
                            Game Logo{" "}
                            <span className={"size-validation"}>
                              (512*512 size)
                            </span>{" "}
                            <span className={"validation-star"}>*</span>
                          </label>
                          {simpleValidator.current.message(
                            "Game Logo",
                            formData?.gameIcon,
                            "required"
                          )}
                        </div>
                        {formData?.gameIcon && (
                          <div
                            className={"close-icon"}
                            onClick={() =>
                              setFormData({ ...formData, gameIcon: "" })
                            }
                          >
                            <CloseSharpIcon />
                          </div>
                        )}
                      </div>
                      {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                     
                    </div>
                    {/*-----------------------------------------------------Game Genre Type Dropdown [End]---------------------------------------------------------*/}

                    {/*-----------------------------------------------------Game Genre Type Dropdown [End]---------------------------------------------------------*/}
                    <div className="formData game_input_chars">
                      <label>Enter Game Description (100 Chars) </label>
                      <div className="text_Wrap">
                        <textarea
                          name="description"
                          placeholder={"Enter Game Description"}
                          rows={4}
                          value={formData?.description}
                          maxLength={100}
                          onChange={(e) => handleChange(e)}
                        />
                        <span>{formData?.description?.length}/100</span>
                      </div>
                      {/*{*/}
                      {/*    formData?.description &&*/}
                      {/*    simpleValidator.current.message("description", formData?.description, 'required')*/}
                      {/*}*/}
                    </div>
                  </div>

                  {/*<div className={'design_document'}>*/}
                  {/*    <div className={'design_document_title'}>*/}
                  {/*        <LocalActivityIcon />*/}
                  {/*        <div className={'sub_title_content'}>*/}
                  {/*            <h4>How to Play Youtube Video Link</h4>*/}
                  {/*            <input type={'text'} name={'youtubeVideoLink'} value={formData?.youtubeVideoLink} placeholder={'Share with us the Youtube Video Link.'} onChange={(e) => handleChange(e)} />*/}
                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                </div>
                <div className={"formData_btn"}>
                  <button
                    className={"btn_default"}
                    type={"reset"}
                    onClick={() => resetFieldHandler()}
                  >
                    Clear
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
          redirectApiHandler={genreList}
        />
      </CommonModal>
    </Box>
  );
};
export default AddNewGame;
