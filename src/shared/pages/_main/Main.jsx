import React, {useState} from 'react';
import Search from "../../ui/Search";
import BookList from "../../ui/Book/BookList";
import debounce from "lodash.debounce";

const Main = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  const handleFilterChange = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
  };

  const handleSortChange = (selectedSort) => {
    setSelectedSort(selectedSort);
  };

  return (
    <>
      <Search
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <BookList
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        selectedSort={selectedSort}
      />
    </>
  );
};

export default Main;