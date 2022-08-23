import React from "react";
import Message from "./components/Message";

const App = () => {
  return (
    <div>
      <Message sender="me" message="Hello" />
      <Message sender="me" message="World" />
    </div>
  );
};

export default App;
