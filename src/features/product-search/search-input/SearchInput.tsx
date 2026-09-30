import styles from "./SearchInput.module.scss";
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SearchInputProps) => {
  return (
    <search className={styles.search}>
      <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </svg>

      <input
        className={styles.input}
        id="product-search"
        type="search"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      {value && (
        <button
          className={styles.clearButton}
          type="button"
          aria-label="Очистить поиск"
          onClick={() => onChange("")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 7 10 10" />
            <path d="m17 7-10 10" />
          </svg>
        </button>
      )}
    </search>
  );
};
