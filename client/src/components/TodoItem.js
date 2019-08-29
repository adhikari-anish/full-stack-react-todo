import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTextArea: false,
      note: props.todo.note
    };
  }

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ note: nextProps.note });
  // }

  toggleTextArea = () => {
    if (!this.state.displayTextArea) {
      this.setState({ displayTextArea: true });
      // console.log(this.props.todo);
      this.props.getNote(this.props.todo.note);
      // this.setState({ note: "" });
    } else {
      this.setState({ displayTextArea: false });
      this.props.addNote(this.props.todo.id, this.state.note);
      // this.props.getNote();
    }
  };

  getTextValue = e => {
    // console.log(e.target.value);
    this.setState({ note: e.target.value });
  };

  render() {
    const { id, title, completed, note } = this.props.todo;
    console.log(this.props.todo);

    let textArea;

    if (this.props.openTextView) {
      textArea = (
        <>
          <textarea
            type="text"
            className="add-note"
            style={{ resize: "none" }}
            value={this.state.note}
            onChange={this.getTextValue}
          />
          <button onClick={() => this.setState({ displayTextArea: false })}>
            Hide note
          </button>
        </>
      );
    } else {
      textArea = null;
    }

    return (
      <div style={this.getStyle()} className="clearfix">
        <p>
          <button onClick={() => this.toggleTextArea()}>Note</button>
          <input
            id="checkBox"
            type="checkbox"
            checked={completed}
            onChange={() => this.props.markComplete(id)}
          />{" "}
          {title}
          <button onClick={() => this.props.delTodo(id)} className="delete-btn">
            Delete
          </button>
          {/* <button
            id="edit-button"
            onClick={() => this.props.editTodo(id, title)}
          >
            Edit
          </button> */}
          <button
            id="edit-button"
            onClick={() => {
              this.props.setTrue();
              this.props.getId(id);
              // this.props.getTitle(id);
              this.props.getTitle(title);
            }}
          >
            Edit
          </button>
        </p>
        <span className="todo-date">{this.props.todo.created_at}</span>
        <div>{textArea}</div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;
