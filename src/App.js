import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          {/* switch spowoduje, że zanim odpali się redirect, to sprawdzi, czy dana ścieżka, którą wpisuję jest zawarta w gdzieś w Switchu*/}
          <Route path="/" exact={true}>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact={true}>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
        {/* jeśli ścieża jest jakaś inna to powrót na główną, czyli taka ścieżka, która nie istnieje */}
      </main>
    </Router>
  );
};

export default App;
