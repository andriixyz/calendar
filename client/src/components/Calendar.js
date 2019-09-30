import { Component } from "react";
import AddForm from "./AddForm";
import CalendarEvents from "./CalendarEvents";

export default class Calendar extends Component {
  render() {
    return (
      <div>
        <AddForm></AddForm>
        <CalendarEvents></CalendarEvents>
      </div>
    );
  }
}
