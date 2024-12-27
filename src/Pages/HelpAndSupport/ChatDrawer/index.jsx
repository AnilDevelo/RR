import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  addHelpAndSupportMessage,
  getHelpAndSupportList,
  markAsRead,
} from "../../../Redux/HelpAndSupport/action";
import { generateAvatar } from "../../../utils";

const ChatDrawer = ({ helpAndSupportData, pagination, toggleDrawer }) => {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const [messages, setMessages] = useState("");
  const addHelpAndSupportMessageHandler = (e) => {
    e.preventDefault();
    let payload = {
      helpAndSupportId: helpAndSupportData?.id,
      message: messages,
    };
    dispatch(addHelpAndSupportMessage(payload)).then((res) => {
      setMessages("");
      getHelpAndSupportListDetails();
    });
  };

  useEffect(() => {
    if (messageList.length) {
      let objDiv = document.querySelector(".chat_msg_container");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messageList.length]);

  useEffect(() => {
    getHelpAndSupportListDetails();
  }, [pagination.rowsPerPage, pagination.page]);

  const getHelpAndSupportListDetails = () => {
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    dispatch(getHelpAndSupportList(payload)).then((res) => {
      let temp = res?.data?.data?.docs?.filter(
        (item) => item?._id === helpAndSupportData?.id
      );
      setMessageList(temp[0].messages);
      markAsReadFun(temp[0]);
    });
  };

  const markAsReadFun = (markAsReadData) => {
    let storeId = helpAndSupportData?.userReceiverDetails?._id
    const temp = markAsReadData?.messages
    var indexArray = []
    const filterData = temp?.map((item, index) => {
        if (item.senderId == storeId && item.isRead == false) {
            indexArray.push(index)
        }
    })
    let payload ={
         ticketId : helpAndSupportData?.row?._id,
         messagesIndex: indexArray
    }
   dispatch(markAsRead(payload))
}
  return (
    <div className="clinics chat_area">
      <p className={"custom_close_btn"}>
        <svg
          viewBox="0 0 24 24"
          x="1008"
          y="432"
          fit=""
          height="28"
          width="25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          onClick={toggleDrawer}
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="#64748b"
          />
        </svg>
      </p>
      <div className={"chat_area_header d_flex justify_content_between"}>
        <h4>
          {" "}
          <span>#{helpAndSupportData?.row?.numericId}</span>{" "}
          {helpAndSupportData?.userReceiverDetails?.fullName}
        </h4>
        <button
          className={"chat_refresh_btn"}
          onClick={() => getHelpAndSupportListDetails()}
        >
          Refresh Chat
        </button>
      </div>
      <div className="chat_area_wrap">
        <div className="chat_msg_list_wrap">
          <div className="chat_msg_container">
            <div className="chat_msg_list">
              {messageList?.map((item) => {
                return (
                  <>
                    {item?.senderId !==
                    helpAndSupportData?.userReceiverDetails?._id ? (
                      <div className="message_section  message_right">
                        <div className="msg_avtar">
                          <div className="avtar_img">
                            <img src={generateAvatar(`You`)} alt="" />
                          </div>
                        </div>
                        <div className="messages">
                          <div className="user_message">
                            <p className="user_title">You</p>
                            <div className="user_time">
                              <p>
                                {moment(item?.messageDate).format(
                                  "DD/MM/YYYY LT"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="message_content">
                            <div className="message_inner">
                              <p>{item?.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="message_section message_left">
                        <div className="msg_avtar">
                          <div className="avtar_img">
                            <img
                              src={
                                helpAndSupportData?.userReceiverDetails
                                  ?.profileImage
                                  ? helpAndSupportData?.userReceiverDetails
                                      ?.profileImage
                                  : generateAvatar(
                                      `${helpAndSupportData?.userReceiverDetails.fullName}`
                                    )
                              }
                              alt={"profile"}
                            />
                          </div>
                        </div>
                        <div className="messages">
                          <div className="user_message">
                            <p className="user_title">
                              {
                                helpAndSupportData?.userReceiverDetails
                                  ?.fullName
                              }
                            </p>
                            <div className="user_time">
                              <p>
                                {moment(item?.messageDate).format(
                                  "DD/MM/YYYY LT"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="message_content">
                            <div className="message_inner">
                              <p>{item?.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <form
            className="chat_input_wrap"
            onSubmit={(e) => addHelpAndSupportMessageHandler(e)}
          >
            <div className="chat_input_block">
              <div className="chat_editor">
                <div id="editor" className="container">
                  <div className="msg_text">
                  <input
                    type="text"
                    placeholder="Add a message..."
                    value={messages}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Remove leading spaces from the input value
                      const sanitizedValue = inputValue.trimStart();
                      // Update the state with the sanitized value
                      setMessages(sanitizedValue);
                    }}
                  />
                  </div>
                </div>
              </div>
              <div className="message_action">
                <button
                  type={"submit"}
                  className="message-icon send-message btn btn_primary"
                >
                  <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                    <path
                      className="u_fill"
                      d="M33.973 2.852c.037.188.034.387 0 .586-.083.498-.175.994-.247 1.494-.41 2.85-.814 5.701-1.222 8.551l-1.215 8.52c-.33 2.303-.656 4.607-.996 6.91a1.2 1.2 0 01-.233.552c-.342.424-.777.424-1.25.255-4.511-1.611-9.024-3.217-13.535-4.825-.072-.026-.142-.062-.24-.104L28.433 7.97a.33.33 0 00-.24.097C22.548 13.098 16.9 18.13 11.258 23.166c-.184.163-.333.187-.555.107-2.563-.92-5.127-1.84-7.696-2.741-.444-.155-.808-.37-1.006-.827v-.52c.135-.342.353-.59.676-.765 5.444-2.955 10.886-5.916 16.328-8.877l13.72-7.472c.18-.059.3-.106.527-.035.351.178.643.415.722.816zM13.688 26.53c1.791.637 3.565 1.268 5.362 1.909-.042.078-.07.143-.11.2-1.143 1.623-2.283 3.248-3.434 4.866-.487.685-1.368.653-1.721-.057a1.157 1.157 0 01-.117-.495c-.008-2.079-.006-4.159-.005-6.237 0-.053.013-.105.025-.187z"
                      fill="hsla(240,8%,12%,1)"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChatDrawer;
