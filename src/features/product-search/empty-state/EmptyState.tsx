import styles from "./EmptyState.module.scss";

export const EmptyState = () => {
  return (
    <>
      <svg className={styles.emptyImage} viewBox="0 0 320 410" fill="none">
        {/* <!-- Suitcase handle --> */}
        <path
          d="M116 137V58
            C116 43 127 32 142 32
            H185
            C200 32 211 43 211 58
            V137"
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <path
          d="M132 62
            V54
            C132 49 136 45 141 45
            H186
            C191 45 195 49 195 54
            V62"
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        {/* <!-- Suitcase body --> */}
        <path
          d="
            M91 137
            H235
            C247 137 257 147 257 159
            V242

            M257 359
            C257 368 249 376 239 376
            H91
            C79 376 69 366 69 354
            V159
            C69 147 79 137 91 137
          "
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        {/* <!-- Wheels --> */}
        <path
          d="M92 376V389
            C92 399 99 406 108 406
            C117 406 124 399 124 389
            V376"
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
        />

        <path
          d="M204 376V389
            C204 399 211 406 220 406
            C229 406 236 399 236 389
            V376"
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
        />

        {/* <!-- Magnifying glass --> */}
        <circle
          cx="218"
          cy="301"
          r="58"
          stroke="currentColor"
          stroke-width="7"
        />

        <circle
          cx="218"
          cy="301"
          r="43"
          stroke="currentColor"
          stroke-width="7"
        />

        {/* <!-- Magnifying glass handle --> */}
        <path
          d="M259 343L304 388"
          stroke="currentColor"
          stroke-width="16"
          stroke-linecap="round"
        />

        <path
          d="M259 343L304 388"
          stroke="currentColor"
          stroke-width="7"
          stroke-linecap="round"
        />
      </svg>

      <h2 className={styles.title}>Найдите товар</h2>
      <p className={styles.description}>Введите название товара или артикул</p>
    </>
  );
};
