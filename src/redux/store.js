import { configureStore } from "@reduxjs/toolkit";
import bondReducer from "./bonds";

import { thunk } from "redux-thunk";

export default configureStore({
  reducer: {
    bond: bondReducer,
  },
  applyMiddleware: [thunk],
});
