import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../../utils";
import TabPanel from "../../../../Components/TabPanel";
import React, { useEffect, useState } from "react";
import GameOverViewTab from "./GameOverViewTab";
import GameBuildsTab from "./GameBuildsTab";
import HowToPlayGameTab from "./HowToPlayGameTab";
import { useLocation, useParams } from "react-router-dom";
import GameModeTab from "./GameModeTab";
import GameNumberOfDecksTab from "./GameNumberOfDecksTab";
import GameNumberOfPlayer from "./GameNumberOfPlayer";
import GameConfigTab from "./GameConfigTab";
import { useDispatch, useSelector } from "react-redux";
import RadiusLocation from "./RadiusLocation";
import GameDummyPlayerTab from "./GameDummyPlayerTab";
import PlayingTracking from "./PlayingTracking";
import { getSingleGameDetails } from "../../../../Redux/games/action";
import LobbyTab from "./LobbyTab";
import TournamentTab from "./TournamentTab";
import GameLeaderboard from "./GameLeaderboard";
import PlayerRecord from "./PlayerRecord";
import GameSetupTab from "./GameSetupTab";

const tabArray = [
  { id: 0, active: true, label: "Overview", component: GameOverViewTab },
  {id: 1,active: true,label: "Number of Players",component: GameNumberOfPlayer,},
  { id: 2, active: true, label: "Lobby", component: LobbyTab },
  // {id: 3, active:true, label:'Tournament', component:TournamentTab  },
  { id: 3, active: true, label: "Setup", component: GameSetupTab },
  { id: 4, active: true, label: "Mode", component: GameModeTab },
  { id: 5, active: true, label: "Decks", component: GameNumberOfDecksTab },
  { id: 6, active: true, label: "Leaderboard", component: GameLeaderboard },
  { id: 7, active: true, label: "Game builds", component: GameBuildsTab },
  { id: 8, active: true, label: "How to Play", component: HowToPlayGameTab },
  { id: 9, active: true, label: "Game Config", component: GameConfigTab },
  { id: 10, active: true, label: "Radius location", component: RadiusLocation },
  {id: 11, active: true,label: "Online Player",component: GameDummyPlayerTab,},
  // { id: 13, active: true, label: 'Playing Tracking', component: PlayingTracking },
  { id: 12, active: true, label: "Player Record", component: PlayerRecord },
];

const GameTabDetails = ({ handleOpenModal, redirectApiProps }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const gameDetails = useSelector((state) => state?.gameReducer?.gameDetails);
  const [tab, setTab] = useState(tabArray);
  // const [steps, setSteps] = useState({
  //     basicStep: { gameInfo: false, sdkSetup: false },
  //     customizePlay: { tournament: false },
  //     setupModal: false
  // });

  useEffect(() => {
    if (state?.isRedirectTab) {
      setValue(1);
    }
  }, [state]);

  useEffect(() => {
    dispatch(getSingleGameDetails({ gameId: id }));
  }, [id]);

  useEffect(() => {
    let temp = [...tab];
    let indexMode = temp?.findIndex((item) => item?.label === "Mode");
    let indexDeck = temp?.findIndex((item) => item?.label === "Decks");

    switch (gameDetails?.isGameModeOption) {
      case false:
        if (indexMode > -1) {
          temp[indexMode].active = false;
        }
        break;
      case true:
        if (indexMode > -1) {
          temp[indexMode].active = true;
        }
        break;
    }
    switch (gameDetails?.isMultipleDeck) {
      case false:
        if (indexDeck > -1) {
          temp[indexDeck].active = false;
        }
        break;
      case true:
        if (indexDeck > -1) {
          temp[indexDeck].active = true;
        }
        break;
      case null:
          if (indexDeck > -1) {
            temp[indexDeck].active = false;
          }
          break;
    }
  }, [gameDetails]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }} className={"tab"}>
        <Box
          className="bg_white tab_inner_section"
          sx={{ borderBottom: 1, borderColor: "divider" }}
          pl={3}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            className={"tab_bg_white"}
            scrollButtons="auto"
            variant="scrollable"
          >
            {tab
              ?.filter((item) => item?.active !== false)
              ?.map((item, index) => {
                return (
                  <Tab
                    className={"tab_listing"}
                    key={item}
                    label={item?.label}
                    {...a11yProps(index)}
                  />
                );
              })}
          </Tabs>
        </Box>
      </Box>
      {tab
        ?.filter((item) => item?.active !== false)
        ?.map(({ id, component: Component, active }, key) => {
          return (
            <TabPanel value={value} index={key}>
              <Component
                handleOpenModal={handleOpenModal}
                tabChangeArray={tab?.filter((item) => item?.active !== false)}
                setValue={setValue}
                value={value}
                redirectApiProps={redirectApiProps}
              />
            </TabPanel>
          );
        })}
    </>
  );
};
export default GameTabDetails;