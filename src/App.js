import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import ToDo from './component/pages/ToDo/ToDo';
import Navbar from './component/Navbar/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import About from './component/pages/About/About';
import Contacts from './component/pages/Contacts/Contacts';
import ErrorPage from './component/pages/404/ErrorPage';
import SingleTaskProvider from './Context/providers/SingleTaskProvider';
import SingleTaskHook from './component/SingleTask/SingleTaskHook';


const pages = [
  {
    path: "/",
    component: ToDo,
    exact: true
  },
  {
    path: "/contacts",
    component: Contacts,
    exact: true
  },
  {
    path: "/about",
    component: About,
    exact: true
  },
  {
    path: "/error/:status",
    component: ErrorPage,
    exact: true
  }
];

function App() {
  const pagesJsx = pages.map((page, index) => {
    return (
      <Route
        key={index}
        path={page.path}
        component={page.component}
        exact={page.exact}
      />
    )

  })
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          path="/task/:id"
          exact={true}
        >
          <SingleTaskProvider>
            <SingleTaskHook />
          </SingleTaskProvider>
        </Route>
        {pagesJsx}
        <Redirect to="/error/404" />
      </Switch>

    </div>
  );
}

export default App;
