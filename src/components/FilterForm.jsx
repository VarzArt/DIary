import React from "react";
import "../styles/FilterForm.css";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/MySelect/MySelect";
import debounce from "lodash.debounce";

const FilterForm = ({ filter, setFilter, setPage }) => {
  const updateQuery = (e) => {
    setFilter({ ...filter, query: e?.target?.value });
    setPage(1);
  };
  const debouncedOnChange = debounce(updateQuery, 200);

  return (
    <div className="filterForm">
      <div className="filterForm__title">Search Parameters</div>
      <div className="filterForm__content">
        <div className="filterForm__sort">
          <h1 className="filterForm__sort_title">Sort by:</h1>
          <div className="filterFomr__sort_btns">
            <MySelect
              value={filter.sort}
              onChange={(selectedSort) => {
                setFilter({ ...filter, sort: selectedSort });
                setPage(1);
              }}
              options={[
                { value: "title", name: "Title" },
                { value: "date", name: "Ascending date" },
                { value: "date&_order=desc", name: "Descending date" },
              ]}
            />
          </div>
        </div>
        <div className="filterForm__filter">
          <h1 className="filterForm__filter_title">Filter by:</h1>
          <div className="filterForm__filter_content">
            <div className="filterForm__filter_content-name">
              <h1 className="filterForm__filter_content-name-title">Title</h1>
              <MyInput
                type="text"
                placeholder="Enter title"
                onChange={debouncedOnChange}
              />
            </div>
            <div className="filterForm__filter_content-date">
              <h1 className="filterForm__filter_content-date-title">Date</h1>
              from
              <input
                lang="en"
                type="date"
                value={filter.dateBot}
                onChange={(e) => {
                  setFilter({ ...filter, dateBot: e.target.value });
                  setPage(1);
                }}
              />
              to
              <input
                lang="en"
                type="date"
                value={filter.dateTop}
                onChange={(e) => {
                  setFilter({ ...filter, dateTop: e.target.value });
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
