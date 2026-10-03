import styles from "./SearchInput.module.scss";
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
  onScanClick: () => void;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
  onScanClick,
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

      {!value && (
        <button
          type="button"
          className={styles.scanButton}
          onClick={onScanClick}
          aria-label="Сканировать штрихкод"
        >
          <svg
            className={styles.scanIcon}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M7 7v10M10 7v10M13 7v10M17 7v10"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            <path
              d="M2 12h20"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

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
