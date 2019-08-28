import React from "react";
// import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "../../src/App.css";
import Todos from "./Todos";
// import Header from "./layout/Header";
import AddTodo from "./AddTodo";
// import About from "./pages/About";
import TodoStatus from "./TodoStatus";
// // import uuid from "uuid";
// import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import checkLogin from "./CheckLogin";
import EditDialog from "./EditDialog";
import FilterTodo from "./FilterTodo";

class TodoMain extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      isOpen: false
    };
  }

  getUserName() {
    if (localStorage.usertoken) {
      axiosInstance
        .get("/users/profile/")
        .then(res => this.props.setUserName(res.data));
    }
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      axiosInstance.get("/api/todos?sort=-created_at").then(res => {
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

  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // };

    axiosInstance
      .post("api/todo", {
        title,
        completed: false
      })
      .then(res => {
        this.setState({ todos: [...res.data, ...this.state.todos] });
      });
    // this.setState({ todos: [...this.state.todos, newTodo] });
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

  // rTask = () => {
  //   let cList = this.state.todos.filter(todo => {
  //     return todo.completed === true;
  //   });
  //   let rList = this.state.todos.length - cList.length;
  //   return rList;
  // }

  editTodo = (id, title) => {
    // var eTodo = prompt("Edit todo:", title);
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
    this.state.editId = id;
  };

  filter = status => {
    if (status === "Completed") {
      axiosInstance
        .get("/api/todos?sort=-created_at&completed=true")
        .then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
    } else if (status === "Incomplete") {
      axiosInstance
        .get("/api/todos?sort=-created_at&completed=false")
        .then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
    } else if (status === "All") {
      axiosInstance.get("/api/todos?sort=-created_at").then(res => {
        // console.log(res.data);
        this.setState({ todos: res.data });
      });
    }
  };

  changeSort = sortBy => {
    if (sortBy === "Title") {
      axiosInstance.get("/api/todos?sort=-title").then(res => {
        // console.log(res.data);
        this.setState({ todos: res.data });
      });
      // console.log("date");
    } else if (sortBy === "Date") {
      axiosInstance.get("/api/todos?sort=-created_at").then(res => {
        // console.log(res.data);
        this.setState({ todos: res.data });
      });
    }
  };

  changeOrder = (order, sortBy) => {
    if (sortBy === "Date") {
      if (order === "Asc") {
        axiosInstance.get("/api/todos?sort=created_at").then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
      } else if (order === "Desc") {
        axiosInstance.get("/api/todos?sort=-created_at").then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
      }
    } else if (sortBy === "Title") {
      if (order === "Asc") {
        axiosInstance.get("/api/todos?sort=title").then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
      } else if (order === "Desc") {
        axiosInstance.get("/api/todos?sort=-title").then(res => {
          // console.log(res.data);
          this.setState({ todos: res.data });
        });
      }
    }
  };

  getTitle = title => {
    this.state.editTitle = title;
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
        <FilterTodo
          filter={this.filter}
          changeSort={this.changeSort}
          changeOrder={this.changeOrder}
        />
        {this.state.todos.length === 0 ? (
          <div
            style={{
              fontSize: "20px",
              textAlign: "center",
              backgroundColor: "gray"
            }}
          >
            Nothings yet
          </div>
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
        />
        <TodoStatus calTask={this.calTask} />
      </div>
    );
  }
}

export default checkLogin(TodoMain);
