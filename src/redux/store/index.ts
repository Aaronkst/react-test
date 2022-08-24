import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  enhancers: [applyMiddleware(createStateSyncMiddleware())],
});

initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
