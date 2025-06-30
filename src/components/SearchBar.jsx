const SearchBar = ({ value, onChange, placeholder }) => (
  <input
    className="form-control mb-3"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default SearchBar;
