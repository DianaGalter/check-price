import type { Language } from "./types";

export const translations = {
  ru: {
    search: {
      title: "Поиск товара",
      placeholder: "Введите название или артикул",
      found: "Найдено товаров",
      noResults: "Товары не найдены",
      hint: "Можно искать по названию товара или части артикула",
    },

    product: {
      article: "Артикул",
      color: "Цвет",
      price: "Цена",
      barcode: "Штрихкод",
    },

    settings: {
      title: "Настройки",
      theme: "Тема",
      language: "Язык",
      light: "Светлая",
      dark: "Тёмная",
      about: "О приложении",
    },

    common: {
      back: "Вернуться к списку",
      close: "Закрыть",
    },
  },

  en: {
    search: {
      title: "Product search",
      placeholder: "Enter product name or article",
      found: "Products found",
      noResults: "No products found",
      hint: "You can search by product name or part of the article",
    },

    product: {
      article: "Article",
      color: "Color",
      price: "Price",
      barcode: "Barcode",
    },

    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      light: "Light",
      dark: "Dark",
      about: "About",
    },

    common: {
      back: "Back to results",
      close: "Close",
    },
  },
} satisfies Record<Language, object>;