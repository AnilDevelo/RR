import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";
import H1 from "../assets/images/final-cards/H-1.png";
import H2 from "../assets/images/final-cards/H-2.png";
import H3 from "../assets/images/final-cards/H-3.png";
import H4 from "../assets/images/final-cards/H-4.png";
import H5 from "../assets/images/final-cards/H-5.png";
import H6 from "../assets/images/final-cards/H-6.png";
import H7 from "../assets/images/final-cards/H-7.png";
import H8 from "../assets/images/final-cards/H-8.png";
import H9 from "../assets/images/final-cards/H-9.png";
import H10 from "../assets/images/final-cards/H-10.png";
import H11 from "../assets/images/final-cards/H-11.png";
import H12 from "../assets/images/final-cards/H-12.png";
import H13 from "../assets/images/final-cards/H-13.png";
import C1 from "../assets/images/final-cards/C-1.png";
import C2 from "../assets/images/final-cards/C-2.png";
import C3 from "../assets/images/final-cards/C-3.png";
import C4 from "../assets/images/final-cards/C-4.png";
import C5 from "../assets/images/final-cards/C-5.png";
import C6 from "../assets/images/final-cards/C-6.png";
import C7 from "../assets/images/final-cards/C-7.png";
import C8 from "../assets/images/final-cards/C-8.png";
import C9 from "../assets/images/final-cards/C-9.png";
import C10 from "../assets/images/final-cards/C-10.png";
import C11 from "../assets/images/final-cards/C-11.png";
import C12 from "../assets/images/final-cards/C-12.png";
import C13 from "../assets/images/final-cards/C-13.png";
import D1 from "../assets/images/final-cards/D-1.png";
import D2 from "../assets/images/final-cards/D-2.png";
import D3 from "../assets/images/final-cards/D-3.png";
import D4 from "../assets/images/final-cards/D-4.png";
import D5 from "../assets/images/final-cards/D-5.png";
import D6 from "../assets/images/final-cards/D-6.png";
import D7 from "../assets/images/final-cards/D-7.png";
import D8 from "../assets/images/final-cards/D-8.png";
import D9 from "../assets/images/final-cards/D-9.png";
import D10 from "../assets/images/final-cards/D-10.png";
import D11 from "../assets/images/final-cards/D-11.png";
import D12 from "../assets/images/final-cards/D-12.png";
import D13 from "../assets/images/final-cards/D-13.png";
import S1 from "../assets/images/final-cards/S-1.png";
import S2 from "../assets/images/final-cards/S-2.png";
import S3 from "../assets/images/final-cards/S-3.png";
import S4 from "../assets/images/final-cards/S-4.png";
import S5 from "../assets/images/final-cards/S-5.png";
import S6 from "../assets/images/final-cards/S-6.png";
import S7 from "../assets/images/final-cards/S-7.png";
import S8 from "../assets/images/final-cards/S-8.png";
import S9 from "../assets/images/final-cards/S-9.png";
import S10 from "../assets/images/final-cards/S-10.png";
import S11 from "../assets/images/final-cards/S-11.png";
import S12 from "../assets/images/final-cards/S-12.png";
import S13 from "../assets/images/final-cards/S-13.png";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TableCell from "@material-ui/core/TableCell";
let CryptoJS = require("crypto-js");

export const getAccessToken = () => Cookies.get("token");
export const isAuthenticated = () => !!getAccessToken();

export const hideActionFunc = (role) => {    
    // console.log("role", role);
  //let agentCaption = JSON.parse(localStorage.getItem("agentData")) || cookies.get("agentData");
  //let agentCaption = cookies.get("agentData");
  let agentCaption =  agentDetails();

  return (
    (agentCaption !== "null" && Object?.keys(agentCaption)?.length && agentCaption?.permission?.[role]?.viewer && agentCaption?.permission?.[role]?.editor) ||
    ( userDetails()?.role) === "Admin");

};

export const hideActionFuncNotification = (role) => {
  //let agentCaption = JSON.parse(localStorage.getItem("agentData")) || cookies.get("agentData");
  //let agentCaption = cookies.get("agentData");
  let agentCaption =  agentDetails();
  return (
    (agentCaption !== "null" && Object?.keys(agentCaption)?.length && agentCaption?.permission?.[role]?.viewer && agentCaption?.permission?.[role]?.editor) ||
    ( userDetails()?.role) === "Admin") || (agentCaption?.permission?.[role]?.viewer);
};



