import React, { Component } from "react";

class TodoStatus extends Component {
  render() {
    return (
      <div className="todo-status">
        <p>Task Completed: {this.props.calTask("cTask")}</p>
        <p>Task Remaining: {this.props.calTask("rTask")}</p>
      </div>
    );
  }
}

export default TodoStatus;
