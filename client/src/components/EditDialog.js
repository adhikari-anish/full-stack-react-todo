import React, { Component } from "react";

let dialogBackground = {
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  position: "absolute",
  top: "0",
  left: "0"
};

let dialogStyles = {
  width: "500px",
  maxWidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#eee",
  padding: "17px 25px 26px",
  borderRadius: "8px"
};

let dialogCloseButtonStyles = {
  padding: "5px",
  width: "25px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  fontWeight: "bold",
  float: "right",
  backgroundColor: "red",
  outline: "none"
};

class EditDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
    // console.log("props", props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.editTitle });
  }

  // componentWillMount() {
  //   this.setState({ title: this.props.editTitle });
  // }

  onChange = e => {
    this.setState({ title: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.editTodo(this.props.getId, this.state.title);
    this.setState({ title: "" });
    this.props.setFalse();
  };

  render() {
    // console.log(this.state.editTitle);
    let dialog = (
      <div style={dialogBackground}>
        <div style={dialogStyles}>
          <button
            style={dialogCloseButtonStyles}
            onClick={this.props.setFalse}
            className="closeButton"
          >
            X
          </button>
          <form onSubmit={this.onSubmit} className="edit-form">
            <input
              type="text"
              placeholder="Edit Todo"
              value={this.state.title}
              // value={this.props.editTitle}
              onChange={this.onChange}
              required
            />
            <input type="submit" value="Edit" />
          </form>
        </div>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default EditDialog;
