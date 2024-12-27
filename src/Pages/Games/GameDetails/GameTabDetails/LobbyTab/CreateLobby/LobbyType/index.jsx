import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  margin: {
    minWidth: "100%",
    margin: "0",
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
      width: "100%",
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "15px 26px 15px 12px",
    textTransform: "capitalize",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1976d2",
      outlineWidth: "1px",
      boxShadow: "none",
      outline: "1px solid #1976d2",
    },
  },
  svg: {
    right: "11px",
  },
}))(InputBase);

const LobbyTypeDropdown = ({
  options,
  formData,
  setFormData,
  setLobbyProps,
  lobbyProps,
  gameDetails,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    let temp = options?.reduce((acc, cur) => {
      return cur?._id === event.target.value
        ? { ...acc, lobbyType: cur?.lobbyType }
        : acc;
    }, {});

    if (temp?.lobbyType?.toLowerCase()?.includes("PRACTICE"?.toLowerCase())) {
      localStorage.setItem('noOfPlayer', temp?.lobbyType ==='PRACTICE BATTLE' ? 2 : '');
      setLobbyProps({
        ...lobbyProps,
        isReadOnlyEntryFee: true,
        numberOfPlayer:
          temp?.lobbyType === "PRACTICE BATTLE"
            ? [2]
            : temp?.lobbyType === "PRACTICE CONTEST"
            ? gameDetails?.numberOfPlayer
                ?.filter((item) => item.numberOfPlayer !== 2)
                ?.map((item) => item?.numberOfPlayer)
            : gameDetails?.numberOfPlayer?.map((item) => item?.numberOfPlayer),
        lobbyTypeString: temp?.lobbyType,
      });

      setFormData({
        ...formData,
        lobbyType: event.target.value,
        entryfee: 0,
        pointValue: 0,
        winningPrice: 0,
        minEntryFee: 0,
        maxEntryFee: 0,
        stakesAmount: 0,
        noOfPlayer: temp?.lobbyType === "PRACTICE BATTLE" ? 2 : "",
        minPlayer: temp?.lobbyType === "PRACTICE BATTLE" ? 2 : "",
      });
    } else {
      localStorage.setItem('noOfPlayer', temp?.lobbyType ==='BATTLE' ? 2 : '')
      setFormData({
        ...formData,
        lobbyType: event.target.value,
        noOfPlayer: temp?.lobbyType === "BATTLE" ? 2 : "",
        minPlayer: temp?.lobbyType === "BATTLE" ? 2 : "",
        entryfee: "",
        pointValue: "",
        winningPrice: 0,
        minEntryFee: "",
        maxEntryFee: "",
        stakesAmount: "",
      });

      setLobbyProps({
        ...lobbyProps,
        isReadOnlyEntryFee: false,
        lobbyTypeString: temp?.lobbyType,
        numberOfPlayer:
          temp?.lobbyType === "BATTLE"
            ? [2]
            : temp?.lobbyType === "CONTEST"
            ? gameDetails?.numberOfPlayer
                ?.filter((item) => item.numberOfPlayer !== 2)
                ?.map((item) => item?.numberOfPlayer)
            : gameDetails?.numberOfPlayer?.map((item) => item?.numberOfPlayer),
      });
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("notranslate")) {
      document.getElementsByClassName("notranslate")[1].innerHTML = "Select Lobby Type";
      if (document.getElementsByClassName("notranslate")[2]) {
        document.getElementsByClassName("notranslate")[2].innerHTML = "Select Mode of Game";
      }
      if (document.getElementsByClassName("notranslate")[3]) {
        document.getElementsByClassName("notranslate")[3].innerHTML = "Select Number of Players";
      }
      if (document.getElementsByClassName("notranslate")[4]) {
        document.getElementsByClassName("notranslate")[4].innerHTML = "Select ";
      }
    }
  }, []);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          name={"lobbyType"}
          value={formData?.lobbyType}
          onChange={handleChange}
          className={"select-dropdown-main filter_dropdown_list"}
          input={<BootstrapInput />}
          placeholder={"sdsdsdsd"}
        >
          {options?.map((menu, i) => {
            return (
              <MenuItem value={menu?._id} key={menu?._id}>
                <div className={"select_multiple_menu select-mode-img"}>
                  <img
                    src={menu?.lobbyTypeIcon}
                    alt={""}
                    className={"select-section-images"}
                  />
                  <div>
                    <h2>{menu?.lobbyType}</h2>
                    <p>{menu?.description}</p>
                  </div>
                </div>
              </MenuItem>
            );
          })}

          {/*<MenuItem value={'BATTLE (One Vs One)'}>*/}
          {/*     <div className={'select_multiple_menu'}>*/}
          {/*         <h2>BATTLE (One Vs One)</h2>*/}
          {/*         <p>The Player can play on against one</p>*/}
          {/*     </div>*/}
          {/*</MenuItem>*/}
          {/*<MenuItem value={'CONTEST (One vs Many)'}>*/}
          {/*     <div className={'select_multiple_menu'} >*/}
          {/*         <h2>CONTEST (One vs Many)</h2>*/}
          {/*         <p>The Players can play one against many </p>*/}
          {/*     </div>*/}
          {/*</MenuItem>*/}
        </Select>
      </FormControl>
    </div>
  );
};
export default LobbyTypeDropdown;
