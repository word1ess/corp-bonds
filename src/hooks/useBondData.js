import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBondData } from "../redux/bonds";

export const useBondData = (isin) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bondData, setBondData] = useState(null);
  const dispatch = useDispatch();
  const cachedBond = useSelector((state) => state.bond.bonds);

  useEffect(() => {
    const loadBondData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Проверяем кэшированные данные

        if (cachedBond.bondHeader.isin === isin) {
          setBondData(cachedBond);
        } else {
          // Запрашиваем данные с сервера
          const newBondInfo = await dispatch(fetchBondData(isin));
          const updatedCachedBond = {
            ...cachedBond,
            bondHeader: newBondInfo.payload.bondHeader,
            bondTables: {
              pay: {
                ...cachedBond?.bondTables?.pay, // Обращаемся к bondTables.pay с учетом возможного undefined
                body: newBondInfo.payload.bondTables.pay.body,
              },
              actions: {
                ...cachedBond?.bondTables?.actions, // Обращаемся к bondTables.actions с учетом возможного undefined
                body: newBondInfo.payload.bondTables.actions.body,
              },
            },
          };
          setBondData(updatedCachedBond);
        }
      } catch (err) {
        console.log(err);
        setError(err.message || "Произошла ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };

    // Вызываем функцию загрузки данных
    loadBondData();
  }, [isin, dispatch, cachedBond]);

  return { loading, error, bondData };
};
