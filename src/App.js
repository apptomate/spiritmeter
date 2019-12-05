import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./Redux/_store/ConfigureStore";
//Gateway Routes
const Login = React.lazy(() => import("./components/Login"));
const AdminLayout = React.lazy(() => import("./components/AdminLayout"));
const Unauthorized = React.lazy(() => import("./components/Unauthorizrd"));
//Store
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/admin' component={AdminLayout} />
            <Route path='*' component={Unauthorized} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
