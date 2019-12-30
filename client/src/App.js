import React from 'react';
import {Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Medicine from './components/medicine/Medicine';
import Home from './components/home/Home';
import Food from './components/food/Food';
function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/medicine" component={Medicine} />
      <Route path="/food" component={Food} />
    </div>
  );
}

export default App;
