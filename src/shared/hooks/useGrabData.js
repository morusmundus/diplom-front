import {useState} from "react";

export const useGrabData = (callback) => {
  const [isLoading, setLoadingStatus] = useState(false)
  const [error, setError] = useState('false')
  let timeoutId = null;

  const fetching = async (...args) => {
    try {
      setLoadingStatus(true);
      // await new Promise((resolve) => {
      //   timeoutId = setTimeout(() => {
      //     console.log('Прошло 2000 миллисекунд');
      //     resolve(); // Разрешаем Promise после завершения setTimeout
      //   }, 20000);
      // });

      await callback(...args);
    } catch (e) {
      console.log(e.response?.status)
      setError(e.response?.status);
      throw e
    } finally {
      setLoadingStatus(false);
    }
  }

  return [fetching, isLoading, error];
}
