import Home from './pages/Home';
import Course from './pages/Course';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import About from './pages/About';
import ToggleDev from './pages/ToggleDev';
import Explore from './pages/Explore';
import {Route, Switch} from 'react-router';
import React from 'react';
import Calculator from './pages/Calculator';

export default () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/courses/:uuid' component={Course}/>
      <Route path='/explore/:entity?' component={Explore}/>
      <Route path='/search' component={Search}/>
      <Route path='/about' component={About}/>
      <Route path='/calc' component={Calculator}/>
      <Route path='/toggle_dev' component={ToggleDev}/>
      <Route component={NotFound}/>
    </Switch>
);