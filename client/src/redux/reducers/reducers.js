import { ADD_EVENT } from "../actions/actions";
import { DELETE_EVENT } from "../actions/actions";
import { SELECT_EVENTS } from "../actions/actions";
import { UPLOAD_EVENTS } from "../actions/actions";
import { UNSELECT_EVENTS } from "../actions/actions";

const initialState = {
  events: [],
  isSelected: false
};

export default function mainReducer(state = initialState, action) {
  console.log("TYPE: ", action.type);
  var newState = {};
  switch (action.type) {
    case ADD_EVENT:
      newState = {
        events: [
          ...state.events,
          {
            start: action.start,
            duration: action.duration,
            title: action.title
          }
        ],
        isSelected: state.isSelected
      };

      var n = newState.events.length;
      for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
          if (newState.events[j + 1] < newState.events[j]) {
            var t = newState.events[j + 1];
            newState.events[j + 1] = newState.events[j];
            newState.events[j] = t;
          }
        }
      }

      fetch("/changeState", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: newState.events,
          login: localStorage.getItem("login")
        })
      });

      return newState;
    case DELETE_EVENT:
      newState = {
        events: state.events.filter((value, index) => index != action.index),
        isSelected: state.isSelected
      };

      fetch("/changeState", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: newState.events,
          login: localStorage.getItem("login")
        })
      });

      return newState;
    case UPLOAD_EVENTS:
      newState = {
        events: action.events,
        isSelected: false
      };
      fetch("/changeState", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: newState.events,
          login: localStorage.getItem("login")
        })
      });
      return newState;
    case SELECT_EVENTS:
      return {
        events: state.events,
        isSelected: true
      };
    case UNSELECT_EVENTS:
      return {
        events: state.events,
        isSelected: false
      };
    default:
      return state;
  }
}
