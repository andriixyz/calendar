import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent } from "../redux/actions/actions";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      duration: 0,
      title: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    let start = Number(this.state.start);
    let duration = Number(this.state.duration);
    let title = this.state.title;

    if (start + duration >= 600) {
      alert("Please, choose correct time.");
      return;
    }
    this.props.addEvent(start, duration, title);

    this.setState({
      start: "",
      duration: "",
      title: ""
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="calendar-add-form">
          <label htmlFor="event-start">Event start: </label>
          <input
            type="number"
            name="start"
            value={this.state.start}
            onChange={this.handleChange}
            id="event-start"
            max="600"
            min="0"
          />
          <label htmlFor="event-duration">Event duration: </label>
          <input
            type="number"
            name="duration"
            value={this.state.duration}
            onChange={this.handleChange}
            id="event-duration"
            max="599"
            min="1"
          />
          <label htmlFor="event-title">Event title: </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="event-title"
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    );
  }
}
export default connect(
  null,
  {
    addEvent: addEvent
  }
)(AddForm);
