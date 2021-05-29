import React from 'react';
import Login from './components/prelogin/Login';
import Register from './components/prelogin/Registration';
import Home from './components/postlogin/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/' exact><Login /></Route>
              <Route exact path="/registration"><Register /></Route>
              <Route exact path="/Home"><Home /></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;