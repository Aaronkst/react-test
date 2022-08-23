import React from "react";
import Message from "./components/Message";
import "./assets/styles/app.css";

const msgs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [inputMessage, setInputMessage] = React.useState("");

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(inputMessage);
  };

  return (
    <div className="page-wrapper">
      <div className="messages-wrapper">
        {msgs.map((m) => (
          <Message key={m} sender="me" message="hello" />
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
