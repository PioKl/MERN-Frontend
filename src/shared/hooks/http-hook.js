import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //- co może się stać, jeśli spróbuję ustawić stan po otrzymaniu odpowiedzi, chociaż już zostawiłem (i odmontowałem) komponent,
  //- rozwiązanie: rozwiązanie wykorzystujące flagę (która nie przerywa żądania, ale uniemożliwia Reactowi ustawienie stanu na niezamontowanym komponencie):
  const activeHttpRequests = useRef([]);

  //useCallback, żeby funkcja nie została ponownie stworzona, gdy komponent, który używa tego hooka będzie re-renderowany
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          //method: method
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      ///tablica przerwanych kontrolerów
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
