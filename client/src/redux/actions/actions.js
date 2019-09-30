export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export function addEvent(start, duration, title) {
  return { type: ADD_EVENT, start: start, duration: duration, title: title };
}
export function deleteEvent(index) {
  return { type: DELETE_EVENT, index: index };
}
