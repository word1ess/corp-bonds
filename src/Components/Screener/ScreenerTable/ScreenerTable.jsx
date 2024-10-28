import React, { useMemo, useReducer, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-dropdown-select";
import CustomTooltip from "../../Common/CustomTooltip/CustomTooltip";

// Компонент для фильтра
const Filter = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="filter">
      <Select
        options={options.map((option) => ({ label: option, value: option }))} // Преобразуем данные для dropdown
        values={
          selectedValue ? [{ label: selectedValue, value: selectedValue }] : []
        }
        onChange={(values) =>
          onChange(values.length > 0 ? values[0].value : "")
        }
        placeholder={`Фильтр по ${label.toLowerCase()}`} // Изменяем плейсхолдер
        searchable
        clearable
      />
    </div>
  );
};
const MultiSelectFilter = ({ label, options, selectedValues, onChange }) => {
  return (
    <div className="multi-select-filter">
      <MultiSelect
        options={options.map((option) => ({ label: option, value: option }))}
        value={selectedValues}
        onChange={onChange}
        labelledBy={label}
        overrideStrings={{
          selectSomeItems: label,
          allItemsAreSelected: "Все элементы выбраны",
          selectAll: "Выбрать все",
          unselectAll: "Снять все",
        }}
      />
    </div>
  );
};
const RangeDropdownFilter = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`range-dropdown-filter ${isOpen ? "active" : ""}`}>
      <div className="range-dropdown-filter__header" onClick={toggleDropdown}>
        <h3 style={{ cursor: "pointer" }}>{label}</h3>
        <svg viewBox="0 0 40 40">
          <path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="range-dropdown-filter__content">
          <p>Укажите {label.toLowerCase()} от и до</p>
          <div className="range-dropdown-filter__row">
            <input
              type="number"
              placeholder="От"
              value={minValue}
              onChange={(e) => onMinChange(e.target.value)}
            />
            <p>-</p>
            <input
              type="number"
              placeholder="До"
              value={maxValue}
              onChange={(e) => onMaxChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
// Редюсер для управления состоянием фильтров
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.filter]: action.value };
    case "RESET_FILTER":
      return { ...state, [action.filter]: "" };
    default:
      return state;
  }
};

