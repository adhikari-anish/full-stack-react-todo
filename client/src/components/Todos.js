import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
// import { prototype } from 'stream';

class Todos extends Component {
  //display:id=null
  render() {
    // console.log(this.props.todos);
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        delTodo={this.props.delTodo}
        markComplete={this.props.markComplete}
        editTodo={this.props.editTodo}
        isOpen={this.props.isOpen}
        setTrue={this.props.setTrue}
        getId={this.props.getId}
        getTitle={this.props.getTitle}
        addNote={this.props.addNote}
        getNote={this.props.getNote}
        note={this.props.note}
        // openTextView=(todo.id===this.state.displayId)
      />
    ));
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  delTodo: PropTypes.func.isRequired,
  markComplete: PropTypes.func.isRequired
};

export default Todos;
