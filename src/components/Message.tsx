import React from "react";
import "../assets/styles/message.css";
import defaultAvatar from "../assets/images/default_avatar.jpg";

interface IProps {
  sender: string;
  message: string;
}

const Message = ({ sender, message }: IProps): JSX.Element => {
  const currentUser = sessionStorage.getItem("uid");

  const [isSender, setIsSender] = React.useState(false);

  React.useEffect(() => {
    if (currentUser === sender) setIsSender(true);
  }, [currentUser, isSender, sender]);

  return (
    <div
      className={
        isSender
          ? "pull-right chat-bubble-wrapper"
          : "pull-left chat-bubble-wrapper"
      }
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
};

export default Message;
