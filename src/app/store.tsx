import {
  combineReducers,
  configureStore,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import authSlice from "../features/auth/authSlice";
import chatSlice from "../features/chat/chatSlice";
import loginSlice from "../features/auth/loginSlice";
import registerSlice from "../features/auth/registerSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  chat: chatSlice,
  login: loginSlice,
  register: registerSlice,
});


// Procurar como não afetar as actions
/*
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/clearStore") {
    storage.removeItem("persist:root");
    state = {} as RootState;
  }

  return appReducer(state, action);
};
*/

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
