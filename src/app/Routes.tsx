import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { config } from "../config";
import { FourOFourPage } from "../pages/404Page";
import { Landing } from "../pages/LandingPage";
import { ListsPage } from "../pages/ListsPage";
import { NewFriendPage } from "../pages/NewFriendPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import ReactGA from "react-ga";

ReactGA.initialize(config.env.gaId as string);

export const Routes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [location]);

  const PrivateRoute = ({
    component,
    isAuthenticated = typeof token === "string", // if token exists the go ahead
    ...rest
  }: any) => {
    const routeComponent = (props: any) =>
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: config.routes.home }} />
      );
    return <Route {...rest} render={routeComponent} />;
  };

  return (
    <Switch>
      {/* public routes */}
      <Route path={config.routes.home} exact>
        <Landing />
      </Route>
      <Route path={config.routes.resetPassword} exact>
        <ResetPasswordPage />
      </Route>
      <Route path={config.routes.newFriend} exact>
        <NewFriendPage />
      </Route>
      {/* Private Routes */}
      <PrivateRoute path={config.routes.lists} exact component={ListsPage} />
      {/* 404 when route is unidentified */}
      <Route>
        <FourOFourPage />
      </Route>
    </Switch>
  );
};
