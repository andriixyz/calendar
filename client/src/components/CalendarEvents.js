import React, { Component } from "react";
import Event from "./Event";
import { connect } from "react-redux";
import { selectEvents } from "../redux/actions/actions";
import { uploadEvents } from "../redux/actions/actions";

class CalendarEvents extends Component {
  constructor(props) {
    super(props);

    this.handleImport = this.handleImport.bind(this);
  }
  componentDidMount() {
    fetch("/getEvents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login: localStorage.getItem("login") })
    })
      .then(res => res.json())
      .then(response => {
        this.props.uploadEvents(response);
      });
  }
  selectEvents() {
    console.log(this.props);
    this.props.selectEvents();
  }

  logout() {
    localStorage.removeItem("login");
    document.location.reload(true);
  }
  handleImport(e) {
    e.preventDefault();
    var fileToLoad = document.getElementById("upload-data").files[0];

    var fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      const events = JSON.parse(textFromFileLoaded);

      this.props.uploadEvents(events);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
      _union.add(elem);
    }
    return _union;
  }

  intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }

  exportEvents() {
    var data = this.props.events;

    data.map((element, index) => {
      element.width = undefined;
      element.left = undefined;
    });

    var jsonData = JSON.stringify(data);
    var a = document.createElement("a");
    var file = new Blob([jsonData], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "events.txt";
    a.click();
  }
  formatEvents(events) {
    const formattedEvents = events;
    for (let i = 0; i < formattedEvents.length; ++i) {
      formattedEvents[i].width = "100%";
      formattedEvents[i].left = "0px";
    }
    const groups = [];

    const n = formattedEvents.length;
    formattedEvents.sort((left, right) => left[0] - right[0]);
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        if (
          formattedEvents[i].start + formattedEvents[i].duration >
            formattedEvents[j].start &&
          formattedEvents[i].start <= formattedEvents[j].start
        ) {
          groups.push(new Set([i, j]));
        }
      }
    }
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < groups.length; ++i) {
        for (let j = i + 1; j < groups.length; ++j) {
          if (this.intersection(groups[i], groups[j]).size != 0) {
            groups[i] = this.union(groups[i], groups[j]);
            groups.splice(j, 1);
            changed = true;
            break;
          }
        }
        if (changed) break;
      }
    }
    for (let i = 0; i < groups.length; ++i) {
      groups[i] = Array.from(groups[i]).sort();
    }
    console.log(groups);
    for (let i = 0; i < groups.length; ++i) {
      const arr = Array.from(groups[i]);
      for (let j = 0; j < arr.length; ++j) {
        formattedEvents[arr[j]].width = 200;
        formattedEvents[arr[j]].width /= arr.length;
        formattedEvents[arr[j]].left = formattedEvents[arr[j]].width * j;
      }
    }
    console.log("SSSSSSSSSSS", formattedEvents);
    return formattedEvents;
  }

  render() {
    const formattedEvents = this.formatEvents(this.props.events);

    const events = formattedEvents.map((event, index) => (
      <Event
        key={index}
        value={{
          start: String(event.start),
          duration: String(event.duration),
          title: String(event.title),
          width: event.width,
          left: event.left,
          isSelected: this.props.isSelected,
          key: index
        }}
      ></Event>
    ));

    return (
      <div>
        <div className="calendar-events">
          <ul id="calendar-events">{events}</ul>
        </div>
        <button
          onClick={() => {
            this.selectEvents();
          }}
        >
          SELECT
        </button>
        <button
          onClick={() => {
            this.exportEvents();
          }}
        >
          EXPORT
        </button>
        <button
          onClick={() => {
            this.logout();
          }}
        >
          LOGOUT
        </button>
        <form onSubmit={this.handleImport}>
          <input type="file" id="upload-data"></input>
          <button type="submit">IMPORT</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    isSelected: state.isSelected
  };
};

const mapDispatchToProprs = {
  selectEvents: selectEvents,
  uploadEvents: uploadEvents
};
export default connect(
  mapStateToProps,
  mapDispatchToProprs
)(CalendarEvents);
