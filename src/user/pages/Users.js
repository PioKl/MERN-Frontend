import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  //w useEffect lepiej nie używać promisów, czyli async await, można ale nie zalecane, useEfffect nie oczekuje tego, wbrew jego działaniu, nie jest to rekomendowane, czyli useEffect(async () => {}) tak nie robić
  useEffect(() => {
    //dla fetch() domyślnym requestem (żądaniem) jest GET
    const fetchUsers = async () => {
      try {
        //domyślnie w http-hook jest GET więc nie trzeba go tu dodawać
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
};

export default Users;
