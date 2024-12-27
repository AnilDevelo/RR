import React from "react";
import GameModeDropdown from "./GameModeDropdown";
import NumberOfPlayerDropdown from "./NumberOfPlayerDropdown";
import NumberOfDeckDropdown from "./NumberOfDeckDropdown";

const LobbyGameMode = ({
  gameDetails,
  formData,
  setFormData,
  simpleValidator,
  lobbyProps,
  gameModeName,
}) => {
  const {
    isGameModeOption,
    isNoOfPlayer,
    isMultipleDeck,
    gameModes,
    numberOfPlayer,
    numberOfDeck,
  } = gameDetails;
  return (
    <>
      {isGameModeOption && (
        <div className={"formData checkbox_modal real_money_field"}>
          <label>
            Mode Of Game <span className={"validation-star mll"}> *</span>
          </label>
          <div className={"select_game_option_mode"}>
            <div className={"select_game_option"}>
              <GameModeDropdown
                formData={formData}
                setFormData={setFormData}
                name={"gameModeId"}
                options={gameModes || []}
              />
              {simpleValidator.current.message(
                "gameMode",
                formData?.gameModeId,
                "required"
              )}
            </div>
          </div>
        </div>
      )}
      {/* {isMultipleDeck && (
        <div className={"formData checkbox_modal real_money_field"}>
          <label>
            Number Of Decks <span className={"validation-star mll"}>*</span>{" "}
          </label>
          <div className={"select_game_option_mode"}>
            <div className={"select_game_option"}>
              <NumberOfPlayerDropdown
                formData={formData}
                setFormData={setFormData}
                name={"noOfDecks"}
                options={numberOfDeck?.map((item) => item?.numberOfDeck)}
              />
              {simpleValidator.current.message(
                "numberOfDeck",
                formData?.noOfDecks,
                "required"
              )}
            </div>
          </div>
        </div>
      )} */}
      {isMultipleDeck && isMultipleDeck !== null && (
        <div className={"formData checkbox_modal real_money_field"}>
          <label>
            Number of Deck <span className={"validation-star mll"}> *</span>
          </label>
          <div className={"select_game_option_mode"}>
            <div className={"select_game_option"}>
              <NumberOfDeckDropdown
                formData={formData}
                setFormData={setFormData}
                name={"noOfDecks"}
                options={gameDetails?.numberOfDeck || []}
              />
              {simpleValidator.current.message(
                "noOfDecks",
                formData?.noOfDecks,
                "required"
              )}
            </div>
          </div>
        </div>
      )}
      {gameModeName === "Deals" && (
        <div className={"formData checkbox_modal real_money_field"}>
          <label>
            Deal Mode <span className={"validation-star mll"}>*</span>{" "}
          </label>
          <div className={"select_game_option_mode"}>
            <div className={"select_game_option"}>
              <NumberOfPlayerDropdown
                formData={formData}
                setFormData={setFormData}
                name={"subMode"}
                options={["2 Deals", "3 Deals", "6 Deals"]}
              />
              {simpleValidator.current.message(
                "dealsSubMode",
                formData?.subMode,
                "required"
              )}
            </div>
          </div>
        </div>
      )}
      <div className={"modal_create_lobby_details jk d_flex"}>
        {isNoOfPlayer && (
          <div className={"formData checkbox_modal real_money_field mr_10"}>
            <label>
              Number Of Players <span className={"validation-star mll"}>*</span>
            </label>
            <div className={"select_game_option_mode"}>
              <div className={"select_game_option"}>
                <NumberOfPlayerDropdown
                  formData={formData}
                  setFormData={setFormData}
                  isLobbyBattle={lobbyProps?.lobbyTypeString?.includes(
                    "BATTLE"
                  )}
                  name={"noOfPlayer"}
                  options={lobbyProps?.numberOfPlayer}
                />
                {simpleValidator.current.message(
                  "numberOfPlayer",
                  formData?.noOfPlayer,
                  "required"
                )}
              </div>
            </div>
          </div>
        )}
        <div className={"w_100"}>
          <div className="" style={{ marginTop: "13px" }}>
            <label>
              Minimum Players For Start Playing{" "}
              <span className={"validation-star mll"}>*</span>
            </label>
            <div
              className={
                lobbyProps?.lobbyTypeString?.includes("BATTLE")
                  ? "text_Wrap emailWrap readOnly_field"
                  : "text_Wrap emailWrap"
              }
            >
              <input
                style={{marginBottom: "0"}}
                type={"text"}
                className={"wrap_input_modal"}
                readOnly={lobbyProps?.lobbyTypeString?.includes("BATTLE")}
                value={formData?.minPlayer}
                name="minPlayer"
                placeholder={"Enter Minimum Players For Start Playing"}
                onChange={(e) => {
                  const { name, value } = e.target;
                  // Check if the value is numeric
                  if (!isNaN(value)) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      minPlayer: /^0/.test(value)
                        ? value.replace(/^0/, "")
                        : value,
                      type: name,
                    }));
                  }
                }}
              />
              {simpleValidator.current.message(
                "minPlayer",
                formData?.minPlayer?.toString(),
                "required|minPlayer"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LobbyGameMode;
