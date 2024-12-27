import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const SearchFilter = ({
  filterData,
  setFilterData,
  searchApiHandler,
  pagination,
  setPagination,
  isSearchTooltip,
  isTdsUser,
  userSearchApiHandler
}) => {
  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setFilterData((prevData) => ({
  //     ...prevData,
  //     search: value,
  //     filterClose: value !== ""
  //   }));
  // };

  const handleChange = (event) => {
    const { value } = event.target;
    // Check if the input value starts with a space
    if (!value.startsWith(" ")) {
      setFilterData((prevData) => ({
        ...prevData,
        search: value,
        filterClose: value !== ""
      }));
    }
  };
  
  
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setPagination({
      ...pagination,
      page: 0
    });

    if (isTdsUser) {
      userSearchApiHandler(
        filterData.startDate,
        filterData.endDate,
        filterData.search.trim()
      );
    } else {
      searchApiHandler(
        filterData.startDate,
        filterData.endDate,
        filterData.search.trim()
      );
    }
  };

  const filterSearchHandler = () => {
    setFilterData({
      ...filterData,
      filterClose: false,
      search: ""
    });
    searchApiHandler(filterData.startDate, filterData.endDate,'');
  };

  return (
    <div className="search-filter-section">
      <FormControl className="search-input">
        <Tooltip
          title={
            isSearchTooltip?.isAllUser
              ? "Search By Full Name, User Name and Phone Number"
              : isSearchTooltip?.isAllGame
              ? "Search By Game Name"
              : isSearchTooltip?.isWithdrawalRequest
              ? "Search By User Name"
              : isSearchTooltip?.isLobbyTab
              ? "Search By Lobby Name and Lobby Description"
              : isSearchTooltip?.isRestrictGeo
              ? "Search By Country"
              : isSearchTooltip?.idUserDepositRequest
              ? "Search By Sender Name"
              : isSearchTooltip?.isGamePlayerRecord
              ? "Search By Table Id"
              : isSearchTooltip?.isTDSDistributions
              ? "Search By Pan Card Number"
              : ""
          }
        >
          <OutlinedInput
            id="component-outlined"
            placeholder="Search"
            className="input_search_field fontFamily"
            name="search"
            value={filterData?.search}
            onChange={handleChange}
            onKeyDown={handleKeyPress} 
          />
        </Tooltip>

        {filterData.filterClose && (
          <p onClick={filterSearchHandler}>
            <svg
              viewBox="0 0 24 24"
              x="1008"
              y="432"
              fit=""
              height="28"
              width="25"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                fill="#64748b"
              />
            </svg>
          </p>
        )}
      </FormControl>

      <Button
        variant="contained"
        className={
          filterData?.search?.length > 0
            ? "search_btn text-color active-filter-active"
            : "search_btn"
        }
        disabled={filterData?.search?.length < 1}
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          height="100%"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "24px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default SearchFilter;
