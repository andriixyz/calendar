import React, { Component } from "react";
import AddForm from "./AddForm";
import CalendarEvents from "./CalendarEvents";
import CalendarTime from "./CalendarTime";
class Calendar extends Component {
  render() {
    return (
      <div id="calendar">
        <AddForm />
        <div className="calendar-events-time">
          <CalendarTime />
          <CalendarEvents />
        </div>
      </div>
    );
  }
}
export default Calendar;
