import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import ToDo from './component/pages/ToDo/ToDo';
import Navbar from './component/Navbar/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import About from './component/pages/About/About';
import Contacts from './component/pages/Contacts/Contacts';
import ErrorPage from './component/pages/404/ErrorPage';
import SingleTask from './component/SingleTask/SingleTask';

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
    path: "/task/:id",
    component: SingleTask,
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
        {pagesJsx}
        <Redirect to="/error/404" />
      </Switch>

    </div>
  );
}

export default App;
