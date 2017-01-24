// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
//import $ from 'jquery';
require("./../sass/main.scss");

import Perf from 'react-addons-perf';
import Immutable from 'immutable';
import update from 'react-addons-update'; // ES6 
//import PureRenderMixin from 'react-addons-pure-render-mixin';
const __DEV__  = true ;

if(__DEV__){
    window.Perf = Perf 
}

class Immutable extends React.Component{
    
}

ReactDOM.render(
	<SurveyList />,
    document.getElementById('app')
);
