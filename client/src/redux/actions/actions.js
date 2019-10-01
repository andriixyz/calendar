export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const SELECT_EVENTS = "SELECT_EVENTS";
export const UNSELECT_EVENTS = "UNSELECT_EVENTS";
export const UPLOAD_EVENTS = "UPLOAD_EVENTS";

export function addEvent(start, duration, title) {
  return { type: ADD_EVENT, start: start, duration: duration, title: title };
}
export function deleteEvent(index) {
  return { type: DELETE_EVENT, index: index };
}
export function selectEvents() {
  return { type: SELECT_EVENTS };
}
export function unselectEvents() {
  return { type: UNSELECT_EVENTS };
}
export function uploadEvents(events) {
  return { type: UPLOAD_EVENTS, events: events };
}
