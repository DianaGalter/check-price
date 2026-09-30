export type Language = "ru" | "en";

export const translations = {
  ru: {
    search: {
      placeholder: "Название модели или артикул",
      resultsCount: "Найдено чемоданов",
      noResults: "Чемоданы не найдены",
      hint: "Можно искать по названию модели или части артикула",
    },

    emptyState: {
      title: "Найдите чемодан",
      description: "Введите название модели или артикул",
    },

    product: {
      article: "Артикул",
      dimensions: "Размеры",
      weight: "Вес",
      volume: "Объём",
      price: "Цена чемодана",
      setPrice: "Цена сета",
      setOfThree: "Сет из 3 шт.",
      setOfFour: "Сет из 4 шт.",
      barcode: "Штрихкод",
    },

    discounts: {
      club: "С муадоном",
      suitcaseDiscount: "Скидка {discount} на чемодан",
      police: "Миштара",
      policeDiscount: "Доп. скидка 25%",
    },

    stores: {
      columbia: "Columbia",
      shvilim: "Ашкелон",
    },
  },

  en: {
    search: {
      placeholder: "Model name or article number",
      resultsCount: "Suitcases found",
      noResults: "No suitcases found",
      hint: "Search by model name or part of the article number",
    },

    emptyState: {
      title: "Find a suitcase",
      description: "Enter a model name or article number",
    },

    product: {
      article: "Article",
      dimensions: "Dimensions",
      weight: "Weight",
      volume: "Volume",
      price: "Suitcase price",
      setPrice: "Set price",
      setOfThree: "3-piece set",
      setOfFour: "4-piece set",
      barcode: "Barcode",
    },

    discounts: {
      club: "Club member",
      suitcaseDiscount: "{discount} discount on suitcase",
      police: "Police",
      policeDiscount: "Extra 25% discount",
    },

    stores: {
      columbia: "Columbia",
      shvilim: "Ashkelon",
    },
  },
} as const;