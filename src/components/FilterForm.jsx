import React from "react";
import "../styles/FilterForm.css";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/MySelect/MySelect";
import MyButton from "./UI/button/MyButton";
import undo from "../assets/images/undo.svg"

const FilterForm = ({filter, setFilter, setPage}) => {

	const resetFilters = () => {
		setFilter({
			sort: "",
			query: "",
			dateBot: new Date(0).toDateString(),
			dateTop: new Date(2639997412690).toDateString(),
		})
	}

  return (
    <div className="filterForm">
      <div className="filterForm__title">Search Parameters</div>
      <div className="filterForm__content">
        <div className="filterForm__sort">
          <h1 className="filterForm__sort_title">Sort by:</h1>
          <div className="filterFomr__sort_btns">
						<MySelect 
						value={filter.sort}
						onChange={selectedSort => {setFilter({...filter, sort: selectedSort}); setPage(1)}}
						options={[
							{value: 'title', name: 'Title'},
							{value: 'date', name: 'Ascending date'},
							{value: 'date&_order=desc', name: 'Descending date'},
						]}
						/>
          </div>
        </div>
        <div className="filterForm__filter">
          <h1 className="filterForm__filter_title">Filter by:</h1>
          <div className="filterForm__filter_content">
            <div className="filterForm__filter_content-name">
              <h1 className="filterForm__filter_content-name-title">Title</h1>
              <MyInput placeholder="Enter title" value = {filter.query} onChange = {e => {setFilter({...filter, query: e.target.value}); setPage(1)}}/>
            </div>
						<div className="filterForm__bot">
            <div className="filterForm__filter_content-date">
              <h1 className="filterForm__filter_content-date-title">Date</h1>
              from
              <input lang="en" type="date" value={filter.dateBot} onChange={e => {setFilter({...filter, dateBot: e.target.value}); setPage(1)}}/>
              to
              <input lang="en" type="date" value={filter.dateTop} onChange={e => {setFilter({...filter, dateTop: e.target.value}); setPage(1)}}/>
            </div>
						<MyButton src = {undo} onClick = {resetFilters}>Reset filters</MyButton>
						</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
