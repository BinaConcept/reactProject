import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import {EditNewsForm } from './components/editNewsForm';
import {RepubliekList} from './components/republiekList';
import {SingleNewsPage} from './components/singleNewsPage';
import { ToastContainer} from 'react-toastify';
import Info from './components/info';
import { AddNewsForm } from './components/addNewsForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
              <ToastContainer />
              <RepubliekList/>
              </>
              
            )}
          />
          <Route exact path="/create" component={AddNewsForm} />
          <Route exact path="/editNews/:Id" component={EditNewsForm} />
          <Route exact path="/republiek" component={RepubliekList} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/republiek/:Id" component={SingleNewsPage} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
