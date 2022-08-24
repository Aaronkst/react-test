import React from "react";
import "../assets/styles/message.css";
import defaultAvatar from "../assets/images/default_avatar.jpg";

interface IProps {
  sender: string;
  message: string;
}

const Message = React.forwardRef<HTMLDivElement, IProps>(
  ({ sender, message }, ref) => {
    const currentUser = sessionStorage.getItem("uid");

    const isSender = currentUser === sender;

    return (
      <div
        className={
          isSender
            ? "pull-right chat-bubble-wrapper"
            : "pull-left chat-bubble-wrapper"
        }
        ref={ref}
      >
        <div className="img-wrapper">
          <img className="avatar" src={defaultAvatar} alt={"default_avatar"} />
        </div>
        <div className={isSender ? "text-wrapper-sender" : "text-wrapper"}>
          <p className="text">{isSender ? "You" : sender}</p>
          <p className="text">{message}</p>
        </div>
      </div>
    );
  }
);

export default Message;
