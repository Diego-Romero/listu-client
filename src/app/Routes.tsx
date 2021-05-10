import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { getUserRequest } from "../api/requests";
import { config } from "../config";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { useLoadingContext } from "../context/LoadingContext";
import { FourOFourPage } from "../pages/404Page";
import { ContactPage } from "../pages/ContactPage";
import { CreateListPage } from "../pages/CreateListPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { Landing } from "../pages/LandingPage";
import { ListItemPage } from "../pages/ListItemPage";
import { ListsPage } from "../pages/ListsPage";
import { Login } from "../pages/LoginPage";
import { NewFriendPage } from "../pages/NewFriendPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { ViewListPage } from "../pages/ViewListPage";
import ReactGA from "react-ga";

ReactGA.initialize(config.env.gaId as string);

export const Routes = () => {
  const { user, logout, login } = useAuthenticatedContext();
  const { setLoading } = useLoadingContext();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [location]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const req = await getUserRequest();
        login(req.data);
        history.push(config.routes.lists);
      }
    } catch (_err) {
      logout(); // guarantee that the user is actually logged out
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    // hook to check if user has been authenticated
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
      <Route path={config.routes.contact} exact>
        <ContactPage />
      </Route>
      <Route path={config.routes.forgotPassword} exact>
        <ForgotPasswordPage />
      </Route>
      <Route path={config.routes.resetPassword} exact>
        <ResetPasswordPage />
      </Route>
      <Route path={config.routes.newFriend} exact>
        <NewFriendPage />
      </Route>
      {/* Private Routes */}
      <PrivateRoute path={config.routes.lists} exact component={ListsPage} />
      <PrivateRoute
        path={config.routes.createList}
        exact
        component={CreateListPage}
      />
      <PrivateRoute path={config.routes.list} exact component={ViewListPage} />
      <PrivateRoute
        path={config.routes.listItem}
        exact
        component={ListItemPage}
      />
      {/* 404 when route is unidentified */}
      <Route>
        <FourOFourPage />
      </Route>
    </Switch>
  );
};