export const ActionFunction = (role, props) => {
  //let agentCaption = JSON.parse(localStorage.getItem("agentData")) || cookies.get("agentData");
  //let agentCaption = Cookies.get("agentData");
  let agentCaption = agentDetails();
  return (agentCaption !== "null" &&
    Object?.keys(agentCaption)?.length &&
    agentCaption?.permission?.[role]?.viewer &&
    agentCaption?.permission?.[role]?.editor) ||
     (userDetails()?.role) === "Admin"
    ? props
    : {
        id: "action",
        type: "hide",
      };
};

export default function CheckRoute({ authenticationPath, outlet, publicType }) {
  if (publicType ? !isAuthenticated() : isAuthenticated()) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

export const generateAvatar = (text) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = stringToHslColor(text);
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 65px montserrat_regular";
  context.fillStyle = "#fff";
  context.textAlign = "center";
  context.textBaseline = "middle";

  let first = text?.split(" ")[0]?.charAt(0)?.toUpperCase();
  let last = text?.split(" ")[1]?.charAt(0)?.toUpperCase();

  if (!last) {
    last =
      text?.split(" ")[0]?.charAt(1)?.toUpperCase() ||
      text?.split(" ")[0]?.charAt(0)?.toUpperCase();
  }
  if (!first) {
    first = "S";
    last = "U";
  }

  context.fillText(first + last, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
};

export const stringToHslColor = (str, s = 30, l = 80) => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const RouterSidebar = [
  {
    label: "Admin Users",
    adminUsers: true,
  },
  {
    label: "Add/Remove Admin Users",
    addRemoveAdminUsers: true,
  },
  {
    label: "Users",
    usersList: true,
  },
  {
    label: "Edit User Info",
    editUserInfo: true,
  },
  {
    label: "User Note",
    userNotes: true,
  },
  {
    label: "Block/Unblock Users",
    bloackUnblockUsers: true,
  },
  {
    label: "Reported User",
    reportedUsersList: true,
  },
  {
    label: "Games",
    games: true,
  },
  {
    label: "Edit Game Info",
    editGameInfo: true,
  },
  {
    label: "Publisher",
    publishers: true,
  },
  {
    label: "Analytics",
    viewAnalytics: true,
  },
  {
    label: "SDK Management",
    sdkManagement: true,
  },
  {
    label: "Approve/Reject Users Withdrawal Requests",
    approveRejectUserWithdrawls: true,
  },
  {
    label: "Approve/Reject Publisher Commission Requests",
    approveRejectPublisherWithdrawls: true,
  },
  {
    label: "Change Password",
    changePassword: true,
  },
  {
    label: "Approve/Reject Games and Publishers",
    approveRejectGamesAndPublishers: true,
  },
  {
    label: "All Access",
    allAccess: true,
  },
];
function htmlToText(html) {
  var temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}
export const dotGenerator = (text, handleOpenModal, type, isGamePlay, isWithdrawal) => {
  let comment = text;
  let result = "";
  comment = comment?.replaceAll("\n\n", " ");
  comment = comment?.replaceAll("\n", " ");
  let splitText = comment?.trim().split(" ");
  if (splitText?.length > 5) {
    result = (
      <span>
        {" "}
        {isGamePlay
          ? `${htmlToText(text)?.slice(0, 30)}...`
          : `${splitText?.slice(0, 4).join(" ")}...`}
        <button
          className={"rejected_reason_modal"}
          onClick={() =>
            handleOpenModal("ViewRejectedComment", {
              title: type,
              data: text,
              isGamePlay: !!isGamePlay,
            })
          }
        >
          more
        </button>
      </span>
    );
    return result || "";
  }if (splitText?.length > 1 && isWithdrawal){
    result = (
        <span>
        {" "}
          {isGamePlay
              ? `${htmlToText(text)?.slice(0, 30)}...`
              : `${splitText?.slice(0, 1).join(" ")}...`}
          <button
              className={"rejected_reason_modal"}
              onClick={() =>
                  handleOpenModal("ViewRejectedComment", {
                    title: type,
                    data: text,
                    isGamePlay: !!isGamePlay,
                  })
              }
          >
          more
        </button>
      </span>
    );
    return result || "";
  } else {
    result = isGamePlay
      ? htmlToText(text)?.slice(0, 30) || ""
      : `${splitText?.slice(0, splitText?.length).join(" ")}`;
  }
  return result || "";
};
export const formatPhoneNumber = (str) => {
  let value = str;
  if (value) {
    value = value
      .replace(/\D+/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return value;
  } else {
    return "";
  }
};

export const profileImages = (imgVal, commonImg) => {
  return (
    <img
      src={
        imgVal
          ? typeof imgVal === "string"
            ? imgVal
            : URL.createObjectURL(imgVal)
          : commonImg
      }
      alt=""
    />
  );
};

export const decimalGenerate = (amount) => {
  return amount % 1 === 0 ? "" : "";
};
export const expireTime = () => {
  return new Date(Date.now() + 24 + 60 * 60 * 1000);
};

export const AdminRole = [
  {
    label: "All Modules",
    value: "all",
    all: {
      editor: false,
      viewer: false,
    },
    id: 1,
  },
  // {
  //     label: 'Sub Admin Users',
  //     value: 'subAdminUser',
  //     subAdminUser:{
  //         editor:false,
  //         viewer:false
  //     }
  // },
  {
    label: "Users",
    value: "user",
    user: {
      editor: false,
      viewer: false,
    },
    id: 2,
  },
  {
    label: "Game",
    value: "game",
    game: {
      editor: false,
      viewer: false,
    },
    id: 3,
  },
  {
    label: "Analytics",
    value: "analytics",
    analytics: {
      editor: false,
      viewer: false,
    },
    id: 4,
  },
  {
    label: "Popular Game",
    value: "popularGame",
    popularGame: {
      editor: false,
      viewer: false,
    },
    id: 5,
  },
  {
    label: "Bonus",
    value: "bonus",
    bonus: {
      editor: false,
      viewer: false,
    },
    id: 6,
  },
  {
    label: "Revenue",
    value: "revenue",
    revenue: {
      editor: false,
      viewer: false,
    },
    id: 7,
  },
  {
    label: "Master",
    value: "master",
    master: {
      editor: false,
      viewer: false,
    },
    id: 8,
  },
  {
    label: "Marketing",
    value: "marketing",
    marketing: {
      editor: false,
      viewer: false,
    },
    id: 9,
  },
  {
    label: "Design",
    value: "design",
    design: {
      editor: false,
      viewer: false,
    },
    id: 10,
  },
  // {
  //     label: 'Website',
  //     value: 'webSite',
  //     webSite:{
  //         editor:false,
  //         viewer:false,
  //     }
  // },
  {
    label: "Setting",
    value: "setting",
    setting: {
      editor: false,
      viewer: false,
    },
    id: 11,
  },
  {
    label: "MGP Release",
    value: "mgpRelease",
    mgpRelease: {
      editor: false,
      viewer: false,
    },
    id: 12,
  },
  {
    label: "Withdrawal",
    value: "withdrawal",
    withdrawal: {
      editor: false,
      viewer: false,
    },
    id: 13,
  },
  {
    label: "GST",
    value: "gst",
    gst: {
      editor: false,
      viewer: false,
    },
    id: 14,
  },
  {
    label: "TDS Report",
    value: "tdsReport",
    tdsReport: {
      editor: false,
      viewer: false,
    },
    id: 15,
  },
  {
    label: "Help & Support",
    value: "helpAndSupport",
    helpAndSupport: {
      editor: false,
      viewer: false,
    },
    id: 16,
  },
  // {
  //   label: "History",
  //   value: "history",
  //   history: {
  //     editor: false,
  //     viewer: false,
  //   },
  // },
  {
    label: "Tournament",
    value: "gameTournament",
    gameTournament: {
      editor: false,
      viewer: false,
    },
    id: 17,
  },
];

// export const AdminRole = [
//     // {
//     //     label: 'Admin Users',
//     //     value: 'Admin Users'
//     // },
//     {
//         label: 'User',
//         value: 'user',
//         user:{
//             editor:false,
//             viewer:false
//         }
//     },
//     {
//         label: 'Game',
//         value: 'game',
//         game:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Popular Game',
//         value: 'popularGame',
//         popularGame:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Bonus',
//         value: 'bonus',
//         bonus:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Revenue',
//         value: 'revenue',
//         revenue:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Master',
//         value: 'master',
//         master:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Website',
//         value: 'webSite',
//         webSite:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Setting',
//         value: 'setting',
//         setting:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'MGP Release',
//         value: 'mgpRelease',
//         mgpRelease:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Bank And UPI',
//         value: 'bankAndUpi',
//         bankAndUpi:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'TDS Report',
//         value: 'tdsReport',
//         tdsReport:{
//             editor:false,
//             viewer:false,
//         }
//     },
//     {
//         label: 'Help & Support',
//         value: 'helpAndSupport',
//         helpAndSupport:{
//             editor:false,
//             viewer:false,
//         }
//     },
// ];

// export const currencyFormat = (cash, amountStyle) => {
//   let number = Number(cash?.toFixed(2));
//   return (
//     <span>
//       {" "}
//       {amountStyle !== undefined
//         ? amountStyle === "Credited"
//           ? "+"
//           : "-"
//         : ""}
//       <NumberFormat
//         value={number || 0.0}
//         displayType={"text"}
//         thousandSeparator={true}
//         prefix={"₹"}
//       />
//       {decimalGenerate(number)}
//     </span>
//   );
// };

export const currencyFormat = (cash, amountStyle) => {
  // Convert cash to a number if it's not already
  const number = typeof cash === 'number' ? cash.toFixed(2) : 0.0;
  return (
    <span>
      {" "}
      {amountStyle !== undefined
        ? amountStyle === "Credited"
          ? "+"
          : "-"
        : ""}
      <NumberFormat
        value={number || 0.0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      {decimalGenerate(number)}
    </span>
  );
};

export const addPrefixFormat = (cash, preValue) => {
  const number = typeof cash === 'number' ? cash?.toFixed(2) : 0.0;
  const percentage = typeof cash === 'number' && preValue === "%" ? cash?.toFixed() : 0;
  return (
    <span>
      <NumberFormat
        value={preValue === "%" ? percentage : number || 0.0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      {decimalGenerate(number) }
    </span>
  );
};

// export const currencyFormatLobby = (cash, amountStyle) => {
//   let number = parseFloat(cash).toFixed(2); // Parse the cash value as a float (number)
//   return (
//     <span>
//       {" "}
//       {amountStyle !== undefined
//         ? amountStyle === "Credited"
//           ? "+"
//           : "-"
//         : ""}
//       <NumberFormat
//         value={number || 0.0}
//         displayType={"text"}
//         thousandSeparator={true}
//         prefix={"₹"}
//       />
//       {decimalGenerate(number)}
//     </span>
//   );
// };


export let helpTicketTypeArr = [
  {
    value: "selectAll",
    label: "Select All",
    helpAndSupportGame: "helpAndSupportGame",
    helpAndSupportWallet: "helpAndSupportWallet",
    helpAndSupportManagement: "helpAndSupportManagement",
    selectAll: {
      editor: false,
      viewer: false,
      allowedGames: [],
    },
  },
  {
    value: "helpAndSupportGame",
    label: "Games",
    helpAndSupportGame: {
      editor: false,
      viewer: false,
      allowedGames: [],
    },
  },
  {
    value: "helpAndSupportWallet",
    label: "Wallet",
    helpAndSupportWallet: {
      editor: false,
      viewer: false,
    },
  },
  {
    value: "helpAndSupportTicket",
    label: "Management",
    helpAndSupportTicket: {
      editor: false,
      viewer: false,
    },
  },
];

export const renderCards = (cards) => {
  return (
    <span className={"card-view"}>
      {cards.map((card) => {
        switch (card) {
          case "H-1": {
            return (
              <span>
                <img src={H1} alt={"H1"} />
              </span>
            );
          }
          case "H-2": {
            return (
              <span>
                <img src={H2} alt={"H2"} />
              </span>
            );
          }
          case "H-3": {
            return (
              <span>
                <img src={H3} alt={"H3"} />
              </span>
            );
          }
          case "H-4": {
            return (
              <span>
                <img src={H4} alt={"H4"} />
              </span>
            );
          }
          case "H-5": {
            return (
              <span>
                <img src={H5} alt={"H5"} />
              </span>
            );
          }
          case "H-6": {
            return (
              <span>
                <img src={H6} alt={"H6"} />
              </span>
            );
          }
          case "H-7": {
            return (
              <span>
                <img src={H7} alt={"H7"} />
              </span>
            );
          }
          case "H-8": {
            return (
              <span>
                <img src={H8} alt={"H8"} />
              </span>
            );
          }
          case "H-9": {
            return (
              <span>
                <img src={H9} alt={"H9"} />
              </span>
            );
          }
          case "H-10": {
            return (
              <span>
                <img src={H10} alt={"H10"} />
              </span>
            );
          }
          case "H-11": {
            return (
              <span>
                <img src={H11} alt={"H11"} />
              </span>
            );
          }
          case "H-12": {
            return (
              <span>
                <img src={H12} alt={"H12"} />
              </span>
            );
          }
          case "H-13": {
            return (
              <span>
                <img src={H13} alt={"H13"} />
              </span>
            );
          }

          case "C-1": {
            return (
              <span>
                <img src={C1} alt={"C1"} />
              </span>
            );
          }
          case "C-2": {
            return (
              <span>
                <img src={C2} alt={"C2"} />
              </span>
            );
          }
          case "C-3": {
            return (
              <span>
                <img src={C3} alt={"C3"} />
              </span>
            );
          }
          case "C-4": {
            return (
              <span>
                <img src={C4} alt={"C4"} />
              </span>
            );
          }
          case "C-5": {
            return (
              <span>
                <img src={C5} alt={"C5"} />
              </span>
            );
          }
          case "C-6": {
            return (
              <span>
                <img src={C6} alt={"C6"} />
              </span>
            );
          }
          case "C-7": {
            return (
              <span>
                <img src={C7} alt={"C7"} />
              </span>
            );
          }
          case "C-8": {
            return (
              <span>
                <img src={C8} alt={"C8"} />
              </span>
            );
          }
          case "C-9": {
            return (
              <span>
                <img src={C9} alt={"C9"} />
              </span>
            );
          }
          case "C-10": {
            return (
              <span>
                <img src={C10} alt={"C10"} />
              </span>
            );
          }
          case "C-11": {
            return (
              <span>
                <img src={C11} alt={"C11"} />
              </span>
            );
          }
          case "C-12": {
            return (
              <span>
                <img src={C12} alt={"C12"} />
              </span>
            );
          }
          case "C-13": {
            return (
              <span>
                <img src={C13} alt={"C13"} />
              </span>
            );
          }

          case "D-1": {
            return (
              <span>
                <img src={D1} alt={"D1"} />
              </span>
            );
          }
          case "D-2": {
            return (
              <span>
                <img src={D2} alt={"D2"} />
              </span>
            );
          }
          case "D-3": {
            return (
              <span>
                <img src={D3} alt={"D3"} />
              </span>
            );
          }
          case "D-4": {
            return (
              <span>
                <img src={D4} alt={"D4"} />
              </span>
            );
          }
          case "D-5": {
            return (
              <span>
                <img src={D5} alt={"D5"} />
              </span>
            );
          }
          case "D-6": {
            return (
              <span>
                <img src={D6} alt={"D6"} />
              </span>
            );
          }
          case "D-7": {
            return (
              <span>
                <img src={D7} alt={"D7"} />
              </span>
            );
          }
          case "D-8": {
            return (
              <span>
                <img src={D8} alt={"D8"} />
              </span>
            );
          }
          case "D-9": {
            return (
              <span>
                <img src={D9} alt={"D9"} />
              </span>
            );
          }
          case "D-10": {
            return (
              <span>
                <img src={D10} alt={"D10"} />
              </span>
            );
          }
          case "D-11": {
            return (
              <span>
                <img src={D11} alt={"D11"} />
              </span>
            );
          }
          case "D-12": {
            return (
              <span>
                <img src={D12} alt={"D12"} />
              </span>
            );
          }
          case "D-13": {
            return (
              <span>
                <img src={D13} alt={"D13"} />
              </span>
            );
          }

          case "S-1": {
            return (
              <span>
                <img src={S1} alt={"S1"} />
              </span>
            );
          }
          case "S-2": {
            return (
              <span>
                <img src={S2} alt={"S2"} />
              </span>
            );
          }
          case "S-3": {
            return (
              <span>
                <img src={S3} alt={"S3"} />
              </span>
            );
          }
          case "S-4": {
            return (
              <span>
                <img src={S4} alt={"S4"} />
              </span>
            );
          }
          case "S-5": {
            return (
              <span>
                <img src={S5} alt={"S5"} />
              </span>
            );
          }
          case "S-6": {
            return (
              <span>
                <img src={S6} alt={"S6"} />
              </span>
            );
          }
          case "S-7": {
            return (
              <span>
                <img src={S7} alt={"S7"} />
              </span>
            );
          }
          case "S-8": {
            return (
              <span>
                <img src={S8} alt={"S8"} />
              </span>
            );
          }
          case "S-9": {
            return (
              <span>
                <img src={S9} alt={"S9"} />
              </span>
            );
          }
          case "S-10": {
            return (
              <span>
                <img src={S10} alt={"S10"} />
              </span>
            );
          }
          case "S-11": {
            return (
              <span>
                <img src={S11} alt={"S11"} />
              </span>
            );
          }
          case "S-12": {
            return (
              <span>
                <img src={S12} alt={"S12"} />
              </span>
            );
          }
          case "S-13": {
            return (
              <span>
                <img src={S13} alt={"S13"} />
              </span>
            );
          }
        }
      })}
    </span>
  );
};

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export const checkRchEmpty = (html) => {
  let div = document.createElement("div");
  div.innerHTML = html;
  let isImage = div?.getElementsByTagName?.("img")?.length > 0;
  if (isImage) {
    return false;
  }
  return (
    div.innerText.replaceAll("\n", "").trim() === "" ||
    div.innerText.replaceAll("\n", "").trim() === "undefined"
  );
};

export const financeYear = () => {
  let temp = []
  let currentYear = new Date().getFullYear();
  for(let i = 0; i < 2; i++){
    let next = currentYear + 1;
    let year = currentYear + '-' + next.toString().slice(-2);
    temp.push(year)
    currentYear--;
  }
  return temp;
}

export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
[`& .${tooltipClasses.arrow}`]: {
  color: theme.palette.common.black,
},
[`& .${tooltipClasses.tooltip}`]: {
  backgroundColor: theme.palette.common.black,
},
}));

export const userDetails = () => {
  try {
    const secretKey = process.env.REACT_APP_CALL_BREAK_TOKEN_KEY;
    const cookieName = 'userDetails';
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const encryptedCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));

    if (encryptedCookie) {
      const encryptedValue = decodeURIComponent(encryptedCookie.substring(cookieName.length + 1));
      const decryptedData = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        return JSON.parse(decryptedData);
      }
    }
  } catch (error) {
    console.error('Error decrypting user details:', error);
  }

  // Return default user details in case of decryption failure or invalid cookie
  return { role: '', email: '' };
};


