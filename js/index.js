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
			ishid:false,
			index:Math.random()
		}
	}
	handleClick(){
		this.setState({
			ishid :!this.state.ishid,
			index:Math.random()
		})
		
	}
	render(){
		//var ani = this.state.ishid?  <h3 key="123">中国人</h3> : <h3 key="1">2</h3>
		var css = this.state.ishid? { display:"none"} : {display:"block"}
		var html = (
			<div key={this.index}  style={css}>
			test
			</div>
			)
		return(
			<div>
				<button onClick={this.handleClick}>点击</button>
				<ReactCSSTransitionGroup transitionName = "animate" transitionEnterTimeout={5000} transitionLeave={true} >
					{html}
				</ReactCSSTransitionGroup>
			</div>
			)
	}

}

ReactDOM.render(
	<MyCss3Animation />,
    document.getElementById('app')
);
