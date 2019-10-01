import React, { Component } from "react";
import { deleteEvent } from "../redux/actions/actions";
import { unselectEvents } from "../redux/actions/actions";
import { connect } from "react-redux";

class Event extends Component {
  deleteEvent(index) {
    this.unselectEvents();
    this.props.deleteEvent(index);
  }
  unselectEvents() {
    this.props.unselectEvents();
  }
  render() {
    const style = {
      top: this.props.value.start + "px",
      height: this.props.value.duration + "px",
      width:
        this.props.value.width == "100%"
          ? this.props.value.width
          : this.props.value.width + "px",
      left:
        this.props.value.left == "0px"
          ? this.props.value.left
          : this.props.value.left + "px"
    };
    if (this.props.value.isSelected) {
      console.log(this.props.key);
      return (
        <li className="calendar-event calendar-event-selected" style={style}>
          <button
            className="calendar-event-button"
            onClick={() => this.deleteEvent(this.props.value.key)}
          ></button>
          <p className="calendar-title">{this.props.value.title}</p>
        </li>
      );
    } else {
      console.log(this.props.key);
      return (
        <li className="calendar-event" style={style}>
          <p className="calendar-title">{this.props.value.title}</p>
        </li>
      );
    }
  }
}
export default connect(
  null,
  {
    deleteEvent: deleteEvent,
    unselectEvents: unselectEvents
  }
)(Event);
