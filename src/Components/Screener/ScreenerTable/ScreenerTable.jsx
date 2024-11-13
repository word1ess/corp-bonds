import React, {
  useMemo,
  useReducer,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy } from "react-table";
import { useSticky } from "react-table-sticky";
import { MultiSelect } from "react-multi-select-component";

import Bond from "../../Bond/Bond";
import CustomTooltip from "../../Common/CustomTooltip/CustomTooltip";
import PopupLayout from "../../Common/PopupLayout/PopupLayout";

import { bondsApi } from "../../../api/api";
import {
  setBondHeader,
  setBondPay,
  setBondActions,
} from "../../../redux/bonds";

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

// Все попапы
const MultiSelectFilter = ({
  label,
  options,
  selectedValues,
  onChange,
  selectionLimit = 1,
  showSearch = false,
}) => {
  const handleChange = (selected) => {
    if (selectionLimit && selected.length > selectionLimit) {
      alert(`Вы можете выбрать не более ${selectionLimit} элементов.`);
      return;
    }
    onChange(selected);
  };
  return (
    <div className="multi-select-filter">
      <MultiSelect
        options={options.map((option) => ({ label: option, value: option }))}
        value={selectedValues}
        onChange={handleChange}
        labelledBy={label}
        search={false}
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
  isOpenProps = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProps);
  const dropdownRef = useRef();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Эффект для закрытия дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Закрываем дропдаун
      }
    };
    // Добавляем обработчик события клика
    document.addEventListener("mousedown", handleClickOutside);
    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`range-dropdown-filter ${isOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <div className="range-dropdown-filter__header" onClick={toggleDropdown}>
        <h3 style={{ cursor: "pointer" }}>{label}</h3>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="dropdown-heading-dropdown-arrow gray"
        >
          <path d="M6 9L12 15 18 9"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="range-dropdown-filter__content">
          <div onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}
    </div>
  );
};
const RatingTable = ({
  selectedRatings,
  handleRatingChange,
  isOpenProps = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProps);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const ratingAgencies = ["AKPA", "Эксперт PA", "HPA", "HKP"];
  const ratings = ["AA-", "A+", "A", "A-", "BB+"]; // Все 5 рейтингов

  // Данные для таблицы
  const data = useMemo(() => {
    return ratings.map((rating) => ({
      rating,
      agencies: ratingAgencies.map((agency) => ({
        agency,
        selected: selectedRatings[rating]
          ? selectedRatings[rating][agency] || false
          : false,
      })),
    }));
  }, [selectedRatings]);

  // Функция для переключения всех рейтингов
  const toggleAll = (rating) => {
    const currentSelection = selectedRatings[rating] || {};
    const allSelected = ratingAgencies.every(
      (agency) => currentSelection[agency]
    );

    // Создаем новый объект для обновления состояния
    const newSelection = { ...currentSelection }; // Копируем текущее состояние

    if (allSelected) {
      // Если все выбраны, сбрасываем все
      ratingAgencies.forEach((agency) => {
        newSelection[agency] = false; // Устанавливаем все в false
      });
    } else {
      // Если не все выбраны, добавляем оставшиеся
      ratingAgencies.forEach((agency) => {
        newSelection[agency] = true; // Устанавливаем оставшиеся в true
      });
    }

    handleRatingChange("multy", { rating, newSelection }); // Обновляем состояние
  };
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "rating",
        Cell: ({ value }) => {
          let isActive = false;

          if (selectedRatings[value]) {
            isActive = ratingAgencies.every(
              (agency) => selectedRatings[value][agency]
            );
          }
          return (
            <label>
              {value}

              <button
                className={`switch-btn ${isActive ? "active" : ""}`}
                onClick={() => toggleAll(value)}
              ></button>
              {/* Кнопка тоггл */}
            </label>
          );
        },
      },
      ...ratingAgencies.map((agency) => ({
        Header: agency,
        accessor: (row) => (
          <label>
            <input
              type="checkbox"
              checked={row.agencies.find((a) => a.agency === agency).selected}
              onChange={() =>
                handleRatingChange("single", [row.rating, agency])
              }
            />
            <span></span>
          </label>
        ),
      })),
    ],
    [handleRatingChange]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div
      className={`rating-table-container range-dropdown-filter ${
        isOpen ? "active" : ""
      }`}
    >
      <div className="range-dropdown-filter__header" onClick={toggleDropdown}>
        <h3 style={{ cursor: "pointer" }}>Кредитный рейтинг</h3>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="dropdown-heading-dropdown-arrow gray"
        >
          <path d="M6 9L12 15 18 9"></path>
        </svg>
      </div>
      {isOpen && (
        <div
          className="range-dropdown-filter__content"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="range-dropdown-filter__description">
            Нажмите <button className="switch-btn"></button>, чтобы выбрать все
            значения в строке ( рейтинг у всех агентств)
          </header>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
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
      )}
    </div>
  );
};

// Блок фильтров
const ScreenerBlockFilters = ({
  filters,
  setFilters,
  handleRatingChange,
  data,
  setAppliedFilters,
  initialFilters,
  searchTerm,
  setSearchTerm,
  selectedRatings,
  isMobile,
}) => {
  const defaultIsCurrent = {
    ytm: false,
    msrped: false,
    ratings: false,
    term: false,
    duration: false,
  };
  const [isPopupOpen, setIsOpen] = useState(false);
  const [isCurrent, setIsCurrent] = useState(defaultIsCurrent);

  const toggleDropdown = (current) => {
    setIsCurrent(() => {
      return {
        ...defaultIsCurrent,
        [current]: true,
      };
    });

    setIsOpen((prev) => !prev);
    document.querySelector(".header").classList.add("popup-open");
  };
  const handleCloseClick = () => {
    setIsOpen(false);
    document.querySelector(".header").classList.remove("popup-open");
  };

  // Уникальные значения для фильтров
  const uniqueValues = (key) => [...new Set(data.map((item) => item[key]))];
  const handleApplyFilters = () => {
    setAppliedFilters(filters); // Применяем текущие фильтры
  };
  const handleResetFilters = () => {
    setAppliedFilters(initialFilters); // Сбрасываем фильтры к значениям по умолчанию
    setFilters({ type: "RESET_FILTER" }); // Сбрасываем редюсер фильтров
  };

  const ScreenerBlockFiltersPC = ({}) => {
    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const toggleFilters = () => {
      setIsOpenFilters((prev) => !prev);
    };
    return (
      <>
        <MultiSelectFilter
          label="Эмитент"
          options={uniqueValues("issuer")}
          selectedValues={filters.issuer}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "issuer",
              value: selected,
            })
          }
          showSearch
        />
        <RatingTable
          selectedRatings={selectedRatings}
          handleRatingChange={handleRatingChange}
        />
        <MultiSelectFilter
          label="Сектор рынка"
          options={uniqueValues("sector")}
          selectedValues={filters.sector}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "sector",
              value: selected,
            })
          }
        />
        <MultiSelectFilter
          label="Тип бумаги"
          options={uniqueValues("type")}
          selectedValues={filters.type}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "type",
              value: selected,
            })
          }
        />
        <RangeDropdownFilter
          label="Срок обращения"
          minValue={filters.term.min}
          maxValue={filters.term.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "term",
              value: { ...filters.term, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "term",
              value: { ...filters.term, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Дюрация"
          minValue={filters.duration.min}
          maxValue={filters.duration.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "duration",
              value: { ...filters.duration, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "duration",
              value: { ...filters.duration, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Уровень ликвидности"
          minValue={filters.ytm.min}
          maxValue={filters.ytm.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "ytm",
              value: { ...filters.ytm, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "ytm",
              value: { ...filters.ytm, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="М-спред"
          minValue={filters.mSpread.min}
          maxValue={filters.mSpread.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "mSpread",
              value: { ...filters.mSpread, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "mSpread",
              value: { ...filters.mSpread, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Дневной оборот"
          minValue={filters.mSpread.min}
          maxValue={filters.mSpread.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "mSpread",
              value: { ...filters.mSpread, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "mSpread",
              value: { ...filters.mSpread, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Уровень листинга"
          minValue={filters.listingLevel.min}
          maxValue={filters.listingLevel.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "listingLevel",
              value: { ...filters.listingLevel, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "listingLevel",
              value: { ...filters.listingLevel, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Уровень ликвидности"
          minValue={filters.liquidityLevel.min}
          maxValue={filters.liquidityLevel.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "liquidityLevel",
              value: { ...filters.liquidityLevel, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "liquidityLevel",
              value: { ...filters.liquidityLevel, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Объем в текущую сессию"
          minValue={filters.tradingVolumeSession.min}
          maxValue={filters.tradingVolumeSession.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "tradingVolumeSession",
              value: { ...filters.tradingVolumeSession, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "tradingVolumeSession",
              value: { ...filters.tradingVolumeSession, max: value },
            })
          }
        />
        <RangeDropdownFilter
          label="Изменение цены к вчера"
          minValue={filters.changePriceToTommorow.min}
          maxValue={filters.changePriceToTommorow.max}
          onMinChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "changePriceToTommorow",
              value: { ...filters.changePriceToTommorow, min: value },
            })
          }
          onMaxChange={(value) =>
            setFilters({
              type: "SET_FILTER",
              filter: "changePriceToTommorow",
              value: { ...filters.changePriceToTommorow, max: value },
            })
          }
        />

        <MultiSelectFilter
          label="Валюта"
          options={uniqueValues("currency")}
          selectedValues={filters.currency}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "currency",
              value: selected,
            })
          }
        />
        <MultiSelectFilter
          label="Отрасль"
          options={uniqueValues("branch")}
          selectedValues={filters.branch}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "branch",
              value: selected,
            })
          }
        />
        <MultiSelectFilter
          label="Ограничения"
          options={uniqueValues("qualifiedOnlyFlag")}
          selectedValues={filters.qualifiedOnlyFlag}
          onChange={(selected) =>
            setFilters({
              type: "SET_FILTER",
              filter: "qualifiedOnlyFlag",
              value: selected,
            })
          }
        />

        {isOpenFilters && (
          <>
            <RangeDropdownFilter
              label="G-спред"
              minValue={filters.gSpread.min}
              maxValue={filters.gSpread.max}
              isOpenProps={isPopupOpen && isCurrent}
              onMinChange={(value) =>
                setFilters({
                  type: "SET_FILTER",
                  filter: "gSpread",
                  value: { ...filters.gSpread, min: value },
                })
              }
              onMaxChange={(value) =>
                setFilters({
                  type: "SET_FILTER",
                  filter: "gSpread",
                  value: { ...filters.gSpread, max: value },
                })
              }
            />

            <RangeDropdownFilter
              label="Частота купона"
              minValue={filters.couponFrequency.min}
              maxValue={filters.couponFrequency.max}
              isOpenProps={isPopupOpen && isCurrent}
              onMinChange={(value) =>
                setFilters({
                  type: "SET_FILTER",
                  filter: "couponFrequency",
                  value: { ...filters.couponFrequency, min: value },
                })
              }
              onMaxChange={(value) =>
                setFilters({
                  type: "SET_FILTER",
                  filter: "couponFrequency",
                  value: { ...filters.couponFrequency, max: value },
                })
              }
            />
          </>
        )}

        <button className="link-arrow" onClick={toggleFilters}>
          {isOpenFilters ? "Скрыть фильтры" : "Показать фильтры"}
        </button>
      </>
    );
  };
  const ScreenerBlockFiltersMobile = ({}) => {
    return (
      <>
        <div
          data-filter="ytm"
          className="screener__filters-formobile range-dropdown-filter__header"
          onClick={() => toggleDropdown("ytm")}
        >
          <h3 style={{ cursor: "pointer" }}>YTM</h3>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="dropdown-heading-dropdown-arrow gray"
          >
            <path d="M6 9L12 15 18 9"></path>
          </svg>
        </div>
        <div
          data-filter="mSrped"
          className="screener__filters-formobile range-dropdown-filter__header"
          onClick={() => toggleDropdown("msrped")}
        >
          <h3 style={{ cursor: "pointer" }}>М Спред</h3>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="dropdown-heading-dropdown-arrow gray"
          >
            <path d="M6 9L12 15 18 9"></path>
          </svg>
        </div>
        <div
          data-filter="rating"
          className="screener__filters-formobile range-dropdown-filter__header"
          onClick={() => toggleDropdown("ratings")}
        >
          <h3 style={{ cursor: "pointer" }}>Рейтинг</h3>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="dropdown-heading-dropdown-arrow gray"
          >
            <path d="M6 9L12 15 18 9"></path>
          </svg>
        </div>
        <div
          data-filter="term"
          className="screener__filters-formobile range-dropdown-filter__header"
          onClick={() => toggleDropdown("term")}
        >
          <h3 style={{ cursor: "pointer" }}>Срок</h3>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="dropdown-heading-dropdown-arrow gray"
          >
            <path d="M6 9L12 15 18 9"></path>
          </svg>
        </div>
        <div
          data-filter="duration"
          className="screener__filters-formobile range-dropdown-filter__header"
          onClick={() => toggleDropdown("duration")}
        >
          <h3 style={{ cursor: "pointer" }}>Дюрация</h3>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="dropdown-heading-dropdown-arrow gray"
          >
            <path d="M6 9L12 15 18 9"></path>
          </svg>
        </div>

        {isPopupOpen && (
          <PopupLayout
            isPopupOpen={isPopupOpen}
            handleCloseClick={handleCloseClick}
          >
            <h2 className="popup-title">Фильтры</h2>
            <div className="screener__filters-popup-row">
              <RangeDropdownFilter
                label="YTM"
                minValue={filters.ytm.min}
                maxValue={filters.ytm.max}
                isOpenProps={isCurrent.ytm}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "ytm",
                    value: { ...filters.ytm, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "ytm",
                    value: { ...filters.ytm, max: value },
                  })
                }
              />
              <RangeDropdownFilter
                label="М-спред"
                minValue={filters.mSpread.min}
                maxValue={filters.mSpread.max}
                isOpenProps={isCurrent.mSpread}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "mSpread",
                    value: { ...filters.mSpread, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "mSpread",
                    value: { ...filters.mSpread, max: value },
                  })
                }
              />
              <RatingTable
                selectedRatings={selectedRatings}
                handleRatingChange={handleRatingChange}
                isOpenProps={isCurrent.ratings}
              />
              <RangeDropdownFilter
                label="Срок обращения"
                minValue={filters.term.min}
                maxValue={filters.term.max}
                isOpenProps={isCurrent.term}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "term",
                    value: { ...filters.term, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "term",
                    value: { ...filters.term, max: value },
                  })
                }
              />
              <RangeDropdownFilter
                label="Дюрация"
                minValue={filters.duration.min}
                maxValue={filters.duration.max}
                isOpenProps={isCurrent.duration}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "duration",
                    value: { ...filters.duration, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "duration",
                    value: { ...filters.duration, max: value },
                  })
                }
              />
              <MultiSelectFilter
                label="Эмитент"
                options={uniqueValues("issuer")}
                selectedValues={filters.issuer}
                onChange={(selected) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "issuer",
                    value: selected,
                  })
                }
                showSearch
              />
              <RangeDropdownFilter
                label="Объем торгов за сегодня"
                minValue={filters.tradingVolumeTodayRUB.min}
                maxValue={filters.tradingVolumeTodayRUB.max}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "tradingVolumeTodayRUB",
                    value: {
                      ...filters.tradingVolumeTodayRUB,
                      min: value,
                    },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "tradingVolumeTodayRUB",
                    value: {
                      ...filters.tradingVolumeTodayRUB,
                      max: value,
                    },
                  })
                }
              />
              <RangeDropdownFilter
                label="Частота купона"
                minValue={filters.couponFrequency.min}
                maxValue={filters.couponFrequency.max}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "couponFrequency",
                    value: { ...filters.couponFrequency, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "couponFrequency",
                    value: { ...filters.couponFrequency, max: value },
                  })
                }
              />
              <RangeDropdownFilter
                label="G-спред"
                minValue={filters.gSpread.min}
                maxValue={filters.gSpread.max}
                onMinChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "gSpread",
                    value: { ...filters.gSpread, min: value },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    type: "SET_FILTER",
                    filter: "gSpread",
                    value: { ...filters.gSpread, max: value },
                  })
                }
              />
            </div>
          </PopupLayout>
        )}
      </>
    );
  };
  const ScreenerBlockSearch = ({}) => {
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef();
    const filteredSuggestionsRef = useRef([]); // Храним список подсказок в ref

    useEffect(() => {
      const handleBlur = () => {
        setIsFocused(false);
      };

      const handleFocus = () => {
        setIsFocused(true);
      };

      inputRef.current.addEventListener("blur", handleBlur);
      inputRef.current.addEventListener("focus", handleFocus);

      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener("blur", handleBlur);
          inputRef.current.removeEventListener("focus", handleFocus);
        }
      };
    }, []);

    const handleInputChange = useCallback(
      (event) => {
        const value = event.target.value;
        setLocalSearchTerm(value);
        // Фильтрация данных с помощью useMemo
        const filteredSuggestions = value
          ? data.filter((item) =>
              item.title.toLowerCase().includes(value.toLowerCase())
            )
          : [];
        filteredSuggestionsRef.current = filteredSuggestions;
        // Возвращаем фокус на инпут
        requestAnimationFrame(() => {
          inputRef.current.focus();
        });
      },
      [data]
    );

    const handleSuggestionClick = (title) => {
      setSearchTerm(title);
      setLocalSearchTerm(title);
      filteredSuggestionsRef.current = []; // Очищаем ref

      inputRef.current.value = searchTerm;
    };

    return (
      <div className="search">
        <input
          type="text"
          placeholder="Поиск по названию или ISIN"
          onChange={handleInputChange}
          ref={inputRef}
          value={localSearchTerm}
        />
        <button onClick={(e) => setSearchTerm(inputRef.current.value)}>
          Искать
        </button>
        {isFocused && filteredSuggestionsRef.current.length > 0 && (
          <ul className="search__tip">
            {filteredSuggestionsRef.current
              .slice(0, 7)
              .map((suggestion, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSuggestionClick(suggestion.title)}
                >
                  {suggestion.title}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <header className="screener__block">
      <ScreenerBlockSearch />
      <div className="screener__filters">
        <div className="screener__filters-row">
          {isMobile ? (
            <ScreenerBlockFiltersMobile />
          ) : (
            <ScreenerBlockFiltersPC />
          )}
        </div>
        <div className="screener__filter-btns">
          <button onClick={handleApplyFilters} className="screener__done">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.00032 1.75H16.0003C16.917 1.75 17.667 2.5 17.667 3.41667V5.25C17.667 5.91667 17.2503 6.75 16.8336 7.16667L13.2503 10.3333C12.7503 10.75 12.417 11.5833 12.417 12.25V15.8333C12.417 16.3333 12.0836 17 11.667 17.25L10.5003 18C9.41698 18.6667 7.91698 17.9167 7.91698 16.5833V12.1667C7.91698 11.5833 7.58365 10.8333 7.25032 10.4167L4.08365 7.08333C3.66698 6.66667 3.33365 5.91667 3.33365 5.41667V3.5C3.33365 2.5 4.08365 1.75 5.00032 1.75Z"
                stroke="#F5F8F9"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.60833 1.75L5.5 8.33333"
                stroke="#F5F8F9"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Применить фильтры
          </button>
          <button onClick={handleResetFilters} className="screener__reset">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.125 18.0577C15.7 17.116 18.3333 13.866 18.3333 9.99935C18.3333 5.39935 14.6333 1.66602 9.99999 1.66602C4.44166 1.66602 1.66666 6.29935 1.66666 6.29935M1.66666 6.29935V2.49935M1.66666 6.29935H3.34166H5.36666"
                stroke="#3A65B5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333"
                stroke="#3A65B5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="3 3"
              />
            </svg>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </header>
  );
};

// Таблица
const DataTable = ({ data, columns, onRowClick }) => {
  // Настройка таблицы с использованием react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, useBlockLayout: true, useSticky: true },
      useSortBy
    );
  const getShortNameAgency = (agency) => {
    let shortName = "";
    switch (agency) {
      case "AKPA":
        shortName = "A(RU)";
        break;
      case "Эксперт PA":
        shortName = "ruA";
        break;
      case "HPA":
        shortName = "A|ru|";
        break;
      case "HKP":
        shortName = "A.ru";
        break;
      default:
        break;
    }
    return shortName;
  };
  const setClassSpread = (value) => {
    let className = "";
    if (value < 10) {
      className = "red";
    } else if (value > 10) {
      className = "green";
    } else {
      className = "yellow";
    }
    return className;
  };
  return (
    <div className="screener__table-wrapper">
      <table className="table" {...getTableProps()}>
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={`${column.id} ${column.sticky ? "sticky" : ""}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <div className="table__icons-header">
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
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.84988 2.35999L2.98987 0.5L1.12988 2.35999"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.99023 9.5V0.5"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.40039 7.64014L8.26041 9.50012L10.1204 7.64014"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25977 0.5V9.5"
                            stroke="#8599B1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      {/* Индикатор сортировки */}
                    </span>
                    <CustomTooltip
                      parent={column.accessor.name}
                      textTooltip={column.textTooltip}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Тело таблицы */}
        <tbody className="table-body" {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onRowClick(row.original.isin)}
              >
                {row.cells.map((cell, i) => (
                  <td className={cell.column.id} {...cell.getCellProps()}>
                    {cell.column.id === "ratings" ? (
                      cell.value.map(({ agency, rating }) => (
                        <div key={agency}>
                          {rating}({getShortNameAgency(agency)})
                        </div>
                      ))
                    ) : cell.column.id === "mSpread" ||
                      cell.column.id === "gSpread" ? (
                      <div className={setClassSpread(cell.value)}>
                        {cell.value}
                      </div> // Здесь можно настроить отображение для mSpread
                    ) : (
                      cell.render("Cell")
                    )}

                    {cell.column.id === "title" && (
                      <>
                        <img src={data[i].img} alt="" />
                        <CustomTooltip
                          textTooltip="Добавить в портфель"
                          type="plus"
                          place="top-start"
                        />
                      </>
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

// Мейн компонент
// Вся логика для таблицы
const TableComponent = () => {
  const isMobile = useOutletContext();
  const dispatchRedux = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Состояние для выбранных рейтингов
  const [selectedRatings, setSelectedRatings] = useState({});

  // Запрос данных из таблицы
  const bondState = useSelector((state) => state.bond);
  // Данные для таблицы
  const data = useMemo(
    () => bondState.bondReactTables,
    [bondState.bondReactTables]
  );
  // Инициализация типов фильтров
  const initialFilters = {
    issuer: [],
    rating: [],
    term: { min: "", max: "" },
    duration: { min: "", max: "" },
    ytm: { min: "", max: "" },
    mSpread: { min: "", max: "" },
    gSpread: { min: "", max: "" },
    price: "",
    nominalPercentage: "",
    tcd: "",
    couponRate: "",
    tradingVolumeLiquidity10Days: "",
    tradingVolumeTodayRUB: { min: "", max: "" },
    priceChangeDay: { min: "", max: "" },
    ytmChangeDay: "",
    qualifiedOnlyFlag: [],
    currency: [],
    couponFormula: "",
    zSpread: "",
    couponFrequency: "",

    type: [],
    sector: [],
    liquidityLevel: { min: "", max: "" },

    tradingVolumeSession: { min: "", max: "" },
    branch: [],
    changePriceToTommorow: { min: "", max: "" },
    listingLevel: { min: "", max: "" },
  };
  // Состояние для примененных фильтров
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  // Состояние для самих фильтров
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  // Фильтрация данных
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Проверка на выбранные рейтинги
      const matchesRating =
        Object.keys(selectedRatings).length === 0 ||
        Object.keys(selectedRatings).some((rating) =>
          item.ratings.some(
            ({ agency, rating: itemRating }) =>
              selectedRatings[rating]?.[agency] && itemRating === rating // Проверка на совпадение рейтинга и агентства
          )
        );
      // Проверка на другие фильтры
      const matchesFilters = Object.keys(appliedFilters).every((filterKey) => {
        if (Array.isArray(appliedFilters[filterKey])) {
          // Обработка мультивыборных фильтров
          return (
            appliedFilters[filterKey].length === 0 ||
            appliedFilters[filterKey].some(
              (selected) => selected.value === item[filterKey]
            )
          );
        } else if (typeof appliedFilters[filterKey] === "object") {
          // Обработка диапазонов
          const { min, max } = appliedFilters[filterKey];
          const value = parseFloat(item[filterKey]);

          return (
            (min === "" || value >= parseFloat(min)) &&
            (max === "" || value <= parseFloat(max))
          );
        } else {
          return appliedFilters[filterKey]
            ? item[filterKey]
                .toLowerCase()
                .includes(appliedFilters[filterKey].toLowerCase())
            : true;
        }
      });

      return (
        matchesRating &&
        matchesFilters &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.isin.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [data, selectedRatings, appliedFilters, searchTerm]); // Добавляем selectedRatings и filters в зависимости

  const handleRatingChange = (type, data) => {
    setSelectedRatings((prev) => {
      const updatedRatings = { ...prev };
      // Функция для установки состояния агентств
      const setRatings = (rating, agency) => {
        if (agency) {
          // Если агентство выбрано, добавляем его
          if (!updatedRatings[rating]) {
            updatedRatings[rating] = {};
          }
          // Переключаем состояние агентства
          updatedRatings[rating][agency] = !updatedRatings[rating][agency];
        }

        // Удаляем рейтинг, если все агентства сняты
        if (
          updatedRatings[rating] &&
          Object.values(updatedRatings[rating]).every((val) => !val)
        ) {
          delete updatedRatings[rating];
        }
      };

      // Обработка одиночного выбора
      if (type === "single") {
        setRatings(...data);
      }

      // Обработка множественного выбора
      if (type === "multy") {
        const { rating, newSelection } = data;

        // Обновляем состояние для каждого агентства
        Object.keys(newSelection).forEach((agency) => {
          if (!updatedRatings[rating]) {
            updatedRatings[rating] = {};
          }
          updatedRatings[rating][agency] = newSelection[agency]; // Устанавливаем состояние на основе newSelection
        });

        // Удаляем рейтинг, если все агентства сняты
        if (
          updatedRatings[rating] &&
          Object.values(updatedRatings[rating]).every((val) => !val)
        ) {
          delete updatedRatings[rating];
        }
      }

      return updatedRatings; // Возвращаем обновленное состояние
    });
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Открытие попапа
  const handleRowClick = async (isin) => {
    try {
      const data = await bondsApi.getBondsInfo(isin);
      dispatchRedux(setBondHeader(data.bondHeader));
      dispatchRedux(setBondPay(data.bondPay));
      // dispatchRedux(setBondActions(data.bondActions));

      setIsPopupOpen(true);
    } catch (err) {
      console.log(err.message || "Ошибка при загрузке данных");
    }
  };
  // Закрытие попапа
  const handleCloseClick = () => {
    setIsPopupOpen(false);
    document.querySelector(".header").classList.remove("popup-open");
  };

  const defaultVisibility = {
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
  const [columnVisibility, setColumnVisibility] = useState(
    defaultVisibility.visibility
  );
  const [showSettings, setShowSettings] = useState(false);
  // Определение колонок таблицы в нужном порядке
  const columns = useMemo(() => {
    const cols = [
      {
        Header: "Название",
        accessor: "title",
        textTooltip: "lorem",
        sticky: true,
      },
      {
        Header: "Срок, лет",
        accessor: "term",
        showColumn: columnVisibility.term,
      },
      {
        Header: "Дюрация, %",
        accessor: "duration",
        showColumn: columnVisibility.duration,
      },
      {
        Header: "Рейтинг",
        accessor: "ratings", // Убедитесь, что это поле действительно существует и является массивом
        Cell: ({ value }) => {
          if (!value || !Array.isArray(value)) return null; // Проверка на наличие значения и его тип
          return value.map(({ agency, rating }) => (
            <div key={agency}>
              {agency}: {rating}
            </div>
          ));
        },
        showColumn: columnVisibility.ratings,
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
        Header: "Объем торгов",
        accessor: "tradingVolumeLiquidity10Days",
        showColumn: columnVisibility.tradingVolumeLiquidity10Days,
      },
      {
        Header: "Дневной оборот",
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
      {
        Header: "Тип бумаги",
        accessor: "type",
        showColumn: columnVisibility.type,
      },
      {
        Header: "Сектор торгов",
        accessor: "sector",
        showColumn: columnVisibility.sector,
      },

      {
        Header: "Объем торгов за сегодня",
        accessor: "tradingVolumeSession",
        showColumn: columnVisibility.tradingVolumeSession,
      },

      {
        Header: "Отрасль",
        accessor: "branch",
        showColumn: columnVisibility.branch,
      },

      {
        Header: "Изменение цены к вчера",
        accessor: "changePriceToTommorow",
        showColumn: columnVisibility.changePriceToTommorow,
      },

      {
        Header: "Уровень листинга",
        accessor: "listingLevel",
        showColumn: columnVisibility.listingLevel,
      },
    ];

    return cols.filter((col) => col.showColumn !== false); // Фильтруем колонки по видимости
  }, [defaultVisibility.visibility]);

  // Функция для сброса видимости колонок к значениям по умолчанию
  const resetColumnVisibility = () => {
    setColumnVisibility({
      ...defaultVisibility.visibility,
      rating: true, // Если нужно оставить только первые 6 колонок видимыми
      duration: true,
      ytm: true,
      mSpread: true,
      gSpread: true,
    });
  };

  return (
    <>
      <ScreenerBlockFilters
        filters={filters}
        setFilters={dispatch}
        handleRatingChange={handleRatingChange}
        data={data}
        setAppliedFilters={setAppliedFilters}
        initialFilters={initialFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRatings={selectedRatings}
        isMobile={isMobile}
      />
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
                      {defaultVisibility.titles[column]}
                      {/* Переключатель */}
                      <input
                        type="checkbox"
                        checked={columnVisibility[column]}
                        onChange={() => {
                          setColumnVisibility((prev) => {
                            return {
                              ...prev,
                              [column]: !prev[column],
                            };
                          });
                        }}
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
      {/* Основная таблица с данными */}
      <DataTable
        data={filteredData}
        columns={columns}
        onRowClick={handleRowClick}
        isMobile={isMobile}
      />
      {/* Попап с информацией о выбранной облигации */}
      {isPopupOpen && (
        <PopupLayout
          isPopupOpen={isPopupOpen}
          handleCloseClick={handleCloseClick}
        >
          <Bond />
        </PopupLayout>
      )}
    </>
  );
};

export default TableComponent;
