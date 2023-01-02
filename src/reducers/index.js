import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  autoRehydrate,
} from "redux-persist";
import thunk from "redux-thunk";
import usersReducer from "./usersReducer";
const persistConfig = {
  key: "persistroot",
  version: 1,
  storage,
};

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ users: usersReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(
//   persistedReducer,
//   composeEnchancer(applyMiddleware(thunk))
//   // autoRehydrate()
// );
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
