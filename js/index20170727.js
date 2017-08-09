import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link,hashHistory } from 'react-router'
import Index from "./modules/Index"
import About from "./modules/About"
import Repos from "./modules/Repos"
var style = require("./../sass/main.scss");
console.log(style); //style.title1
ReactDOM.render((
<Router history={hashHistory}>
    <Route path="/" component={Index} >
	    <Route path="/about" component={About}/>
	    <Route path="/repos" component={Repos}/>
    </Route>
  </Router>
	),document.getElementById("app"))

