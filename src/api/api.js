const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const url = "https://cors-anywhere.herokuapp.com/http://tst.corpbonds.ru/bond/";

export const bondsApi = {
  async getBondsInfo(isin) {
    const fetchWithErrorHandling = async (url) => {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    };

    try {
      const bondHeaderPromise = fetchWithErrorHandling(`${url}${isin}`);
      const bondPayPromise = fetchWithErrorHandling(`${url}${isin}/pay`);
      const bondActionPromise = fetchWithErrorHandling(`${url}${isin}/action`);

      // Выполняем запросы параллельно
      const [bondHeader, bondPay, bondAction] = await Promise.all([
        bondHeaderPromise,
        bondPayPromise,
        bondActionPromise,
      ]);

      // Возвращаем данные в требуемой структуре
      return {
        bondHeader,
        bondTables: {
          pay: { body: bondPay },
          actions: { body: bondAction },
        },
      };
    } catch (error) {
      // Выводим подробную информацию о ошибке
      console.error("Ошибка при получении данных облигации:", error);
      console.error("Дополнительная информация:", error.message);
      throw error; // Перебрасываем ошибку дальше
    }
  },
};
