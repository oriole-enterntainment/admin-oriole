import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import adminData from "./redux/slice/userData";

const reducers = combineReducers({
  adminData,
});

const middleware = [thunk];

// export const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

export const store = configureStore({
  reducer: {
    adminData,
  },
});
