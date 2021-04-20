import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getUserRequest } from "../api/requests";
import { config } from "../config";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { FourOFourPage } from "../pages/404Page";
import { CreateListPage } from "../pages/CreateListPage";
import { Landing } from "../pages/LandingPage";
import { ListsPage } from "../pages/ListsPage";
import { Login } from "../pages/LoginPage";
import { ViewListPage } from "../pages/ViewListPage";

export const Routes = () => {
  const { user, logout, login } = useAuthenticatedContext();
  React.useEffect(() => {
    // hook to check if user has been authenticated
    const fetchUser = async () => {
      try {
        const req = await getUserRequest();
        login(req.data);
      } catch (_err) {
        logout();
      }
    };
    fetchUser();
  }, []);

  const PrivateRoute = ({
    component,
    isAuthenticated = user !== null,
    ...rest
  }: any) => {
    const routeComponent = (props: any) =>
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      );
    return <Route {...rest} render={routeComponent} />;
  };

  return (
    <Switch>
      {/* public routes */}
      <Route path={config.routes.home} exact>
        <Landing />
      </Route>
      <Route path={config.routes.login} exact>
        <Login />
      </Route>
      {/* Private Routes */}
      <PrivateRoute path={config.routes.lists} exact component={ListsPage} />
      <PrivateRoute
        path={config.routes.createList}
        exact
        component={CreateListPage}
      />
      <PrivateRoute path={config.routes.list} exact component={ViewListPage} />
      {/* 404 when route is unidentified */}
      <Route>
        <FourOFourPage />
      </Route>
    </Switch>
  );
};
