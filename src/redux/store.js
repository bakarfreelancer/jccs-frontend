import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currentUser"],
};

const rootReducer = combineReducers({
  currentUser: userReducer,
  posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

export default store;