const DataTable = ({ data, columns }) => {
  // Настройка таблицы с использованием react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="screener__table-wrapper">
      <table className="table" {...getTableProps()}>
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.03521 7.21484L6.00021 10.2498L2.96521 7.21484"
                            stroke="#8599B1"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 1.75V10.165"
                            stroke="#8599B1"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 6 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.72488 2.35999L2.86487 0.5L1.00488 2.35999"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.86475 9.5V0.5"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                    {/* Индикатор сортировки */}
                  </span>
                  <CustomTooltip
                    parent={column.accessor.name}
                    textTooltip={column.textTooltip}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Тело таблицы */}
        <tbody className="table-body" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                    {cell.column.Header === "Название" && (
                      <CustomTooltip
                        textTooltip="Добавить в портфель"
                        type="plus"
                        place="top-start"
                      />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
          {/* Если нет данных для отображения */}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                Нет данных для отображения
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableComponent = () => {
  const defaultVisibility = {
    duration: true,
    rating: true,
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
  };
  const initialFilters = {
    issuer: [],
    rating: [],
    type: [],
    term: { min: "", max: "" },
    duration: { min: "", max: "" }, // Изменено для диапазона
    ytm: { min: "", max: "" }, // Изменено для диапазона
    mSpread: { min: "", max: "" }, // Изменено для диапазона
    gSpread: { min: "", max: "" }, // Изменено для диапазона
    price: "",
    nominalPercentage: "",
    tcd: "", // ТКД
    couponRate: "",
    tradingVolumeLiquidity10Days: "",
    tradingVolumeTodayRUB: { min: "", max: "" }, // Изменено для диапазона
    priceChangeDay: { min: "", max: "" }, // Изменено для диапазона
    ytmChangeDay: "",
    qualifiedOnlyFlag: "",
    currency: "",
    couponFormula: "",
    zSpread: "",
    couponFrequency: "",
  };
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для поиска
  const [columnVisibility, setColumnVisibility] = useState(defaultVisibility);
  const [showSettings, setShowSettings] = useState(false);

  // Данные для таблицы
  const data = useMemo(
    () => [
      {
        title: "Облигация A",
        issuer: "Эмитент A",
        rating: "AA",
        type: "Государственная",
        term: "1 год",
        duration: "0.8 года",
        ytm: "3.5%",
        mSpread: "100 бп",
        gSpread: "50 бп",
        price: "1000 руб.",
        nominalPercentage: "100%",
        tcd: "1.5%",
        couponRate: "5%",
        tradingVolumeLiquidity10Days: "1M",
        tradingVolumeTodayRUB: "500K",
        priceChangeDay: "+0.5%",
        ytmChangeDay: "-0.1%",
        qualifiedOnlyFlag: "Да",
        currency: "RUB",
        couponFormula: "Фиксированная",
        zSpread: "50 бп",
        couponFrequency: "Ежегодно",
        isin: "RU000A0JX7A1", // Добавляем ISIN
      },
      {
        title: "Облигация B",
        issuer: "Эмитент B",
        rating: "A",
        type: "Корпоративная",
        term: "2 года",
        duration: "1.5 года",
        ytm: "4.0%",
        mSpread: "150 бп",
        gSpread: "70 бп",
        price: "950 руб.",
        nominalPercentage: "95%",
        tcd: "1.2%",
        couponRate: "4%",
        tradingVolumeLiquidity10Days: "500K",
        tradingVolumeTodayRUB: "200K",
        priceChangeDay: "-0.2%",
        ytmChangeDay: "+0.05%",
        qualifiedOnlyFlag: "Нет",
        currency: "USD",
        couponFormula: "Фиксированная",
        zSpread: "70 бп",
        couponFrequency: "Полугодично",
        isin: "US912828U816", // Добавляем ISIN
      },
      // Добавьте больше данных по необходимости
    ],
    []
  );

  // Фильтрация данных по выбранным условиям и поисковому запросу
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        Object.keys(filters).every((filterKey) => {
          if (Array.isArray(filters[filterKey])) {
            // Обработка мультивыборных фильтров
            return (
              filters[filterKey].length === 0 ||
              filters[filterKey].some(
                (selected) => selected.value === item[filterKey]
              )
            );
          } else if (typeof filters[filterKey] === "object") {
            // Обработка диапазонов
            const { min, max } = filters[filterKey];
            const value = parseFloat(item[filterKey]);
            return (
              (min === "" || value >= parseFloat(min)) &&
              (max === "" || value <= parseFloat(max))
            );
          } else {
            return filters[filterKey]
              ? item[filterKey]
                  .toLowerCase()
                  .includes(filters[filterKey].toLowerCase())
              : true;
          }
        }) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.isin.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [data, filters, searchTerm]);
  // Уникальные значения для фильтров
  const uniqueValues = (key) => [...new Set(data.map((item) => item[key]))];

  // Определение колонок таблицы в нужном порядке
  const columns = useMemo(() => {
    const cols = [
      { Header: "Название", accessor: "title", textTooltip: "lorem" },
      { Header: "Срок", accessor: "term" },
      {
        Header: "Дюрация",
        accessor: "duration",
        showColumn: columnVisibility.duration,
      },
      {
        Header: "Кредитный рейтинг",
        accessor: "rating",
        showColumn: columnVisibility.rating,
      },
      { Header: "YTM", accessor: "ytm", showColumn: columnVisibility.ytm },
      {
        Header: "М-спред",
        accessor: "mSpread",
        showColumn: columnVisibility.mSpread,
      },
      {
        Header: "G-спред",
        accessor: "gSpread",
        showColumn: columnVisibility.gSpread,
      },
      { Header: "Цена", accessor: "price", showColumn: columnVisibility.price },
      {
        Header: "% от номинала",
        accessor: "nominalPercentage",
        showColumn: columnVisibility.nominalPercentage,
      },
      { Header: "ТКД", accessor: "tcd", showColumn: columnVisibility.tcd },
      {
        Header: "Ставка купона",
        accessor: "couponRate",
        showColumn: columnVisibility.couponRate,
      },
      {
        Header: "Объем торгов / ликвидность за 10 дней",
        accessor: "tradingVolumeLiquidity10Days",
        showColumn: columnVisibility.tradingVolumeLiquidity10Days,
      },
      {
        Header: "Объем торгов за сегодня в рублях",
        accessor: "tradingVolumeTodayRUB",
        showColumn: columnVisibility.tradingVolumeTodayRUB,
      },
      {
        Header: "Изменение цены за день",
        accessor: "priceChangeDay",
        showColumn: columnVisibility.priceChangeDay,
      },
      {
        Header: "Изменение YTM за день",
        accessor: "ytmChangeDay",
        showColumn: columnVisibility.ytmChangeDay,
      },
      {
        Header: "Признак «только для квалов»",
        accessor: "qualifiedOnlyFlag",
        showColumn: columnVisibility.qualifiedOnlyFlag,
      },
      {
        Header: "Валюта инструмента",
        accessor: "currency",
        showColumn: columnVisibility.currency,
      },
      {
        Header: "Формула купона",
        accessor: "couponFormula",
        showColumn: columnVisibility.couponFormula,
      },
      {
        Header: "Z-спрэд",
        accessor: "zSpread",
        showColumn: columnVisibility.zSpread,
      },
      {
        Header: "Частота купона",
        accessor: "couponFrequency",
        showColumn: columnVisibility.couponFrequency,
      },
    ];

    return cols.filter((col) => col.showColumn !== false); // Фильтруем колонки по видимости
  }, [columnVisibility]);

  // Функция для сброса видимости колонок к значениям по умолчанию
  const resetColumnVisibility = () => {
    setColumnVisibility({
      ...defaultVisibility,
      rating: true, // Если нужно оставить только первые 6 колонок видимыми
      duration: true,
      ytm: true,
      mSpread: true,
      gSpread: true,
    });
  };

  return (
    <>
      <header className="screener__block">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск по названию или ISIN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <main className="screener__filters">
          <MultiSelectFilter
            label="Эмитент"
            options={uniqueValues("issuer")}
            selectedValues={filters.issuer}
            onChange={(value) =>
              dispatch({ type: "SET_FILTER", filter: "issuer", value })
            }
          />
          <RangeDropdownFilter
            label="Срок обращения"
            minValue={filters.term.min}
            maxValue={filters.term.max}
            onMinChange={(value) =>
              dispatch({
                type: "SET_FILTER",
                filter: "term",
                value: { ...filters.term, min: value },
              })
            }
            onMaxChange={(value) =>
              dispatch({
                type: "SET_FILTER",
                filter: "term",
                value: { ...filters.term, max: value },
              })
            }
          />
          <MultiSelectFilter
            label="Кредитный рейтинг"
            options={uniqueValues("rating")}
            selectedValues={filters.rating}
            onChange={(value) =>
              dispatch({ type: "SET_FILTER", filter: "rating", value })
            }
          />
        </main>
      </header>
      <div className="screener__btns">
        <button onClick={() => setShowSettings((prev) => !prev)}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 10.5H20"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10.5H6"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 14C15.933 14 17.5 12.433 17.5 10.5C17.5 8.567 15.933 7 14 7C12.067 7 10.5 8.567 10.5 10.5C10.5 12.433 12.067 14 14 14Z"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M26 21.5H22"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 21.5H6"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 25C19.933 25 21.5 23.433 21.5 21.5C21.5 19.567 19.933 18 18 18C16.067 18 14.5 19.567 14.5 21.5C14.5 23.433 16.067 25 18 25Z"
              stroke="#121213"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button>
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2506 12V15.3333C11.2506 16.6616 11.4855 17 12.9019 17C13.8213 17 13.9997 17 14.5448 17M8.99965 12L4.79297 17M18.972 12H17.9995C17.6109 12 17.4166 12 17.2633 12.0635C16.7413 12.2795 16.7484 12.7873 16.7484 13.25C16.7484 13.7127 16.7413 14.2206 17.2633 14.4366C17.4166 14.5 17.6109 14.5 17.9995 14.5C18.3881 14.5 18.5825 14.5 18.7357 14.5634C19.2577 14.7795 19.2506 15.2873 19.2506 15.75C19.2506 16.2127 19.2577 16.7205 18.7357 16.9366C18.5825 17 18.3881 17 17.9995 17H16.9403M4.79297 12L8.99965 17"
              stroke="#647383"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M13 21H8.72727C5.46607 21 3.83546 21 2.70307 20.2022C2.37862 19.9736 2.09058 19.7025 1.8477 19.3971C1 18.3313 1 16.7966 1 13.7273V11.1818C1 8.21865 1 6.73706 1.46894 5.55375C2.22281 3.65142 3.81714 2.15088 5.83836 1.44135C7.09563 1 8.66981 1 11.8182 1C13.6173 1 14.5168 1 15.2352 1.2522C16.3902 1.65765 17.3012 2.5151 17.732 3.60214C18 4.27832 18 5.12494 18 6.81818V9"
              stroke="#647383"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 11C1 9.15905 2.49238 7.66667 4.33333 7.66667C4.99912 7.66667 5.78404 7.78333 6.43137 7.60988C7.00652 7.45576 7.45576 7.00652 7.60988 6.43136C7.78333 5.78404 7.66667 4.99912 7.66667 4.33333C7.66667 2.49238 9.15905 1 11 1"
              stroke="#647383"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {showSettings && (
          <div className="screener__toggle-columns screener__block">
            <header className="screener__toggle-header">
              <h3>Настройки</h3>
              <button onClick={resetColumnVisibility}>По умолчанию</button>
            </header>
            {/* Переключатели для всех колонок кроме первой */}
            <div className="screener__toggle-btns">
              {Object.keys(columnVisibility).map(
                (column) =>
                  column !== "title" && ( // Не показываем кнопку для первой колонки
                    <label key={column}>
                      Показать/Скрыть {column}
                      {/* Переключатель */}
                      <input
                        type="checkbox"
                        checked={columnVisibility[column]}
                        onChange={() =>
                          setColumnVisibility((prev) => ({
                            ...prev,
                            [column]: !prev[column],
                          }))
                        }
                      />
                      {/* Кнопка переключателя */}
                      <span className="switch-btn"></span>
                    </label>
                  )
              )}
            </div>
          </div>
        )}
      </div>
      <DataTable data={filteredData} columns={columns} />
    </>
  );
};

export default TableComponent;
