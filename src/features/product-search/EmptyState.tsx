import emptySearchIllustration from "../../assets/illustrations/product-search-empty.svg";

export const EmptyState = () => {
  return (
    <>
      <img src={emptySearchIllustration} alt="" />

      <h2>Найдите товар</h2>
      <p>Введите название товара или артикул</p>
    </>
  );
};
