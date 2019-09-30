import { createStore } from "redux";
import mainReducer from "../reducers/reducers";

export default createStore(
  mainReducer,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
