import { useState, useEffect } from "react";

const DEFAULT_FILTERS = {
  visibility: {
    term: true,
    duration: true,
    ratings: true,
    ytm: true,
    mSpread: true,
    gSpread: true,
    price: false,
    nominalPercentage: false,
    tcd: false,
    couponRate: false,
    tradingVolumeLiquidity10Days: false,
    tradingVolumeTodayRUB: false,
    priceChangeDay: false,
    ytmChangeDay: false,
    qualifiedOnlyFlag: false,
    currency: false,
    couponFormula: false,
    zSpread: false,
    couponFrequency: false,

    sector: false,
    type: false,

    tradingVolumeSession: false,
    branch: false,
    changePriceToTommorow: false,
    listingLevel: false,
  },
  titles: {
    term: "Срок, лет",
    duration: "Дюрация, %",
    ratings: "Кредитный рейтинг",
    ytm: "YTM",
    mSpread: "М-спред",
    gSpread: "G-спред",
    price: "Цена",
    nominalPercentage: "% от номинала",
    tcd: "ТКД",
    couponRate: "Ставка купона",
    tradingVolumeLiquidity10Days: "Объем торгов",
    tradingVolumeTodayRUB: "Дневной оборот",
    priceChangeDay: "Изменение цены за день",
    ytmChangeDay: "Изменение YTM за день",
    qualifiedOnlyFlag: "Ограничения",
    currency: "Валюта инструмента",
    couponFormula: "Формула купона",
    zSpread: "Z-спрэд",
    couponFrequency: "Частота купона",

    sector: "Сектор торгов",
    type: "Тип бумаги",
    tradingVolumeSession: "Объем торгов за сегодня",
    branch: "Отрасль",
    changePriceToTommorow: "Изменение цены к вчера",

    listingLevel: "Уровень листинга",
  },
};

const useLocalStorageFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters);
        if (typeof parsedFilters === "object" && parsedFilters !== null) {
          setFilters(parsedFilters);
        } else {
          console.warn(
            "Некорректные данные в localStorage. Используются значения по умолчанию."
          );
          localStorage.setItem("filters", JSON.stringify(DEFAULT_FILTERS));
          setFilters(DEFAULT_FILTERS);
        }
      } catch (error) {
        console.error("Ошибка при парсинге данных из localStorage:", error);
        localStorage.setItem("filters", JSON.stringify(DEFAULT_FILTERS));
        setFilters(DEFAULT_FILTERS);
      }
    }
  }, []);

  const updateFilter = (key, value, filterType = "visibility") => {
    if (!filters[filterType] || typeof filters[filterType] !== "object") {
      console.error("Некорректный тип данных filters", filters);
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: {
        ...prevFilters[filterType],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]); // Отслеживаем изменения filters

  return { filters, updateFilter };
};

export default useLocalStorageFilters;