export const agentDetails = () => {
  try {
    const secretKey = process.env.REACT_APP_CALL_BREAK_TOKEN_KEY;
    const cookieName = 'agentDetails';
    const cookiesAgent = document.cookie.split(';').map(cookie => cookie.trim());
    const encryptedCookie = cookiesAgent.find(cookie => cookie.startsWith(`${cookieName}=`));

    if (encryptedCookie && encryptedCookie !== `${cookieName}=null`) {
      const encryptedValue = decodeURIComponent(encryptedCookie.substring(cookieName.length + 1));
      const decryptedData = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        return JSON.parse(decryptedData);
      }
    }
  } catch (error) {
    console.error('Error decrypting agent details:', error);
  }

  // Return the agent details from the "agentDetails" cookie if available
  return Cookies.get('agentDetails') || {};
};

export const clearPaginationAndFilterData = (pagination, filterData, setPagination, setFilterData) => {
  setPagination((prevPagination) => ({
    ...prevPagination,
    startRange: '',
    endRange: '',
    rowsPerPage: 10,
    page: 0,
  }));

  setFilterData((prevFilterData) => ({
    ...prevFilterData,
    csvDownload: false,
    exportFile: false,
    exportFileName: 'Export File',
  }));
};

export const renderSrNo = (row, i, pagination) => {
  return <TableCell>{+pagination.rowsPerPage * ((+pagination.page + 1) - 1) + i + 1}</TableCell>;
};

export function formatDate(date) {
  return date ? moment(date).format("YYYY-MM-DD") : null;
}

// Function to remove a property from an object if it exists
export const removeProperty = (obj, prop) => {
  if (prop in obj) {
    delete obj[prop];
  }
};

// export function findMatchingNames(arr1, arr2) {
//   return arr2.reduce((matchingNames, obj1) => {
//     if (arr1.some(obj2 =>obj1._id === obj2.gameModeId)) {
//       if (matchingNames !== '') {
//         matchingNames += ', ';
//       }
//       matchingNames += obj1.gameModeName;
//     }
//     return matchingNames;
//   }, '');
// }

export function findMatchingNames(arr1, arr2) {
  return arr2.reduce((matchingNames, obj1) => {
    if (arr1.some(obj2 =>obj1._id === obj2.gameModeId._id)) {
      matchingNames.push(obj1.gameModeName);
    }
    return matchingNames;
  }, []);
}

// export function findMatchingNames(arr1, arr2) {
//   return arr2.reduce((matchingNames, obj1) => {
//     if (arr1.some(obj2 =>obj1._id === obj2.gameModeId)) {
//       matchingNames.push(obj1.gameModeName);
//     }
//     return matchingNames;
//   }, []);
// }