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
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group' // ES6
import Css from "./../sass/main.scss";

class ChildComponent extends React.Component{
	componentWillAppear(){
		console.log("test")
	}
	componentDidAppear(){
		console.log("componentDidAppear")
	}
	componentDidMount() {
		console.log("componentDidMount")
	}
	render(){
		return (
			<div>{this.props.prop}</div>
			)
	}
}
class MyTest extends React.Component{
	constructor(props) {
		super(props);				
		this.state={
			items:["test"]
		}		
		this.handleClick = this.handleClick.bind(this)
	}		

	handleClick(){
		this.setState({
			items : ["test1","test2"]
		})
		console.log("click")
	}
	render(){		
		var divs =[]
		this.state.items.map(function(v,i){
			divs.push(
				<ChildComponent key={i} prop={v} />
				)
		})
		return(
			<div>
			<button onClick={this.handleClick}>点击切换</button>
			<ReactTransitionGroup  component="div">
				   {divs}
			</ReactTransitionGroup>				
			</div>
			)
	}
}

ReactDOM.render(
	<MyTest />,
    document.getElementById('app')
);
