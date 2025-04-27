import React from "react";

type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({query, setQuery}) => (
    <div className="d-flex flex-column align-items-center">
        <input
            type="text"
            placeholder="Enter tags separated by commas (e.g., cat, nature)"
            className="form-control mb-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    </div>
);

export default SearchBar;