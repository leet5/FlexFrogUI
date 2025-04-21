import React from 'react';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({value, onChange, onSearch}) => (
    <div className="d-flex flex-column align-items-center">
        <input
            type="text"
            placeholder="Enter tags separated by commas (e.g., cat, nature)"
            className="form-control mb-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        <button className={`btn froggy-btn mt-2 fade-animation ${value.trim() === '' ? 'fade-animation-hidden' : ''}`}
                onClick={onSearch}>
            Search
        </button>
    </div>
);

export default SearchBar;