import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./Redux/_store/ConfigureStore";
import {
  PublicRoute,
  ProtectedRoute
} from "./Redux/_service/AuthenticationService";
import { Spin, Icon } from "antd";

//Gateway Routes
const Login = React.lazy(() => import("./components/Login"));
const PasswordReset = React.lazy(() => import("./components/PasswordReset"));
const AdminLayout = React.lazy(() => import("./components/AdminLayout"));
const Unauthorized = React.lazy(() => import("./components/Unauthorizrd"));
//Store
const store = configureStore();

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, marginTop: 30 }} spin />
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense
          fallback={
            <center>
              <Spin indicator={antIcon} />
            </center>
          }
        >
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute
              exact
              path="/forgot-password"
              component={PasswordReset}
            />
            <ProtectedRoute exact path="/" component={AdminLayout} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <Route path="*" component={Unauthorized} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
