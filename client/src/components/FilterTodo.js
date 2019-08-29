import React, { Component } from "react";

class FilterTodo extends Component {
  setFilter = e => {
    this.props.setFilterState(e.target.name, e.target.value);
  };

  render() {
    return (
      <div className="filter">
        <span>Filter: </span>
        <select
          className="filter-select"
          onChange={this.setFilter}
          name="filter"
        >
          {/* <option hidden>Filter</option> */}
          <option>All</option>
          <option>Completed</option>
          <option>Incomplete</option>
        </select>

        <span>Sort by: </span>
        <select
          className="filter-select"
          onChange={this.setFilter}
          name="sortBy"
        >
          {/* <option hidden>Sort by</option> */}
          <option value="Date">Date</option>
          <option value="Title">Title</option>
        </select>

        <span>Order: </span>
        <select
          className="filter-select"
          onChange={this.setFilter}
          name="orderBy"
        >
          <option value="Desc">Desc</option>
          <option value="Asc">Asc</option>
        </select>
      </div>
    );
  }
}

export default FilterTodo;
