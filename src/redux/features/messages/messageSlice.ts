import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  more?: boolean;
}

// Define the initial state using that type
const initialState: IMessageState = {
  messages: retrieveLocalMessages().data,
  more: retrieveLocalMessages().more,
};

export const messageSlice = createSlice({
  name: "message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // sync here
    newMessage: (state, action: PayloadAction<IMessage>) => {
      try {
        updateLocalMessage(action.payload);
        return { ...state, messages: state.messages.concat(action.payload) };
      } catch (e) {
        console.log(e);
        alert("Unexpected Error");
      }
    },
    loadMore: (state, action: PayloadAction<number>) => {
      try {
        const localMessages = retrieveLocalMessages(action.payload);
        return {
          messages: localMessages.data.concat(state.messages),
          more: localMessages.more,
        };
      } catch (e) {
        console.log(e);
        alert("Unexpected Error");
      }
    },
  },
});

export type { IMessage };

export const { newMessage, loadMore } = messageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getMessages = (state: RootState): IMessage[] =>
  state.message.messages;

export const isMoreMessage = (state: RootState): boolean => state.message.more;

export default messageSlice.reducer;
