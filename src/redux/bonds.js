import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import imgBond from "../Components/Screener/ScreenerTable/img/1.png";
const initialState = {
  bonds: {
    bondHeader: {
      fullName: "МВ ФИНАНС 001Р-04",
      isin: "RU000A106540",
      issuer: {
        id: 279,
        name: "МВ Финанс",
        url: "/org/279",
      },
      liquidityLevel: 4,
      liquidityQuantity: 400000,
      yield: 29.1,
      yieldDate: "13.04.25",
      mSpread: 4.5,
      gSpread: 4.5,
      priceValue: 89170,
      lastPrice: -0.13,
      maturityPeriod: 4.5,
      duration: 4.5,
      ratings: [
        {
          sourceName: "acra-ratings.ru",
          ratingName: "AA+(RU)",
        },
        {
          sourceName: "rusbonds.ru",
          ratingName: "AA",
        },
      ],
      marketSectorName: "Корпоративная",
      couponTypeName: "Фикс",
    },
    bondInfo: [
      {
        title: "Доходность и цена",
        body: [
          [
            {
              text: "Доходность YTM (к ближайшей дате)",
              parent: "first",
            },
            "30,66% к 13.04.2024",
          ],
          ["Простая доходность", "33,77% к 13.04.2024"],
          ["Цена последняя", "91,75 руб"],
          ["Изменение цены", -0.13],
          ["Цена в валюте номинала", "890 руб"],
          ["Срок обращения, лет", "14"],
          ["Дюрация, лет", "1,1"],
          ["Справедливая доходность по модели", "24%"],
          ["М cпред", 4.5],
          ["G спред", 2.5],
          ["Медиана G спреда", "2,5%"],
          ["Кредитный рейтинг", ["А (РА Эксперт)", "А- (АКРА)"]],
          ["Медианный оборот за 10 дней", "8 450 тыс. руб"],
          ["Минимальный дневной оборот", "4 756 тыс. руб"],
          ["Максимальный дневной оборот", "15 815 тыс. руб."],
        ],
      },
      {
        title: "Купонные выплаты",
        body: [
          ["Тип купона", "Постоянный"],
          ["Формула купона", "∑КС + 4,25%"],
          ["Текущая купонная доходность", "14%"],
          ["Ставка купона", "23,02%"],
          ["Размер купона", "32.54 руб"],
          ["Частота купона", "Месяц"],
          ["Накопленный купонный доход (НКД)", "1502 руб"],
          ["Дата ближайшего купона (пут)", "18.10.2024"],
          ["Дата ближайшей оферты", "18.10.2026"],
          ["Наличие амортизации", "Да"],
          ["Купон лесенкой", "Да"],
          ["Наличие сall-опциона", "Да"],
        ],
      },
      {
        title: "Общая информация о бумаге",
        body: [
          ["Полное наименование", "Постоянный"],
          ["Краткое наименование", "МВ ФИН 1Р4"],
          ["ISIN", "RU000A106540"],
          ["Ставка купона", "23,02%"],
          [
            "Эмитент",
            {
              text: "МВ Финанс",
              link: "#",
            },
          ],
          ["Дата размещения", "18.10.2024"],
          ["Режим торгов", "TQCP"],
          ["Уровень листинга", "1"],
          ["Организатор размещения", "Иволга Капитал"],
          ["Номинал и Валюта торгов", "1000, руб"],
          ["Для квал инвесторов", "Нет"],
          ["Warning List CorpBonds.ru", "Нет"],
          ["Регистрационный номер", "4B02-04-00590-R-001P"],
          ["Объем выпуска", "5 000 000 шт"],
        ],
        links: [
          {
            text: "Профиль бумаги на сайте Московской биржи",
            link: "#",
          },
        ],
      },
    ],
    bondTables: [
      {
        title: "Выплаты по облигации",
        header: [
          "Вид выплаты",
          "Дата",
          "Сумма выплаты, руб",
          "% выплаты",
          "Остаток номинала после выплаты, руб",
        ],
        body: [
          ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
          ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ],
        mobile: {
          header: ["Дата", "Выплаты, руб", "Выплаты, %"],
          body: [
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
            [["18.10.2024", "Купон"], "2.54", "13.05%"],
          ],
        },
        maxCountOnce: 20,
      },
      {
        title: "Корпоративные действия",
        header: ["Дата", "Тип действия", "Срок подачи с", "Срок подачи до"],
        body: [
          ["18.10.2024", "put-оферта", "18.10.2024", "18.10.2024"],
          ["18.10.2024", "put-оферта", "18.10.2024", "18.10.2024"],
        ],
        maxCountOnce: 20,
      },
    ],
    bondLinks: [
      {
        title: "Обзоры эмитента",
        body: [
          {
            text: "Обзор эмитента МВ Финанс от 01.10.2024",
            link: "#",
          },
          {
            text: "Обзор эмитента МВ Финанс от 01.04.2024",
            link: "#",
          },
        ],
      },
      {
        title: "Присмотритесь к бумагам из подборок",
        body: [
          {
            text: "Топ доходностей в том же кредитном рейтинге с той же категорией дюрации",
            link: "#",
          },
          {
            text: "Топ доходностей в кредитном рейтинге на одну ступень ниже с той же категорией дюрации",
            link: "#",
          },
          {
            text: "Топ доходностей в кредитном рейтинге на одну выше ниже с той же категорией дюрации",
            link: "#",
          },
          {
            text: "Топ доходностей в том же кредитном рейтинге с дюрации короче",
            link: "#",
          },
          {
            text: "Топ доходностей в том же кредитном рейтинге с дюрации длиннее",
            link: "#",
          },
        ],
      },
    ],
  },

  bondReactTables: [
    {
      title: "МВ ФИНАНС 001Р-04",
      img: imgBond,
      issuer: "МВ Финанс",
      ratings: [
        { agency: "AKPA", rating: "AA-" },
        { agency: "Эксперт PA", rating: "A-" },
      ],

      term: "4.5",
      duration: "4.5",
      ytm: "29.1%",
      mSpread: 4.5,
      gSpread: 20,
      price: "89.2 %",
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
      isin: "RU000A106540",

      sector: "Корпоративная",
      type: "Фикс",
      liquidityLevel: 0,
      tradingVolumeSession: 500,
      branch: "Земли",
      changePriceToTommorow: -100,
      listingLevel: 1,
    },
    {
      title: "Мани Капитал 001P-01",
      img: imgBond,
      issuer: "Мани Капитал",
      ratings: [
        { agency: "HPA", rating: "BB+" },
        { agency: "HKP", rating: "A+" },
      ],

      term: "4.5",
      duration: "4.5",
      ytm: "29.1%",
      mSpread: 4.5,
      gSpread: 4.5,
      price: "89.2 %",
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
      isin: "RU000A0JX7A1",

      sector: "Корпоративная",
      type: "Фикс",
      liquidityLevel: 0,
      tradingVolumeSession: 500,
      branch: "Заводы",
      changePriceToTommorow: -100,
      listingLevel: 1,
    },
  ],
};

