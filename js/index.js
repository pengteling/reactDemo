// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
//import $ from 'jquery';
//require("./../sass/main.scss");
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Css from "./../sass/main.scss";

class MyCss3Animation  extends React.Component{
	constructor(props) {
		super(props)	
		this.handleClick = this. handleClick.bind(this)	
		this.state={
			ishid:false
		}
	}
	handleClick(){
		this.setState({
			ishid :!this.state.ishid
		})
		
	}
	render(){
		//var ani = this.state.ishid?  <h3 key="123">中国人</h3> : <h3 key="1">2</h3>
		return(
			<div>
				<button onClick={this.handleClick}>点击</button>
				<ReactCSSTransitionGroup transitionName = "animation" key="ptl" >
					
				</ReactCSSTransitionGroup>
			</div>
			)
	}

}

ReactDOM.render(
	<MyCss3Animation />,
    document.getElementById('app')
);
