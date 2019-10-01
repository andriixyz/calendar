import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  saveUserInfo(login) {
    localStorage.setItem("login", login);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = { login: this.state.login };
    console.log(data);
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        if (response.response == "Login in") {
          document.location.reload(true);
          this.saveUserInfo(data.login);
        } else {
          alert(response.response);
        }
      });
  }

  render() {
    return (
      <div id="chat">
        <div className="chat-head">
          <h1>Calendar</h1>{" "}
        </div>
        <div className="chat-main">
          <div id="login-form">
            <form onSubmit={this.handleSubmit}>
              <h1>Account Login</h1>
              <p id="error" />
              <input
                type="text"
                name="login"
                maxLength="50"
                minLength="1"
                id="login-name"
                value={this.state.login}
                onChange={this.handleInputChange}
                placeholder="Login"
                required
              />
              <input type="submit" value="SIGN IN" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
