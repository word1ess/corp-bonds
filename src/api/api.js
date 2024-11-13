const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const bondsApi = {
  async getBondsInfo(isin) {
    let data = {};
    try {
      const responseHeader = await fetch(
        `https://cors-anywhere.herokuapp.com/http://tst.corpbonds.ru/bond/${isin}`,
        {
          headers,
        }
      );
      if (!responseHeader.ok) {
        throw new Error(
          `Ошибка ${responseHeader.status}: ${responseHeader.statusText}`
        );
      }

      const responsePay = await fetch(
        `https://cors-anywhere.herokuapp.com/http://tst.corpbonds.ru/bond/${isin}/pay`,
        {
          headers,
        }
      );
      if (!responsePay.ok) {
        throw new Error(
          `Ошибка ${responseHeader.status}: ${responseHeader.statusText}`
        );
      }

      const responseAction = await fetch(
        `https://cors-anywhere.herokuapp.com/http://tst.corpbonds.ru/bond/${isin}/action`,
        {
          headers,
        }
      );
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
