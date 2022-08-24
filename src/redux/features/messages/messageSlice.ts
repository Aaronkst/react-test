import { createSlice } from "@reduxjs/toolkit";
import { parseMessage, retrieveLocalMessages } from "../../../modules/utils";
import type { RootState } from "../../store";

interface IMessage {
  sender: string;
  message: string;
}

interface IMessageState {
  messages: IMessage[];
}

// Define the initial state using that type
const initialState: IMessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // sync here
    newMessage: (state, action) => {
      try {
        const localMessages = retrieveLocalMessages();
        const message = parseMessage(action.payload);
        localMessages.push(message);
        return { messages: state.messages.concat(message) };
      } catch (e) {
        console.log(e);
        alert("Unexpected Error");
      }
    },
  },
});

export type { IMessage };

export const { newMessage } = messageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const messages = (state: RootState): any => state.message;
export default messageSlice.reducer;
