import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseMessage } from "./modules/utils";

import {
  newMessage,
  getMessages,
  isMoreMessage,
  loadMore,
} from "./redux/features/messages/messageSlice";

import Message from "./components/Message";

import "./assets/styles/app.css";

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const more = useSelector(isMoreMessage);

  const lastMessage = React.useRef<HTMLDivElement>(null);

  const sender = sessionStorage.getItem("uid");
  if (!sender) sessionStorage.setItem("uid", new Date().getTime().toString());

  const [inputMessage, setInputMessage] = React.useState("");
  const [scrollLast, setScrollLast] = React.useState(false);
  const [skip, setSkip] = React.useState(1);

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(newMessage(parseMessage(inputMessage)));
    setScrollLast(true);
    setInputMessage("");
  };

  const handleMore = () => {
    setScrollLast(false);
    dispatch(loadMore(skip));
    setSkip(skip + 1);
  };

  React.useEffect(() => {
    scrollLast && lastMessage.current && lastMessage.current.scrollIntoView();
  }, [scrollLast]);

  return (
    <div className="page-wrapper">
      <div className="messages-wrapper">
        {more && <button onClick={handleMore}>Load More</button>}
        {messages.length > 0 &&
          messages.map((m, i) => (
            <Message
              key={i}
              sender={m.sender}
              message={m.message}
              ref={i + 1 === messages.length ? lastMessage : undefined}
            />
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
