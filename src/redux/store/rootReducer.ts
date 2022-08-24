import { combineReducers, AnyAction, Reducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import messageReducer from "../features/messages/messageSlice";

const appReducer = combineReducers({
  message: messageReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
