import { combineReducers } from "redux";
import auth from "./auth.reducer";
import ui from "./ui.reducer";
import data from "./data.reducer";

export default combineReducers({
  auth,
  ui,
  data
});