import React from "react";
import "../../src/App.css";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import TodoStatus from "./TodoStatus";
import { axiosInstance } from "./axiosInstance";
import checkLogin from "./CheckLogin";
import EditDialog from "./EditDialog";
import FilterTodo from "./FilterTodo";

class TodoMain extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      isOpen: false,
      sortBy: "created_at",
      orderBy: "desc",
      filter: "all",
      editId: "",
      editTitle: "",
      note: undefined
    };
  }

  setFilterState = (name, state) => {
    if (state === "Date") {
      state = "created_at";
    }
    this.setState({ [name]: state }, () => {
      this.fetchData();
    });
  };

  fetchData = () => {
    axiosInstance
      .get(
        `/api/todos?filter=${this.state.filter}&orderBy=${this.state.orderBy}&sortBy=${this.state.sortBy}`
      )
      .then(res => {
        this.setState({ todos: res.data });
      });
  };

  getUserName() {
    if (localStorage.usertoken) {
      axiosInstance
        .get("/users/profile/")
        .then(res => this.props.setUserName(res.data));
    }
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      axiosInstance.get("/api/todos").then(res => {
        // console.log(res.data);
        this.setState({ todos: res.data });
      });
    }
    this.getUserName();
  }

  markComplete = id => {
    axiosInstance({
      method: "put",
      url: `/api/marktodo/${id}`
    }).then(res =>
      this.setState({
        todos: this.state.todos.map(todo => {
          if (id === todo.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      })
    );
  };

  delTodo = id => {
    axiosInstance.delete(`api/todo/${id}`).then(res =>
      this.setState({
        todos: this.state.todos.filter(todo => id !== todo.id)
      })
    );
  };

  addNote = (id, note) => {
    axiosInstance
      .put(`/api/todo/${id}`, {
        note
      })
      .then(res => {
        this.setState({
          todos: this.state.todos.map(todo => {
            if (id === todo.id) {
              todo.note = note;
            }
            return todo;
          })
        });
        // console.log(id);
        // console.log(this.state.todos);
      });
  };

  getNote = note => {
    this.setState({ note });
    // console.log(note);
    // return this.state.note.data;
  };

  addTodo = title => {
    axiosInstance
      .post("api/todo", {
        title,
        completed: false
      })
      .then(res => {
        if (this.state.filter !== "Completed") {
          this.setState({ todos: [...res.data, ...this.state.todos] });
        }
      });
  };

  calTask = task => {
    let cList = this.state.todos.filter(todo => {
      return todo.completed === true;
    });
    if (task === "cTask") {
      return cList.length;
    } else if (task === "rTask") {
      return this.state.todos.length - cList.length;
    }
  };

  editTodo = (id, title) => {
    if (title === "") {
      return;
    }

    axiosInstance({
      method: "put",
      url: `/api/todo/${id}`,
      data: {
        title: title,
        completed: false
      }
    }).then(() =>
      this.setState({
        todos: this.state.todos.map(todo => {
          if (id === todo.id) {
            todo.title = title;
            todo.completed = false;
          }
          return todo;
        })
      })
    );
  };

  setTrue = () => {
    this.setState({ isOpen: true });
  };

  setFalse = () => {
    this.setState({ isOpen: false });
  };

  getId = id => {
    // this.state.editId = id;
    this.setState({ editId: id });
  };

  getTitle = title => {
    // this.state.editTitle = title;
    this.setState({ editTitle: title });
    // console.log(title);
  };

  render() {
    return (
      <div className="wrapper">
        <EditDialog
          isOpen={this.state.isOpen}
          setFalse={this.setFalse}
          editTodo={this.editTodo}
          getId={this.state.editId}
          editTitle={this.state.editTitle}
        />
        <AddTodo addTodo={this.addTodo} />
        <FilterTodo setFilterState={this.setFilterState} />
        {this.state.todos.length === 0 ? (
          <div className="no-todos">No tasks</div>
        ) : (
          <div></div>
        )}
        <Todos
          todos={this.state.todos}
          delTodo={this.delTodo}
          markComplete={this.markComplete.bind(this)}
          getId={this.getId}
          editTodo={this.editTodo.bind(this)}
          isOpen={this.state.isOpen}
          setTrue={this.setTrue}
          getTitle={this.getTitle}
          addNote={this.addNote}
          getNote={this.getNote}
          note={this.state.note}
        />
        <TodoStatus calTask={this.calTask} filterState={this.state.filter} />
      </div>
    );
  }
}

export default checkLogin(TodoMain);
