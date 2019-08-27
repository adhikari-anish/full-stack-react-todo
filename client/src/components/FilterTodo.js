import React, { Component } from "react";

class FilterTodo extends Component {
  state = {
    sortBy: "Date"
  };

  changeFilter = e => {
    this.props.filter(e.target.value);
  };

  changeSort = e => {
    this.setState({
      sortBy: e.target.value
    });

    this.props.changeSort(e.target.value);
  };

  changeOrder = e => {
    this.props.changeOrder(e.target.value, this.state.sortBy);
    // console.log(e.target.value, this.state.sortBy);
  };

  render() {
    return (
      <div>
        <span>Filter: </span>
        <select onChange={this.changeFilter}>
          {/* <option hidden>Filter</option> */}
          <option>All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incompleted</option>
        </select>

        <span>Sort by: </span>
        <select onChange={this.changeSort}>
          {/* <option hidden>Sort by</option> */}
          <option value="Date">Date</option>
          <option value="Title">Title</option>
        </select>

        <span>Order: </span>
        <select onChange={this.changeOrder}>
          <option value="Desc">Desc</option>
          <option value="Asc">Asc</option>
        </select>
      </div>
    );
  }
}

export default FilterTodo;
