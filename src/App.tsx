import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseMessage } from "./modules/utils";

import {
  newMessage,
  getMessages,
  IMessage,
} from "./redux/features/messages/messageSlice";

import Message from "./components/Message";

import "./assets/styles/app.css";

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  const sender = sessionStorage.getItem("uid");
  if (!sender) sessionStorage.setItem("uid", new Date().getTime().toString());

  const [inputMessage, setInputMessage] = React.useState("");

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(newMessage(parseMessage(inputMessage)));
  };

  return (
    <div className="page-wrapper">
      <div className="messages-wrapper">
        {messages.length > 0 &&
          messages.map((m, i) => (
            <Message key={i} sender={m.sender} message={m.message} />
          ))}
      </div>
      <div className="input-wrapper">
        <form className="form-wrapper" onSubmit={handleMessage}>
          <div style={{ width: "80%" }}>
            <input
              type="text"
              name="message"
              id="message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={"Type something..."}
              required
            />
          </div>
          <div style={{ width: "20%" }}>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
