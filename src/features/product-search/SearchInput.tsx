interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <search>
      <input
        id="product-search"
        type="search"
        placeholder="Search by name or article number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </search>
  );
};
