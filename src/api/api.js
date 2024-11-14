const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const url = "http://tst.corpbonds.ru/bond/";

export const bondsApi = {
  async getBondsInfo(isin) {
    let data = {};
    try {
      const responseHeader = await fetch(`${url}${isin}`, {
        headers,
      });
      if (!responseHeader.ok) {
        throw new Error(
          `Ошибка ${responseHeader.status}: ${responseHeader.statusText}`
        );
      }

      const responsePay = await fetch(`${url}${isin}/pay`, {
        headers,
      });
      if (!responsePay.ok) {
        throw new Error(
          `Ошибка ${responseHeader.status}: ${responseHeader.statusText}`
        );
      }

      const responseAction = await fetch(`${url}${isin}/action`, {
        headers,
      });
      if (!responseAction.ok) {
        throw new Error(
          `Ошибка ${responseHeader.status}: ${responseHeader.statusText}`
        );
      }

      const bondHeader = await responseHeader.json(); // Получаем данные в формате JSON
      const bondPay = await responsePay.json(); // Получаем данные в формате JSON
      const bondAction = await responseAction.json(); // Получаем данные в формате JSON
      data = { bondHeader, bondPay, bondAction };
      return data;
    } catch (error) {
      //  Выводим  подробную  информацию  о  ошибке
      console.error("Ошибка при получении данных облигации:", error);
      console.error("Дополнительная информация:", error.message); //  Выводим  сообщение  ошибки
      throw error;
    }
  },
};
