import ADD_EVENT from "../actions/actions";
import DELETE_EVENT from "../actions/actions";

const initialState = {
  events: []
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        events: [
          ...state.events,
          {
            start: action.start,
            duration: action.duration,
            title: action.title
          }
        ]
      };
    case DELETE_EVENT:
      return {
        events: state.events.filter((value, index) => index != action.index)
      };

    default:
      return state;
  }
}
