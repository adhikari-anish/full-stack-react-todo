import React, { Component } from "react";

class TodoStatus extends Component {
  render() {
    if (this.props.filterState === "Completed") {
      var display = (
        <>
          <p>Task Completed: {this.props.calTask("cTask")}</p>
        </>
      );
    } else if (this.props.filterState === "Incomplete") {
      display = (
        <>
          <p>Task Remaining: {this.props.calTask("rTask")}</p>
        </>
      );
    } else {
      display = (
        <>
          <p>Task Completed: {this.props.calTask("cTask")}</p>
          <p>Task Remaining: {this.props.calTask("rTask")}</p>
        </>
      );
    }
    return (
      <div className="todo-status">
        {/* <p>Task Completed: {this.props.calTask("cTask")}</p>
        <p>Task Remaining: {this.props.calTask("rTask")}</p> */}
        {display}
      </div>
    );
  }
}

export default TodoStatus;
