import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bondHeader: {
    name: "МВ ФИНАНС 001Р-04",
    code: "RU000A106540",
    emitent: {
      link: "#",
      text: "МВ Финанс",
    },
    liquidity: {
      stage: 4,
      moneyInDay: "(400 000 руб / день)",
    },

    ytm: {
      percents: "29.1%",
      date: "к дате 13.04.25",
    },
    spreds: {
      m: "4.5%",
      g: "4.5%",
    },
    price: ["89.1%", "890 руб"],
    years: {
      term: "4.5",
      duration: "4.5",
    },
    rating: ["А (РА Эксперт)", "А- (АКРА)"],
    type: ["Корпоративная", "Фикс"],
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
        ["Цена последняя", "91,75 руб"],
        ["Изменение цены", -0.13],
        ["Цена в валюте номинала", "890 руб"],
        ["Срок обращения, лет", "14"],
        ["Дата погашения (или Дата оферты)", "01.01.26"],
        ["Дюрация, лет", "1,1"],
        ["Справедливая доходность по модели", "24%"],
        ["Спред к справедливой доходности по модели (М cпред)", 4.5],
        ["Медиана G спреда", "2,5%"],
        ["G спред", 2.5],
        ["Кредитный рейтинг", ["А (РА Эксперт)", "А- (АКРА)", "А (АГЕНТСТВО)"]],
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
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
        ["Купон", "18.10.2024", "32.54", "13.05%", "13.05"],
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
};

export const bondsSlice = createSlice({
  name: "bond",
  initialState,
  reducers: {
    setBondHeader: (state, action) => {
      state.bondHeader = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBondHeader } = bondsSlice.actions;

export default bondsSlice.reducer;
