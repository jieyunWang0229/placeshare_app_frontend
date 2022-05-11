import React,{useCallback, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext    } from './shared/context/auth-context';
import Auth from './user/pages/Auth';
import { useAuth } from './shared/hooks/auth-hook';



const App = () => {
  const { login, logout, token, userId,} = useAuth();


  let routes;
  if(token){
      routes =(
        <Switch>
          <Route path="/" exact>
            <Users/>
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces/>
          </Route>
          <Route path="/places/new" exact>
            <NewPlace/>
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace/>
          </Route>
          <Redirect to="/"/>
      </Switch>
     );

  }else{
    routes =(
      <Switch>
         <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Redirect to="/auth"/>
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, login: login, logout: logout, userId:userId, token:token}}
    >
      <Router>
        <MainNavigation/>
        <main>
         {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
