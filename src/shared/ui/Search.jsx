import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import GenresService from "../../API/CategoryService";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({onSearch, onFilterChange, onSortChange}) => {
  const [search, setSearchQuery] = useState('')
  const handleFilterChange = (input) => {
    onFilterChange(input.value);
  };

  function handleSearch(e) {
    e.preventDefault()
    onSearch(search);
  }

  const filterOptions = async () => {
    try {
      const res = await GenresService.getAllGenres();
      return res
        .map((genre) => ({
          value: genre.id,
          label: `${genre.name}`
        }));
    } catch (error) {
      toast.error("Failed to fetch genres");
      return [];
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex justify-between items-center gap-5 mb-4">
        <form style={{width: "70%", display: "flex"}} onSubmit={(e) => handleSearch(e)}>
          <TextField
            fullWidth
            id="search-bar"
            onInput={(e) => {setSearchQuery(e.target.value);}}
            value={search}
            placeholder="Поиск"
            size="small"
          />
          <IconButton type="button" onClick={(e) => handleSearch(e)} aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </form>

        <div className="mt-4 gap-4 grid lg:flex lg:m-0">
          {/* Added ml-4 here */}
          <div className="relative flex items-center justify-between gap-2 w-full">
            <label htmlFor="filter" className="text-gray-600 whitespace-nowrap">
              Фильтр по :{" "}
            </label>
            <AsyncSelect
              placeholder="Жанры"
              loadOptions={filterOptions}
              onChange={handleFilterChange}
              defaultOptions
              className="w-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
