import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Loader from "../../../../../../images/Loader";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { currencyFormat, renderCards } from "../../../../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";
import {useSelector} from "react-redux";
let CryptoJS = require("crypto-js");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};
const ViewPlayingScoreBoardPopup = ({ modalValue, handleOpenModal }) => {
  const { id } = useParams();
  const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);

  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({
    history: [],
    winningAmount: [],
    totalScore: [],
  });

  useEffect(() => {
    const payload = {
      gameId: id,
      tableId: modalValue?.row?.tableId,
    };
    setLoader(true);
    let gameServerURL = gameDetails?.gameServerLink;

    axios
      .post(`${gameServerURL}/history`, payload, {
        headers: {
          authorization: CryptoJS.AES.encrypt(
            id,
            process.env.REACT_APP_CALL_BREAK_TOKEN_KEY
          ).toString(),
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          setLoader(false);
          let temp = [...res.data.data.histroy]?.reduce((acc, cur) => {
            return [
              ...acc,
              {
                title: cur.tital,
                users: cur.roundScore.reduce(
                  (acc, cur) => [
                    ...acc,
                    { username: cur.username, avatar: cur.profilePicture },
                  ],
                  []
                ),
                points: cur.roundScore.reduce(
                  (acc, cur) => [...acc, cur.roundPoint],
                  []
                ),
                totalScore: cur.roundScore.reduce(
                  (acc, cur) => [...acc, cur.roundPoint],
                  []
                ),
                cards: cur.card.reduce(
                  (acc, cur) => [...acc, { cards: cur.card }],
                  []
                ),
              },
            ];
          }, []);

          let totalScore = temp
            .reduce((acc, cur) => {
              return [...acc, cur?.totalScore];
            }, [])
            .reduce((acc, cur, index) => {
              acc = cur.reduce((prev, next, i) => {
                if (index > 0) {
                  acc[i] = acc[i] + next;
                } else {
                  if (prev === "") {
                    acc = [next];
                    return [next];
                  } else {
                    acc = [...prev, next];
                    return [...prev, next];
                  }
                }
                return acc;
              }, "");
              return acc;
            }, []);

          setRowData({
            ...rowData,
            history: temp,
            totalScore: totalScore,
            winningAmount: res?.data?.data?.winningAmount,
          });
        }
      });
  }, [modalValue]);

  const renderHeader = () => {
    return rowData?.history?.[0]?.users?.map((item) => {
      return (
        <th className={"view_scoreBoard_th"}>
          <span className={"table_td_span"}>
            <img src={item.avatar} alt={""} />
          </span>
          <h2>{item.username}</h2>
        </th>
      );
    });
  };

  const renderBody = () => {
    return rowData?.history?.map((item, index) => {
      return (
        <>
          <tr>
            <td
              className={"view_td_scoreBoard round_td border_remove"}
              rowSpan="2"
            >
              {item.title}
            </td>
            {renderChild(item.cards, "cards")}
          </tr>
          <tr>{renderChild(item.points, "points")}</tr>
        </>
      );
    });
  };

  const renderChild = (item, type) => {
    return item.map((value) => {
      return (
        <td className={"view_td_scoreBoard font-bold-card"}>
          {type === "cards" ? renderCards(value.cards) : +value?.toFixed(2)}
        </td>
      );
    });
  };

  return (
    <Box sx={style}>
      {loader && <TableLoader />}
      <p className={"custom_close_btn"} onClick={() => handleOpenModal()}>
        <svg
          viewBox="0 0 24 24"
          x="1008"
          y="432"
          fit=""
          height="28"
          width="25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="#64748b"
          />
        </svg>
      </p>
      <div
        className={
          "game_tab_overView head_to_head_gameTab  view_score_board_table"
        }
      >
        <div className={"head_to_head_gameTab_table modal_main_popup"}>
          <div className={"modal_popup_title"}>
            <h2>View Score Board</h2>
          </div>
          {rowData?.history?.length > 0 ? (
            <table className={"view_score_board_table"}>
              <thead>
                <tr>
                  <th className={"view_scoreBoard_th"}>
                    {" "}
                    <span className={"table_td_span"}>
                      <img
                        src={
                          "https://i.pinimg.com/736x/4a/08/30/4a083000a80262e2ccd897a6f7bfbd36.jpg"
                        }
                        alt=""
                      />
                    </span>{" "}
                  </th>
                  {renderHeader()}
                </tr>
              </thead>
              <tbody>
                {renderBody()}

                <tr className={"change-row-color"}>
                  <td
                    className={
                      "view_td_scoreBoard_Score round_td border_remove"
                    }
                  >
                    Total Score
                  </td>
                  {rowData?.totalScore?.map((item) => {
                    return (
                      <td className={"view_td_scoreBoard_Score"}>
                        {item?.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>

                <tr className={"change-row-color"}>
                  <td
                    className={
                      "view_td_scoreBoard_Score round_td border_remove"
                    }
                  >
                    Total Winning
                  </td>
                  {rowData?.winningAmount?.map((item) => {
                    return (
                      <td className={"view_td_scoreBoard_Score"}>
                        {currencyFormat(+item?.winningAmount)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </Box>
  );
};
export default ViewPlayingScoreBoardPopup;
