import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
//redux libraries
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { getStore, getPersistor, getState } from './redux/store';
import { kridoApi} from './redux/api';
import store  from "../src/ReduxApi/store";
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// redux configuration
// const store = getStore();
// const myPersistor = getPersistor();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        {/* loading={null} */}
        <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
                <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                <PrivateRoute path="/" name="Home" component={props => <DefaultLayout {...props} />} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
   </Provider>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  const state = getState()
  console.log('state', state)
  kridoApi.defaults.headers.common['Authorization'] = state.auth.token;
  return (
    <Route
      {...rest}
      render={props =>
        state.auth.isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
}

export default App;