export const bondsSlice = createSlice({
  name: "bond",
  initialState,
  reducers: {
    setBondHeader: (state, action) => {
      //  Обновите  `bondHeader`  в  найденном  объекте
      state.bonds.bondHeader = action.payload;
    },
    setBondPay: (state, action) => {
      return produce(state, (draft) => {
        draft.bondTables = action.payload.map((payment) => ({
          body: [
            [
              payment.type,
              payment.date.split("-").reverse().join("."), // Преобразуем дату в нужный формат
              payment.amount,
              payment.percent + "%",
              payment.remaining,
            ],
          ],
          mobile: {
            body: [
              [
                [
                  payment.date.split("-").reverse().join("."), // Преобразуем дату в нужный формат
                  payment.type,
                ],
                payment.amount,
                payment.percent + "%",
              ],
            ],
          },
        }));
      });
    },
    // setBondActions: (state, action) => {
    //   return produce(state, (draft) => {
    //     draft.bondTables[1] = action.payload.map((actionItem) => ({
    //       body: [
    //         [
    //           actionItem.date.split("-").reverse().join("."), // Преобразуем дату в нужный формат
    //           actionItem.type,
    //           actionItem.start.split("-").reverse().join("."),
    //           actionItem.end.split("-").reverse().join("."),
    //         ],
    //       ],
    //       //  Удаляем  mobile
    //     }));
    //   });
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setBondHeader, setBondPay, setBondActions } = bondsSlice.actions;

export default bondsSlice.reducer;
