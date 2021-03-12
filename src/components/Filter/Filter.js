import React from "react";
import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ filterValue, onFilter }) => {
  return (
    <form className={s.wrapper}>
      <label>
        Find contacts by name{" "}
        <input type="text" value={filterValue} onChange={onFilter} />
      </label>
    </form>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
