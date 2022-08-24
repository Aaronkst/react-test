import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveLocalMessages,
  updateLocalMessage,
} from "../../../modules/utils";
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
  messages: retrieveLocalMessages(),
};

export const messageSlice = createSlice({
  name: "message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // sync here
    newMessage: (state, action) => {
      try {
        updateLocalMessage(action.payload);
        return { messages: state.messages.concat(action.payload) };
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
export const getMessages = (state: RootState): IMessage[] =>
  state.message.messages;
export default messageSlice.reducer;
