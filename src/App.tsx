import React from "react";
import Message from "./components/Message";
import "./assets/styles/app.css";
import { retrieveLocalMessages } from "./modules/utils";
import { IMessage } from "./redux/features/messages/messageSlice";

const App = () => {
  const [inputMessage, setInputMessage] = React.useState("");
  const [messages, setMessages] = React.useState([] as IMessage[]);

  React.useEffect(() => {
    if (messages.length === 0) {
      const localMessage = retrieveLocalMessages();
      setMessages([...localMessage]);
    }
  }, [messages.length, setMessages]);

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(inputMessage);
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
