export type Language = "ru" | "en";

export const translations = {
  ru: {
    search: {
      placeholder: "Название модели или артикул",
      ariaLabel: "Поиск чемодана",
      resultsCount: "Найдено чемоданов",
      noResults: "Чемоданы не найдены",
      hint: "Можно искать по названию модели или части артикула",
    },

    emptyState: {
      title: "Найдите чемодан",
      description: "Введите название модели или артикул",
    },

    productDetails: {
      back: "Вернуться к списку",
      info: "Информация о чемодане",

      article: "Артикул",
      dimensions: "Размеры",
      dimensionUnit: "см",
      weight: "Вес",
      weightUnit: "кг",
      volume: "Объём",
      volumeUnit: "л",

      suitcasePrice: "Цена чемодана",
      setPrice: "Цена сета",
      setOfThree: "Сет из 3 шт.",
      setOfFour: "Сет из 4 шт.",

      barcode: "Штрихкод",

      club: "С муадоном",
      suitcaseDiscount: "Скидка {discount} на чемодан",
      clubDiscountAria: "Скидка с муадоном",

      police: "Миштара",
      policeDiscount: "Доп. скидка 25%",
      policeDiscountAria: "Скидка Миштары",
    },

    storeSwitcher: {
      columbia: "Columbia",
      shvilim: "Ашкелон",
      ariaLabel: "Переключить магазин. Сейчас {store}",
    },

    languageSwitcher: {
      ariaLabel: "Switch language to English",
    },

    barcode: {
      title: "Штрихкоды",
      set: "Сет",
    }
  },

  en: {
    search: {
      placeholder: "Model name or article number",
      ariaLabel: "Search for a suitcase",
      resultsCount: "Suitcases found",
      noResults: "No suitcases found",
      hint: "Search by model name or part of the article number",
    },

    emptyState: {
      title: "Find a suitcase",
      description: "Enter a model name or article number",
    },

    productDetails: {
      back: "Back to the list",
      info: "Suitcase information",

      article: "Article",
      dimensions: "Dimensions",
      dimensionUnit: "cm",
      weight: "Weight",
      weightUnit: "kg",
      volume: "Volume",
      volumeUnit: "L",

      suitcasePrice: "Suitcase price",
      setPrice: "Set price",
      setOfThree: "3-piece set",
      setOfFour: "4-piece set",

      barcode: "Barcode",

      club: "Club member",
      suitcaseDiscount: "{discount} discount on suitcase",
      clubDiscountAria: "Club member discount",

      police: "Police",
      policeDiscount: "Extra 25% discount",
      policeDiscountAria: "Police discount",
    },

    storeSwitcher: {
      columbia: "Columbia",
      shvilim: "Ashkelon",
      ariaLabel: "Switch store. Current store: {store}",
    },
    
    languageSwitcher: {
      ariaLabel: "Переключить язык на русский",
    },

    barcode: {
      title: "Barcodes",
      set: "Set",
    }
  },
} as const;