import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import ToDo from './component/ToDo/ToDo';
import Navbar from './component/Navbar/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import About from './component/About/About';
import Contacts from './component/Contacts/Contacts';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={ToDo} exact/>
        <Route path="/about" component={About} exact/>
        <Route path="/contacts" component={Contacts} exact/>
        <Redirect to="/"/>
      </Switch>

    </div>
  );
}

export default App;
